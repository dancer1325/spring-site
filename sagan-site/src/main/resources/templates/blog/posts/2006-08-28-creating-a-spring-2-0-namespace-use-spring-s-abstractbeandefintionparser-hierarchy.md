---
title: Creating a Spring 2.0 namespace?  Use Spring\'s AbstractBeanDefintionParser hierarchy.
source: https://spring.io/blog/2006/08/28/creating-a-spring-2-0-namespace-use-spring-s-abstractbeandefintionparser-hierarchy
scraped: 2026-02-24T09:35:13.063Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Hale |  August 28, 2006 | 0 Comments
---

# Creating a Spring 2.0 namespace?  Use Spring's AbstractBeanDefintionParser hierarchy.

_Engineering | Ben Hale |  August 28, 2006 | 0 Comments_

Lately it seems like I've been focusing on creating Spring XML namespaces. It's been a lot of trial and error (both on the XSD and Spring side) to get a good pattern for creating parsers. One of the biggest confusions that I ran into was the AbstractBeanDefinitionParser hierarchy. At this point it isn't documented especially well (but there is a JIRA for it, so it'll be fixed before GA), so I'll give you a rundown of your choices, what they're good for and how to use them.

## AbstractBeanDefinitionParser choices

There are three primary BeanDefinitionParsers that Spring provides to help you parse your XML namespaces.

-   [AbstractBeanDefinitionParser](#AbstractBeanDefinitionParser)
    -   [AbstractSingleBeanDefinitionParser](#AbstractSingleBeanDefinitionParser)
        -   [AbstractSimpleBeanDefinitionParser](#AbstractSimpleBeanDefinitionParser)

I'm going to start at the most specific and work towards the most general to show how to gain more power when you need it. If you want to skip the examples and see the summary, check [here](#summary).

## AbstractSimpleBeanDefinitionParser

The AbstractSimpleBeanDefinitionParser is the most specfic of the AbstractBeanDefinitionParsers. This class is intended to be used when there is a correlation between the attributes on a tag and the properties on a bean. So take the following example:

```xml
Copy
<util:properties location="..." />
```

```java
Copy
public class PropertiesFactoryBean extends PropertiesLoaderSupport
		implements FactoryBean, InitializingBean {
    ...
    public void setLocation(Resource location) {
        this.locations = new Resource[] {location};
    }
    ...
}
```

You'll notice that the location attribute on the util:properties tag matches a java bean property on the PropertiesFactoryBean type. The AbstractSimpleBeanDefinitionParser automatically extracts the attribute and maps it to that property. To get this behavior, you only need to implement a single method getBeanClass(). So the implementation for this example looks like:

```java
Copy
public class PropertiesBeanDefinitionParser extends AbstractSimpleBeanDefinitionParser {

    protected Class getBeanClass(Element element) {
        return PropertiesFactoryBean.class;
    }
}
```

As with all of the abstract parsers, the framework code hidden behind the scenes takes the bean definition that is created and registers it with the application context.

## AbstractSingleBeanDefinitionParser

The AbstractSingleBeanDefinitionParser is a little more general and I think will be the most often used of the abstract parsers. This class gives you the ability to create any single bean definition which will be automatically registered in the context. In this case the bean definition might not be a simple attribute mapping, it may have a complex nested structure, but it only creates a single bean definition. So as an example:

```xml
Copy
<tx:advice>
    <tx:attributes>
        <tx:method name="get*" read-only="false" />
    </tx:attributes>
</tx:advice>
```

```java
Copy
public class TransactionInterceptor extends TransactionAspectSupport
    implements MethodInterceptor, Serializable {
    ...
    public void setTransactionAttributes(Properties transactionAttributes) {
        NameMatchTransactionAttributeSource tas = new NameMatchTransactionAttributeSource();
        tas.setProperties(transactionAttributes);
        this.transactionAttributeSource = tas;
    }
    ...
}
```

As you can see with the complex nested structure of tx:advice there isn't going to be that one to one mapping we saw earlier. However, with AbstractSingleBeanDefinitionParser you get to do arbitrary traversal of the DOM structure like so:

```java
Copy
class TxAdviceBeanDefinitionParser extends AbstractSingleBeanDefinitionParser {
    ...
    protected void doParse(Element element, BeanDefinitionBuilder builder) {
        // Set the transaction manager property.
        builder.addPropertyReference(TxNamespaceUtils.TRANSACTION_MANAGER_PROPERTY,
            element.getAttribute(TxNamespaceUtils.TRANSACTION_MANAGER_ATTRIBUTE));

        List txAttributes = DomUtils.getChildElementsByTagName(element, ATTRIBUTES);
        if (txAttributes.size() > 1) {
            throw new IllegalStateException("Element 'attributes' is allowed at most once inside element 'advice'");
        }
        else if (txAttributes.size() == 1) {
            // Using attributes source.
            parseAttributes((Element) txAttributes.get(0), builder);
        }
        else {
            // Assume annotations source.
            Class sourceClass = TxNamespaceUtils.getAnnotationTransactionAttributeSourceClass();
            builder.addPropertyValue(TxNamespaceUtils.TRANSACTION_ATTRIBUTE_SOURCE, new RootBeanDefinition(sourceClass));
        }
    }
    ...
}
```

You can see here we're examining the DOM and making complex decisions about the bean definition based on it. As I said earlier, I think this will be one of the most used support classes for doing bean definition parsing.

## AbstractBeanDefinitionParser

Now for the most customizable choice short of actually implementing the interface for yourself. Basically this particular class not only allows you to create a bean definition, it also hands you enough stuff to create multiple bean definitions. To wit:

```xml
Copy
<tx:annotation-driven />
```

Those familiar with Spring 2.0 and its new namespaces should recognize this tag as being a one-liner that will automatically detect @Transactional annotations and proxy the classes they are contained in. Now under the hood, the same set of bean definitions that you created for a DefaultAutoProxyCreator style behavior in Spring 1.2.8 are created; 4 beans in total. So what does an example of this kind of behavior look like?

```java
Copy
class AnnotationDrivenBeanDefinitionParser extends AbstractBeanDefinitionParser {
    ...
protected BeanDefinition parseInternal(Element element, ParserContext parserContext) {

        // Register the APC if needed.
        AopNamespaceUtils.registerAutoProxyCreatorIfNecessary(parserContext);

        boolean proxyTargetClass = TRUE.equals(element.getAttribute(PROXY_TARGET_CLASS));
        if (proxyTargetClass) {
            AopNamespaceUtils.forceAutoProxyCreatorToUseClassProxying(parserContext.getRegistry());
        }

        String transactionManagerName = element.getAttribute(TxNamespaceUtils.TRANSACTION_MANAGER_ATTRIBUTE);
        Class sourceClass = TxNamespaceUtils.getAnnotationTransactionAttributeSourceClass();

        // Create the TransactionInterceptor definition
        RootBeanDefinition interceptorDefinition = new RootBeanDefinition(TransactionInterceptor.class);
        interceptorDefinition.getPropertyValues().addPropertyValue(
            TxNamespaceUtils.TRANSACTION_MANAGER_PROPERTY, new RuntimeBeanReference(transactionManagerName));
        interceptorDefinition.getPropertyValues().addPropertyValue(
            TxNamespaceUtils.TRANSACTION_ATTRIBUTE_SOURCE, new RootBeanDefinition(sourceClass));

        // Create the TransactionAttributeSourceAdvisor definition.
        RootBeanDefinition advisorDefinition = new RootBeanDefinition(TransactionAttributeSourceAdvisor.class);
        advisorDefinition.getPropertyValues().addPropertyValue(TRANSACTION_INTERCEPTOR, interceptorDefinition);
        return advisorDefinition;
    }
    ...
}
```

The big addition here is the ability to get to the <span style="font-family:courier>ParserContext. This context gives you the ability to delegate sub elements to the namespace handler again and let their parsers create and return bean definitions. It's actually one of the features I really like. The <span style="font-family:courier>ParserContext also allows you to create your own definitions and register them directly if you want.

## So which to use?

It's actually a pretty easy progression. Use AbstractSimpleBeanDefinitionParser if there is a direct correlation between attributes on a tag and properties on a bean. Use AbstractSingleBeanDefinitionParser if you are creating a single bean definition that requires you to do some DOM traversal. If the first two are too constrictive and you want to be able to arbitrarily register your own beans, use AbstractBeanDefinitionParser. Finally if you really like going it on your own you can always directly implement the BeanDefinitionParser interface yourself.

So there you have it, a quick intro to bean definition parsing. What I'd like to know is how many of you are doing this? What have you created namespaces for and how are you using the parser hierarchy? Use the comments to have your voice heard. Who knows, your experiences and suggestions may make there way into a JIRA as an enhancement...

---

*Updated typo in last section* *Updated the consistent typo of Defintion in the text*