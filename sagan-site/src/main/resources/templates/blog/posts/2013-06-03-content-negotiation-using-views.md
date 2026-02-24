---
title: Content Negotiation using Views
source: https://spring.io/blog/2013/06/03/content-negotiation-using-views
scraped: 2026-02-24T08:04:41.775Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Paul Chapman |  June 03, 2013 | 5 Comments
---

# Content Negotiation using Views

_Engineering | Paul Chapman |  June 03, 2013 | 5 Comments_

In my previous [post](http://blog.springsource.org/2013/05/11/content-negotiation-using-spring-mvc/) I introduced the concept of content negotiation and the three strategies Spring MVC uses to determine the content requested.

In this post I want to extend the concept specifically to supporting multiple views for different content-types using the `ContentNegotiatingViewResolver` (or CNVR).

## Quick Overview

Since we already know how to setup content-negotiation from the previous [post](http://blog.springsource.org/2013/05/11/content-negotiation-using-spring-mvc/), using it to select between multiple views is very straightforward. Simply define a CNVR like this:

```xml
Copy
    <!--
      // View resolver that delegates to other view resolvers based on the
      // content type
      -->
    <bean class="org.springframework.web.servlet.view.
                                           ContentNegotiatingViewResolver">
       <!-- All configuration now done by manager - since Spring V3.2 -->
       <property name="contentNegotiationManager" ref="cnManager"/>
    </bean>
    
    <!--
      // Setup a simple strategy:
      //  1. Only path extension is taken into account, Accept headers
      //      are ignored.
      //  2. Return HTML by default when not sure.
      -->
    <bean id="cnManager" class="org.springframework.web.accept.
                                   ContentNegotiationManagerFactoryBean">
        <property name="ignoreAcceptHeader" value="true"/>        
        <property name="defaultContentType" value="text/html" />
    </bean>
```

For every request, a `@Controller` would typically return a *logical view name* (or Spring MVC will determine one, by convention from the incoming URL). The CNVR will consult all the other view-resolvers defined in the configuration to see 1) if it has a view with the right name and 2) if it has a view that it also generates the right content - all Views 'know' what content-type they return. The desired content-type is determined in the exact same way discussed in the previous post.

For the equivalent Java configuration see [here](#javaconfig1). And for an extended configuration see [here](#config2). There is a demo application at Github: [](https://github.com/paulc4/mvc-content-neg-views)[https://github.com/paulc4/mvc-content-neg-views](https://github.com/paulc4/mvc-content-neg-views).

For those of you in a hurry, that's it in a nutshell.

For the rest of you, this post shows how we got to it. It discusses the concept of multiple-views in Spring MVC and builds upon that idea to define what the CNVR is, how to use it and how it works. It takes the same Accounts application from the previous [post](http://blog.springsource.org/2013/05/11/content-negotiation-using-spring-mvc/) and builds it up to return account information in HTML, as a Spreadsheet, as JSON and in XML. All using *just* views.

## Why Multiple Views?

One of the strengths of the MVC pattern is the ability to have multiple views for the same data.  In Spring MVC we achieve this using ''*Content Negotiation"*". My previous [post](http://blog.springsource.org/2013/05/11/content-negotiation-using-spring-mvc/) discussed content-negotiation in general and showed examples of RESTful controllers using HTTP Message Converters. But content-negotiation can also be used with Views as well.

For example, suppose I wish to display account information not just as a web-page, but also make it available as a spreadsheet too.  I could use a different URL for each, put two methods on my Spring controller and have each return the correct View type.  (BTW, if you aren´t sure how Spring can create a spreadsheet, I´ll show you that later).

```java
Copy
@Controller
class AccountController {
    @RequestMapping("/accounts.htm")
    public String listAsHtml(Model model, Principal principal) {
        // Duplicated logic
        model.addAttribute( accountManager.getAccounts(principal) );
        return ¨accounts/list¨;         // View determined by view-resolution
    }

    @RequestMapping("/accounts.xls")
    public AccountsExcelView listAsXls(Model model, Principal principal) {
        // Duplicated logic
        model.addAttribute( accountManager.getAccounts(principal) );
        return new AccountsExcelView();  // Return view explicitly
    }
}
```

Using multiple methods is inelegant, defeats the MVC pattern and gets even uglier if I want to support other data formats too - such as PDF, CSV ...  If you recall in the previous [post](http://blog.springsource.org/2013/05/11/content-negotiation-using-spring-mvc/) we had a similar problem wanting a single method to return JSON or XML (which we solved by returning a single `@RequestBody` object and picking the right HTTP Message Converter).

\[caption id="attachment\_13458" align="alignleft" width="380" caption="Picking the right view via Content-Negotiation."\][![](http://blog.springsource.org/wp-content/uploads/2013/06/cnvr-flow.png "View Resolution using CNVR")](http://blog.springsource.org/wp-content/uploads/2013/06/cnvr-flow.png)\[/caption\]

Now we need a "smart" view resolver that picks the *right* View from *multiple* possible views.

Spring MVC has long supported multiple view resolvers, and goes to each in turn to find a view. Although the order that view resolvers are consulted can be specified, Spring MVC always picks the *first* view offered.  The ''*Content Negotiating View Resolver*'' (CNVR) negotiates between *all* the view resolvers to find the *best* match for the format desired - this *is* our "smart" view resolver.

## Listing User Accounts Example

[![](http://blog.springsource.org/wp-content/uploads/2013/05/acounts-html.png "Accounts Page as HTML")](http://blog.springsource.org/wp-content/uploads/2013/05/acounts-html.png)

Here is a simple account listing application which we will use as our worked example to list accounts in HTML, in a spreadsheet and (later) in JSON and XML formats - just using views.

The complete code can be found at Github: [](https://github.com/paulc4/mvc-content-neg-views)[https://github.com/paulc4/mvc-content-neg-views](https://github.com/paulc4/mvc-content-neg-views). It is a variation on the application I showed you last time that *only* uses views to generate output. **Note**: to keep the examples below simple I have used JSPs directly and an `InternalResourceViewResolver`. The Github project uses Tiles and JSPs because it's easier than raw JSPs.

The screenshot of the accounts list HTML page shows all the accounts for the currently logged in user. You will see screenshots of the spreadsheet and JSON output later.

The Spring MVC controller that generated our page is below. Note that the HTML output is generated by the logical view `accounts/list`.

```java
Copy
@Controller
class AccountController {
    @RequestMapping("/accounts")
    public String list(Model model, Principal principal) {
        model.addAttribute( accountManager.getAccounts(principal) );
        return ¨accounts/list¨;
    }
}
```

To show two types of views we need two types of view resolver - one for HTML and one for the spreadsheet (to keep it simple, I will use a JSP for the HTML view). Here is the Java Configuration:

```java
Copy
@Configuration
@EnableWebMvc
public class MvcConfiguration extends WebMvcConfigurerAdapter {

    @Autowired
    ServletContext servletContext;

    // Will map to bean called "accounts/list" in "spreadsheet-views.xml"
    @Bean(name="excelViewResolver")
    public ViewResolver getXmlViewResolver() {
        XmlViewResolver resolver = new XmlViewResolver();
        resolver.setLocation(new ServletContextResource(servletContext,
                    "/WEB-INF/spring/spreadsheet-views.xml"));
        resolver.setOrder(1);
        return resolver;
    }

    // Will map to the JSP page: "WEB-INF/views/accounts/list.jsp"
    @Bean(name="jspViewResolver")
    public ViewResolver getJspViewResolver() {
        InternalResourceViewResolver resolver =
                            new InternalResourceViewResolver();
        resolver.setPrefix("WEB-INF/views");
        resolver.setSuffix(".jsp");
        resolver.setOrder(2);
        return resolver;
    }
}
```

Or in XML:

```xml
Copy
  <!-- Maps to a bean called "accounts/list" in "spreadsheet-views.xml" -->
  <bean class="org.springframework.web.servlet.view.XmlViewResolver">
    <property name="order" value="1"/>
    <property name="location" value="WEB-INF/spring/spreadsheet-views.xml"/>
  </bean>

  <!-- Maps to "WEB-INF/views/accounts/list.jsp" -->
  <bean class="org.springframework.web.servlet.view.
                                        InternalResourceViewResolver">
    <property name="order" value="2"/>
    <property name="prefix" value="WEB-INF/views"/>
    <property name="suffix" value=".jsp"/>
  </bean>
```

And in `WEB-INF/spring/spreadsheet-beans.xml` you will find

```xml
Copy  <bean id="accounts/list" class="rewardsonline.accounts.AccountExcelView"/>
```

The generated spreadsheet looks like this:

[![](http://blog.springsource.org/wp-content/uploads/2013/04/account-list-xls.png "account-list-xls")](http://blog.springsource.org/wp-content/uploads/2013/04/account-list-xls.png)

Here is how to create a spreadsheet using a view (this is a simplified version, the full implementation is much longer, but you get the idea):

```java
Copyclass AccountExcelView extends AbstractExcelView {
    @Override
    protected void buildExcelDocument(Map<String, Object> model,
            HSSFWorkbook workbook, HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        List<Account> accounts = (List<Account>) model.get("accountList");
        HSSFCellStyle dateStyle = workbook.createCellStyle();
        dateStyle.setDataFormat(HSSFDataFormat.getBuiltinFormat("m/d/yy"));
        HSSFSheet sheet = workbook.createSheet();
    
        for (short i = 0; i < accounts.size(); i++) {
            Account account = accounts.get(i);
            HSSFRow row = sheet.createRow(i);
            addStringCell(row, 0, account.getName());
            addStringCell(row, 1, account.getNumber());
            addDateCell(row, 2, account.getDateOfBirth(), dateStyle);
        }   
    }   
    
    private HSSFCell addStringCell(HSSFRow row, int index, String value) {
        HSSFCell cell = row.createCell((short) index);
        cell.setCellValue(new HSSFRichTextString(value));
        return cell;
    }   
    
    private HSSFCell addDateCell(HSSFRow row, int index, Date date,
        HSSFCellStyle dateStyle) {
        HSSFCell cell = row.createCell((short) index);
        cell.setCellValue(date);
        cell.setCellStyle(dateStyle);
        return cell;
    }   
} 
```

## Adding Content Negotiation

As it currently stands this setup will always return the spreadsheet because the `XmlViewResolver` is consulted first (its `order` property is 1) and it always returns the `AccountExcelView`.  The `InternalResourceViewResolver` is never consulted (its `order` is 2 and we never get that far).

This is where the CNVR comes in. Let's quickly review what we know about the content selection strategy discussed in the previous [post](http://blog.springsource.org/2013/05/11/content-negotiation-using-spring-mvc/). The requested content-type is determined by checking, in this order:

-   A URL suffix (path extension) - for example `http://...accounts.json` to indicate JSON format.
-   Or a URL parameter can be used. By default it is named `format`, for example `http://...accounts?format=json`.
-   Or the HTTP `Accept` header property will be used (which is actually how HTTP is defined to work, but is not always convenient to use - especially when the client is a browser).

In the first two cases the suffix or parameter value (`xml`, `json` ...) must be mapped to the correct mime-type. Either the *JavaBeans Activation Framework* can be used or the mappings can be specified explicitly. With the `Accept` header property, its value *is* the mine-type.

## The Content Negotiating View Resolver

This is a special view resolver that has our strategy plugged into it. Here is the Java Configuration:

```java
Copy
@Configuration
@EnableWebMvc
public class MvcConfiguration extends WebMvcConfigurerAdapter {
 
  /**
    * Setup a simple strategy:
    *  1. Only path extension taken into account, Accept headers ignored.
    *  2. Return HTML by default when not sure.
    */
  @Override
  public void configureContentNegotiation
                          (ContentNegotiationConfigurer configurer) {
      configurer.ignoreAcceptHeader(true)
                .defaultContentType(MediaType.TEXT_HTML);
  }

  /**
    * Create the CNVR. Get Spring to inject the ContentNegotiationManager
    * created by the configurer (see previous method).
    */
  @Bean
  public ViewResolver contentNegotiatingViewResolver(
                             ContentNegotiationManager manager) {
    ContentNegotiatingViewResolver resolver =
                            new ContentNegotiatingViewResolver();
    resolver.setContentNegotiationManager(manager);
    return resolver;
  }
}
```

Or in XML:

```xml
Copy
    <!--
      // View resolver that delegates to other view resolvers based on the
      // content type
      -->
    <bean class="org.springframework.web.servlet.view.
                                      ContentNegotiatingViewResolver">
       <!-- All configuration now done by manager - since Spring V3.2 -->
       <property name="contentNegotiationManager" ref="cnManager"/>
    </bean>
    
    <!--
      // Setup a simple strategy:
      //  1. Only path extension taken into account, Accept headers ignored.
      //  2. Return HTML by default when not sure.
      -->
    <bean id="cnManager" class="org.springframework.web.accept.
                                  ContentNegotiationManagerFactoryBean">
        <property name="ignoreAcceptHeader" value="true"/>        
        <property name="defaultContentType" value="text/html" />
    </bean>
```

The `ContentNegotiationManager` is exactly the same bean I discussed in the previous [post](http://blog.springsource.org/2013/05/11/content-negotiation-using-spring-mvc/).

The CNVR automatically goes to *every* other view resolver bean defined to Spring and asks it for a `View` instance corresponding to the view-name returned by the controller - in this case `accounts/list`.  Each `View` 'knows' what sort of content it can generate because there is a `getContentType()` method on it (inherited from the `View` interface).  The JSP page is rendered by a `JstlView` (returned by the `InternalResourceViewResolver`) and its content-type is `text/html`, whilst the `AccountExcelView` generates `application/vnd.ms-excel`.

How the CNVR is actually configured is delegated to the `ContentNegotiationManager` which is created in turn via the configurer (Java Configuration) or one of Spring's many factory beans (XML).

The last piece of the puzzle is: *how does the CNVR know what content-type was requested*? Because the content-negotiation strategy tells it what to do: either a URL suffix is recognized, or a URL parameter or an Accept header. Exactly the same strategy setup described in the previous [post](http://blog.springsource.org/2013/05/11/content-negotiation-using-spring-mvc/), reused by the CNVR.

> Note that when content-negotiation strategies were introduced by Spring 3.0 they only applied to selecting Views. Since 3.2 this facility is available across the board (as per my previous [post](http://blog.springsource.org/2013/05/11/content-negotiation-using-spring-mvc/)). The examples in this post use Spring 3.2 and may be different to older examples you have seen before. In particular most of the properties for configuring the content-negotiation strategy are now on the `ContentNegotiationManagerFactoryBean` and not on the `ContentNegotiatingViewResolver`. The properties on the CNVR are now deprecated in favor of those on the manager but the CNVR itself works exactly the same way that it always did.

## Configuring the Content Negotiating View Resolver

By default the CNVR automatically detects all `ViewResolvers` defined to Spring and negotiates between them. If you prefer, the CNVR itself has a `viewResolvers` property so you can tell it *explicitly* which view resolvers to use. This makes it obvious that the CNVR is the master resolver and the others are subordinate to it. Note that the `order` property is no longer needed.

```java
Copy
@Configuration
@EnableWebMvc
public class MvcConfiguration extends WebMvcConfigurerAdapter {
 
  // .. Other methods/declarations

  /**
    * Create the CNVR.  Specify the view resolvers to use explicitly.
    * Get Spring to inject the ContentNegotiationManager created by the
    * configurer (see previous method).
    */
  @Bean
  public ViewResolver contentNegotiatingViewResolver(
                        ContentNegotiationManager manager) {
    // Define the view resolvers
    List<ViewResolver> resolvers = new ArrayList<ViewResolver>();

    XmlViewResolver r1 = new XmlViewResolver();
    resolver.setLocation(new ServletContextResource(servletContext,
            "/WEB-INF/spring/spreadsheet-views.xml"));
    resolvers.add(r1);

    InternalResourceViewResolver r2 = new InternalResourceViewResolver();
    r2.setPrefix("WEB-INF/views");
    r2.setSuffix(".jsp");
    resolvers.add(r2);

    // Create CNVR plugging in the resolvers & content-negotiation manager
    ContentNegotiatingViewResolver resolver =
                        new ContentNegotiatingViewResolver();
    resolver.setViewResolvers(resolvers);
    resolver.setContentNegotiationManager(manager);
    return resolver;
  }
}
```

Or in XML:

```xml
Copy
  <bean class="org.springframework.web.servlet.view.
                                ContentNegotiatingViewResolver">
    <property name="contentNegotiationManager" ref="cnManager"/>

    <!-- Define the view resolvers explicitly -->
    <property name="viewResolvers">
      <list>
        <bean class="org.springframework.web.servlet.view.XmlViewResolver">
          <property name="location" value="spreadsheet-views.xml"/>
        </bean>
    
        <bean class="org.springframework.web.servlet.view.
                                InternalResourceViewResolver">
          <property name="prefix" value="WEB-INF/views"/>
          <property name="suffix" value=".jsp"/>
        </bean>
      </list>
    </property>
  </bean>
```

The Github demo project uses 2 sets of Spring profiles. In the `web.xml`, you can specify `xml` or `javaconfig` for XML or Java configuration respectively. And for either of them, specify either `separate` or `combined`. The `separate` profile defines all view resolvers as top-level beans and lets the CNVR scan the context to find them (as discussed in the previous section). In the `combined` profile the view resolvers are defined explicitly, not as Spring beans and passed to the CNVR via its `viewResolvers` property (as shown in this section).

## JSON Support

Spring provides a `MappingJacksonJsonView` that supports the generation of JSON data from Java objects using the Jackson Object to JSON mapping library.  The `MappingJacksonJsonView` automatically converts all attributes found in the Model to JSON.  The only exception is that it ignores `BindingResult` objects since these are internal to Spring MVC form-handling and not needed.

A suitable view resolver is needed and Spring doesn't provide one.  Fortunately it is very simple to write your own:

```java
Copy
public class JsonViewResolver implements ViewResolver {
    /**
     * Get the view to use.
     *
     * @return Always returns an instance of {@link MappingJacksonJsonView}.
     */
    @Override
    public View resolveViewName(String viewName, Locale locale)
                                                 throws Exception {
        MappingJacksonJsonView view = new MappingJacksonJsonView();
        view.setPrettyPrint(true);   // Lay JSON out to be nicely readable 
        return view;
    }
}
```

Simply declaring this view resolver as a Spring bean means JSON format data can be returned. The JAF already maps `json` to `application/json` so we are done. A URL like `[http://myserver/myapp/accounts/list.json](http://myserver/myapp/accounts/list.json)` can now return the account information in JSON. Here is the output from our Accounts application:

[![](http://blog.springsource.org/wp-content/uploads/2013/04/account-list-json.png "account-list-json")](http://blog.springsource.org/wp-content/uploads/2013/04/account-list-json.png)

For more on this View, see the [Spring Javadoc](http://static.springsource.org/spring/docs/current/javadoc-api/org/springframework/web/servlet/view/json/MappingJacksonJsonView.html).

## XML Support

There is a similar class for generating XML output - the [MarshallingView](http://static.springsource.org/spring/docs/current/javadoc-api/org/springframework/web/servlet/view/xml/MarshallingView.html). It takes the first object in the model that can be marshalled and processes it. You can optionally configure the view by telling it which Model attribute (key) to pick - see `setModelKey()`.

Again we need a view resolver for it. Spring supports several marshalling technologies via Spring's [Object to XML Marshalling (OXM)](http://static.springsource.org/spring/docs/current/spring-framework-reference/html/oxm.html) abstraction. Let's just use JAXB2 since it is built into the JDK (since JDK 6). Here is the resolver:

```java
Copy
/**
 * View resolver for returning XML in a view-based system.
 */
public class MarshallingXmlViewResolver implements ViewResolver {

    private Marshaller marshaller;

    @Autowired
    public MarshallingXmlViewResolver(Marshaller marshaller) {
        this.marshaller = marshaller;
    }

    /**
     * Get the view to use.
     * 
     * @return Always returns an instance of {@link MappingJacksonJsonView}.
     */
    @Override
    public View resolveViewName(String viewName, Locale locale)
                                                 throws Exception {
        MarshallingView view = new MarshallingView();
        view.setMarshaller(marshaller);
        return view;
    }
}
```

Again my classes need annotating to work with JAXB (in response to comments, I have added an example of this to the end of my previous [post](http://blog.springsource.org/2013/05/11/content-negotiation-using-spring-mvc/#annotated-account-class)).

Configure the new resolver as a Spring bean using Java Configuration:

```java
Copy
  @Bean(name = "marshallingXmlViewResolver")
  public ViewResolver getMarshallingXmlViewResolver() {
      Jaxb2Marshaller marshaller = new Jaxb2Marshaller();

      // Define the classes to be marshalled - these must have
      // @Xml... annotations on them
      marshaller.setClassesToBeBound(Account.class,
                               Transaction.class, Customer.class);
      return new MarshallingXmlViewResolver(marshaller);
  }
```

Or we can do the same thing in XML - note the use of the oxm namespace:

```xml
Copy<oxm:jaxb2-marshaller id="marshaller" >
    <oxm:class-to-be-bound name="rewardsonline.accounts.Account"/>
    <oxm:class-to-be-bound name="rewardsonline.accounts.Customer"/>
    <oxm:class-to-be-bound name="rewardsonline.accounts.Transaction"/>
</oxm:jaxb2-marshaller>

<!-- View resolver that returns an XML Marshalling view. -->
<bean class="rewardsonline.accounts.MarshallingXmlViewResolver" >
    <constructor-arg ref="marshaller"/>
</bean>
```

This is our finished system:

[![Full system with CNVR and 4 view-resolvers](http://blog.springsource.org/wp-content/uploads/2013/06/cnvr-all-flow.png "cnvr-all-flow")](http://blog.springsource.org/wp-content/uploads/2013/06/cnvr-all-flow.png)

## Comparing RESTful Approaches

Full support for a RESTful approach with MVC is available using `@ResponseBody`, `@ResponseStatus` and other REST related MVC annotations.  Something like this:

```java
Copy
@RequestMapping(value="/accounts",
                produces={"application/json", "application/xml"})
@ResponseStatus(HttpStatus.OK)
public @ResponseBody List<Account> list(Principal principal) {
    return accountManager.getAccounts(principal);
}
```

To enable the same content-negotiation for our `@RequestMapping` methods, we must reuse our content-negotiation manager (this allows the `produces` option to work).

```java
Copy
<mvc:annotation-driven
          content-negotiation-manager="contentNegotiationManager" />
```

However this produces a different style of Controller method, the advantage being it is also more powerful. So which way to go: Views or `@ResponseBody`?

For an existing web-site already using Spring MVC and views, the `MappingJacksonJsonView` and `MarshallingView` provide an easy way to extend the web-application to return JSON and/or XML as well.  In many cases, these are the only data-formats you need and is an easy way to support read-only mobile apps and/or AJAX enabled web-pages where RESTful requests are only used to *GET* data.

Full support for REST, including the ability to modify data, involves the use of annotated controller methods in conjunction with HTTP Message Converters. Using views in this case doesn't make sense, just return a `@ResponseBody` object and let the converter do the work.

However, as shown <a href="[http://blog.springsource.org/2013/05/11/content-negotiation-using-spring-mvc/#combined-controller"">here](http://blog.springsource.org/2013/05/11/content-negotiation-using-spring-mvc/#combined-controller%22%22%3Ehere) in my previous post, it is perfectly possible for a controller to use both approaches at the same time. Now the same controller can support both traditional web-applications and implement a full RESTful interface, enhancing web-applications that may have been built-up and developed over many years.

Spring has always been strong on offering developers flexibility and choice. This is no exception.