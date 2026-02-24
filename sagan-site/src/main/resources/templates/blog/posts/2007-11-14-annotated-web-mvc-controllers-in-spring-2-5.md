---
title: Annotated Web MVC Controllers in Spring 2.5
source: https://spring.io/blog/2007/11/14/annotated-web-mvc-controllers-in-spring-2-5
scraped: 2026-02-24T09:23:43.692Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Juergen Hoeller |  November 14, 2007 | 0 Comments
---

# Annotated Web MVC Controllers in Spring 2.5

_Engineering | Juergen Hoeller |  November 14, 2007 | 0 Comments_

Spring 2.5 introduces an approach for writing annotated Web MVC controllers, which we haven't been blogging about much yet... I'll take the opportunity to give you an overview of what Spring MVC is really about these days.

Spring MVC is essentially a request dispatcher framework, with a Servlet API variant and Portlet API variant. It operates very closely within its hosting environment - either Servlets or Portlets. Think about Spring MVC as providing foundational facilities and conveniences on top of the Servlet/Portlet container: e.g. flexible request mappings, separation between controller processing and view rendering phase, data binding, basic JSP tag libraries that complement the JSTL, etc. The building blocks of sophisticated HTTP request processing.

Spring MVC is a very flexible affair: Its core DispatcherServlet can not only host its native controllers but can adapt to any kind of action type. It can host plain HttpRequestHandlers that process HTTP-based remoting protocols: This is what Spring users leverage when they define HTTP invoker / Hessian / Burlap service exporters, or XFire exporters for Web Services. DispatcherServlet can even host arbitrary third-party Servlets, allowing those Servlets to be configured and managed by the Spring environment.

## Spring 2.5's annotated controllers

So how does Spring 2.5's annotation-based controller approach fit into this picture? Quite simple: It is essentially an alternative controller type supported by the DispatcherServlet / DispatcherPortlet, not implementing a specific interface but rather using annotations to express request mappings for specific handler methods. It is primarily a next-generation style for implementing multi-action controllers, superseding Spring's good old MultiActionController class.

Let's have a look at an example, taken from the "imagedb" sample application that comes with the Spring distribution. (Note: This is the Spring 2.5 final version of "imagedb", slightly differing from the RC version.)

@Controller
public class ImageController {

private ImageDatabase imageDatabase;

@Autowired
public ImageController(ImageDatabase imageDatabase) {
this.imageDatabase = imageDatabase;
}

@RequestMapping("/imageList")
public String showImageList(ModelMap model) {
model.addAttribute("images", this.imageDatabase.getImages());
return "imageList";
}

@RequestMapping("/imageContent")
public void streamImageContent(@RequestParam("name") String name, OutputStream outputStream)
throws IOException {

this.imageDatabase.streamImage(name, outputStream);
}

@RequestMapping("/imageUpload")
public String processImageUpload(
@RequestParam("name") String name, @RequestParam("description") String description,
@RequestParam("image") MultipartFile image) throws IOException {

this.imageDatabase.storeImage(name, image.getInputStream(), (int) image.getSize(), description);
return "redirect:imageList";
}

@RequestMapping("/clearDatabase")
public String clearDatabase() {
this.imageDatabase.clearDatabase();
return "redirect:imageList";
}
}

What does this controller class really do - what's the point of its design? Let's go through it step by step...

## @Controller and @RequestMapping

First of all, the class is annotated with the **@Controller** stereotype. This indicates that its methods should be scanned for request mappings. It also allows for autodetection through Spring 2.5's component scanning (<context:component-scan>) just like the other stereotypes @Component, @Repository and @Service. In the case of the "imagedb" sample, the ImageController is still defined explicitly through a <bean> tag - simply because autodetection only really pays off in case of a larger number of controllers.

The constructor is marked as **@Autowired** and accepts an argument of type ImageDatabase. This is core Spring 2.5 functionality, namely annotation-driven dependency injection: This constructor will be called passing in a Spring bean of type ImageDatabase, obtained by type from the Spring ApplicationContext. In our case, this is the central ImageDatabase service from the application's service layer.

The actual request mappings are expressed through **@RequestMapping** annotations at the method level. Each of those mappings binds to a specific HTTP path within the containing DispatcherServlet. The mapping path can also be inferred from the handler method name, with a common mapping pattern (e.g. "\*.image") expressed at the type level - reusing the InternalPathMethodNameResolver as known from the good old MultiActionController!

So when using @RequestMapping at the type level, method-level annotations will 'narrow' the mapping for the specific handler methods. @RequestMapping allows for specifying HTTP request methods (e.g. *method = RequestMapping.GET*) or specific request parameters (e.g. *params = "action=save"*), all narrowing the type-level mapping for specific methods. Alternatively, @RequestMapping at the type level can also be combined with a good old Controller interface implementation - such as a SimpleFormController or MultiActionController.

## Flexible handler method signatures

The mapping is what I would call the "obvious" part, since it's pretty clear what's happening there. Now, the not-so-obvious part: the handler method signatures. This is a very flexible affair, not being tied to very specific signatures like in the good old Controller or MultiActionController case. You could be using a standard HttpServletRequest / HttpServletResponse / ModelAndView signature, of course, but the real power lies in using more specific arguments.

The "imagedb" sample shows a couple of fundamental variants:

@RequestMapping("/imageList")
public String showImageList(ModelMap model) {
model.addAttribute("images", this.imageDatabase.getImages());
return "imageList";
}

For this handler method, the only argument to be resolved is a **ModelMap**. ModelMap is a part of Spring 2.0's redesigned ModelAndView object, encapsulating a collection of name-value attribute pairs that will be exposed to the view. The code above simply calls the ImageDatabase service to load a List of ImageDescriptor objects and exposes them under the attribute name "images". Alternatively, you could call the addAttribute variant without an attribute name, in which case the name will be inferred from the given value type (in our case here: "imageDescriptorList").

The **return value is a String**, simply indicating the name of the view to be rendered. Essentially, you could be writing the same method with no arguments and a ModelAndView return value - but the above is usually easier to read and avoids a dependency on the ModelAndView object. (Note that ModelMap is a generic class in the "ui" package, whereas ModelAndView is a rather specific class in the "web.servlet" package.)

@RequestMapping("/imageContent")
public void streamImageContent(@RequestParam("name") String name, OutputStream outputStream)
throws IOException {

this.imageDatabase.streamImage(name, outputStream);
}

This handler method shows a quite different use case. Its purpose is to stream image content from the database to the HTTP response. It writes the response directly, not forwarding to a view; hence its **return type is void**. It uses Spring 2.5's new **@RequestParam** annotation to receive an HTTP request parameter in the form of a method argument, as well as an argument of type **OutputStream** for a handle to the response stream. The actual loading of the image content is delegated to the ImageDatabase service again.

Alternatively, you could implement the same handler method with a more traditional HttpServletRequest / HttpServletResponse signature, gaining more control over the exact HTTP processing. However, this introduces stronger coupling to the Servlet API and takes a bit more effort to unit-test.

@RequestMapping("/imageContent")
public void streamImageContent(HttpServletRequest request, HttpServletResponse response)
throws IOException {

this.imageDatabase.streamImage(request.getParameter("name"), response.getOutputStream());
}

The purpose of such handler methods should already become apparent: They are quite simple 'bridges' between the HTTP request world and the service layer world, adapting request parameters and response contents. Let's have a look at the image upload handler for an advanced example.

@RequestMapping("/imageUpload")
public String processImageUpload(
@RequestParam("name") String name, @RequestParam("description") String description,
@RequestParam("image") MultipartFile image) throws IOException {

this.imageDatabase.storeImage(name, image.getInputStream(), (int) image.getSize(), description);
return "redirect:imageList";
}

The basic purpose is again accepting a couple of specific HTTP request parameters, doing some processing, then returning the name of a view - in this case indicating a redirect to the "imageList" path. However, this particular method processes a multipart file upload, which is why the "image" argument is declared as type **MultipartFile**. Spring's @RequestParam processing will automatically resolve this as multipart element, so that the handler method is able to obtain the file size and to access the uploaded file contents as InputStream.

For a full list of argument types supported for annotated handler methods, see the [@RequestMapping javadoc](http://static.springframework.org/spring/docs/2.5.x/api/org/springframework/web/bind/annotation/RequestMapping.html).

## Beyond stateless multi-action controllers

So much for using Spring 2.5's web annotations to implement multi-action controllers. The same controller style can also accommodate basic form handling, superseding the good old SimpleFormController. This can be seen in the Spring 2.5 version of PetClinic, which has all of its form controllers implemented in the annotation style now, showing the use of form objects and JavaBean-based data binding. A discussion of those form handling capabilities will be the subject of a follow-up post.

Let me conclude with pointing out where Spring MVC's purpose ends: exactly with stateless controllers, basic form handling and flexible view rendering. MVC is fundamentally a dispatching-centric module of Spring's core web support, serving as runtime for many different kinds of usages - and with higher-level functionality to be built on top. In that respect, it is similar to Java EE 5's JSF runtime, which also primarily serves as a basic web platform to build higher-level functionality on top of.

This is where **Spring Web Flow** enters the picture: SWF is our higher-level, conversation-oriented controller engine, with strong support for both *MVC views* and *JSF views*. I strongly recommend checking out SWF for building web user interfaces, in particular when facing non-trivial navigation and state management needs. There is exciting stuff happening in the Spring Web Flow 2.0 milestones, aligned with where the Spring 2.5 MVC foundation is going - but also with a particularly strong focus on JSF, through our new **Spring Faces** module. Watch this space!