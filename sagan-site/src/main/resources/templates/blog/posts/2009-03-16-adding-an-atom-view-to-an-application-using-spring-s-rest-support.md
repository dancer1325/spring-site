---
title: Adding an Atom view to an application using Spring\'s REST support
source: https://spring.io/blog/2009/03/16/adding-an-atom-view-to-an-application-using-spring-s-rest-support
scraped: 2026-02-24T09:10:19.361Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Alef Arendsen |  March 16, 2009 | 0 Comments
---

# Adding an Atom view to an application using Spring's REST support

_Engineering | Alef Arendsen |  March 16, 2009 | 0 Comments_

In Spring 3.0, Spring MVC will be augmented with REST support. This post describes how to use the REST support to implement an AtomView on top of a simple sample application. Follow this step-by-step process to see how easy it is to implement an AtomView on top of a simple application with the new REST support in Spring MVC.

## Step 1: Download the application skeleton

Attached to this blog entry, near the bottom, you will find a simple download that holds a skeleton for a web application. Inside, you will find all Spring 3.0 binaries needed for this application, plus a few extras needed for the Atom functionality. The Spring binaries are based on a nightly build and might be replaced with the final builds once Spring 3.0 has gone final.

Next, load up the project in Eclipse, using the 'Import > Import Existing Projects into Workspace' wizard (from the File menu). The application is a simple Eclipse Dynamic Web Project with all the infrastructure for Spring MVC setup. So if you are familiar to Spring MVC, this shouldn't be too big of a deal.

## Step 2: Review the setup of the application

In /WEB-INF/web.xml you will find the Spring MVC DispatcherServlet being defined. It loads up an application context from the /WEB-INF/rest-servlet.xml file. This file in its turn, contains a component scanner that scan for @Components (also @Controllers) in the com.springsource.samples.rest package.

Next, in the com.springsource.samples.rest package, you will find a ContentController with two controller methods.

```java
Copy
@Controller
public class ContentController {
	
	private List<SampleContent> contentList = new ArrayList<SampleContent>();
	
	@RequestMapping(value="/content.*", method=RequestMethod.GET)
	public ModelAndView getContent() {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("content");
		mav.addObject("sampleContentList", contentList);
		return mav;
	}
	
	@RequestMapping(value="/content.html", method=RequestMethod.POST)
	public String addContent() {
		contentList.add(SampleContent.generateContent("Alef Arendsen", new Date()));
		return "redirect:content.html";
	}
}
```

The first handler returns a list of SampleContent items. The second handler adds a new SampleContent item, by using the SampleContent.generateContent() method. The first handler reacts to GET requests, the second handler reacts to POST requests. The methods themselves have been annotated with @RequestMapping annotations to do this.

In the rest-servlet.xml application context file, in addition to the component scanner, you will also a ViewResolver, in this case an InternalResourceViewResolver. It will take care of the translation between the view name ('content' in the case of the getContent() handler) and the JSP page.

After having deployed this to for example Tomcat, you should be able to go to [](http://localhost:8080/spring-rest/rest)[http://localhost:8080/spring-rest/rest](http://localhost:8080/spring-rest/rest). Thiswill redirect you to /rest/content, a URL that is picked up by the handler.

## Step 3: Implementing the AtomView

To implement the AtomView, we will use the Rome project, available from [https://rome.dev.java.net/](https://rome.dev.java.net/). In the original set up of the application, view names are translated by the view resolver to instances of InternalResourceView, which in this case will render JSPs. We are going to create our own dedicated instance of the View interface, rendering Atom feeds instead.

Create a class called SampleContentAtomView in the com.springsource.samples.rest package and paste in the following code. The code uses the Atom support classes from Spring MVC and the document object model for Atom feeds from the Rome project.

```java
Copy
public class SampleContentAtomView extends AbstractAtomFeedView {

	@Override
	protected void buildFeedMetadata(Map<String, Object> model, Feed feed, HttpServletRequest request) {
		feed.setId("tag:springsource.com");
		feed.setTitle("Sample Content");
		@SuppressWarnings("unchecked")
		List<SampleContent> contentList = (List<SampleContent>)model.get("sampleContentList");
		for (SampleContent content : contentList) {
			Date date = content.getPublicationDate();
			if (feed.getUpdated() == null || date.compareTo(feed.getUpdated()) > 0) {
				feed.setUpdated(date);
			}
		}
	}

	@Override
	protected List<Entry> buildFeedEntries(Map<String, Object> model,
			HttpServletRequest request, HttpServletResponse response) throws Exception {

		@SuppressWarnings("unchecked")
		List<SampleContent> contentList = (List<SampleContent>)model.get("sampleContentList");
		List<Entry> entries = new ArrayList<Entry>(contentList.size());

		for (SampleContent content : contentList) {
			Entry entry = new Entry();
			String date = String.format("%1$tY-%1$tm-%1$td", content.getPublicationDate());
			// see http://diveintomark.org/archives/2004/05/28/howto-atom-id#other
			 entry.setId(String.format("tag:springsource.com,%s:%d", date, content.getId()));
			entry.setTitle(String.format("On %s, %s wrote", date, content.getAuthor()));
			entry.setUpdated(content.getPublicationDate());

			Content summary = new Content();
			summary.setValue(content.getText());
			entry.setSummary(summary);
			
			entries.add(entry);
		}

		return entries;

	}
}
```

## Step 4: Setting up content negotiation

The skeleton web application already provided the HTML view and now we have also implemented the view generating an Atom feed. The last thing we need to do is make sure requests for the Atom feed actually will render using the SampleContentAtomView and the JSP will be rendered when an HTML view is requested.

In a perfect world, a client would ask for a certain representation it prefers using the Accept HTTP header. The Accept HTTP header (as defined by the HTTP specification) can take one or more media types and should be sent by the browser (or any HTTP client for that matter) to indicate what kind of representation it prefers. An appropriate media type for an Atom feed for example would be 'application/atom+xml', while HTML views might just send 'text/html' or 'text/xhtml' as the Accept header. There is a slight problem with this however. Browsers, typically have a fixed set of media types they send along as the Accept HTTP header and there's no way (aside from using JavaScript) to modify the Accept header sent along by the browser. That's why the file extension is a good alternative to indicate to a server what representation you want.

Spring 3.0 features a ContentNegotiatingViewResolver that can work with both the extension as well as the Accept header. After it's figured out an appropriate media type, it delegates to a set of other view resolvers to do this for us. The following needs to be pasted into rest-servlet.xml to get this to work. As you can see, the ContentNegotiatingViewResolver will delegate to a a BeanNameViewResolver (resolving to the SampleContentAtomView if needed) or an InternalResourceViewResolver. The snippet below should, by the way, replace the InternalResourceViewResolver that was already configured in your rest-servlet.xml file.

The ContentNegotiatingViewResolver looks at the file extension first and after that the Accept header is used (this is by the way customizable to a certain degree). We have to map the appropriate extensions to the appropriate media types. In this example, we map .html to the media type text/html and we map .atom to application/atom+xml. This will make sure the appropriate views are rendered.

If a .atom request comes in, the ContentNegotiatingViewResolver will look for a view that matches the application/atom+xml media type. The view resolver will look for a view rendering content with media type text/html is an .html request comes in.

```xml
Copy
<bean class="org.springframework.web.servlet.view.ContentNegotiatingViewResolver">
	<property name="mediaTypes">
		<map>
			<entry key="atom" value="application/atom+xml"/>
			<entry key="html" value="text/html"/>
		</map>
	</property>
	<property name="viewResolvers">
		<list>
			<bean class="org.springframework.web.servlet.view.BeanNameViewResolver"/>
			<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
				<property name="prefix" value="/WEB-INF/jsp/"/>
				<property name="suffix" value=".jsp"/>
			</bean>
		</list>
	</property>
</bean>

<bean id="content" class="com.springsource.samples.rest.SampleContentAtomView"/>
```

After having put this in your application context, giving the server a restart should do the trick. Go to [](http://localhost:8080/spring-rest/rest/content.html)[http://localhost:8080/spring-rest/rest/content.html](http://localhost:8080/spring-rest/rest/content.html) to view all content items and to generate new ones. Go to [](http://localhost:8080/spring-rest/rest/content.atom)[http://localhost:8080/spring-rest/rest/content.atom](http://localhost:8080/spring-rest/rest/content.atom) to subscribe to the Atom feed.

I hope this little blog entry showed you how simple it can be to add an Atom feed to your application. In addition to Atom, Spring has view support classes for rendering PDF and Excel files, JSON representations and XML documents. Check them out and let us know what you think!

## The downloads

As promised, here are the downloads. Note that the projects are based on a nightly build of Spring. For more recent versions, make of Spring 3.0, make sure to check [www.springsource.org](http://www.springsource.org).

-   [The skeleton webapp](http://blog.springsource.com/wp-content/uploads/2009/02/spring-rest1.zip)
-   [The webapp with all the code in there](http://blog.springsource.com/wp-content/uploads/2009/02/spring-rest.zip)