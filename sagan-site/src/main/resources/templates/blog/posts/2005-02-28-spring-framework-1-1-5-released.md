---
title: Spring Framework 1.1.5 Released
source: https://spring.io/blog/2005/02/28/spring-framework-1-1-5-released
scraped: 2026-02-24T09:40:21.271Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Colin Sampaleanu |  February 28, 2005 | 0 Comments
---

# Spring Framework 1.1.5 Released

_Releases | Colin Sampaleanu |  February 28, 2005 | 0 Comments_

We are pleased to announce that Spring Framework 1.1.5 has just been released.  

  
This is the last bug fix and minor enhancement release in the 1.1.x series, featuring many minor improvements such as:  

-   added overloaded "reject" and rejectValue" methods without default message to Errors interface and BindException  
    
-   added "lookup(name, requiredType)" convenience method to JndiTemplate, matching the JNDI object against the given type  
    
-   added "homeInterface" property to AbstractRemoteSlsbInvokerInterceptor, for specifying the home interface to narrow to  
    
-   introduced MailMessage interface as common interface for SimpleMailMessage and JavaMail MIME messages  
    
-   Log4jConfigurer accepts a "classpath:" URL or a "file:" URL as location too, not just a plain file path  
    
-   Log4jConfigurer accepts config files that do not reside in the file system, as long as there is no refresh interval  
      
    
-   added "int\[\] batchUpdate(String\[\] sql)" method to JdbcTemplate, for executing a group of SQL statements as a batch  
    
-   added C3P0NativeJdbcExtractor for C3P0 0.8.5 or later (for earlier C3P0 versions, use SimpleNativeJdbcExtractor)  
    
-   added "maxRows" bean property to JdbcTemplate, allowing to specify the maximum number of rows to be fetched  
    
-   added "fetchSize" and "maxRows" bean properties to RdbmsOperation, passing the values to the internal JdbcTemplate  
    
-   added ClobStringTypeHandler, BlobByteArrayTypeHandler and BlobSerializableTypeHandler for iBATIS SQL Maps 2.0.9  
    
-   ResourceHolderSupport throws TransactionTimedOutException if no time-to-live left (before attempting an operation)  
    
-   TransactionSynchronization objects can influence their execution order through implementing the Ordered interface  
    
-   JtaTransactionManager is able to work with a JTA TransactionManager only (i.e. without a UserTransaction handle)  
      
    
-   upgraded MockHttpServletRequest to Servlet API 2.4 (added getRemotePort, getLocalName, getLocalAddr, getLocalPort)  
    
-   upgraded MockPageContext to JSP API 2.0 (added getExpressionEvaluator, getVariableResolver, overloaded include)  
    
-   added "contextOverride" option to ServletContextPropertyPlaceholderConfigurer, letting web.xml override local settings  
    
-   added "searchContextAttributes" option to ServletContextPropertyPlaceholderConfigurer, resolving context attributes  
    
-   added "clear" and "isEmpty" methods to ModelAndView, allowing to clear the view of a given ModelAndView object  
    
-   added JasperReportsMultiFormatView, allowing to specify the output format dynamically via a discriminator in the model  
    
-   JSP EL expressions in Spring's JSP tags will be parsed with JSP 2.0 ExpressionEvaluator on JSP 2.0 (Jakarta JSTL else)  
    
-   changed "spring:transform" tag's "value" attribute from String to Object, to allow for expressions resolved by JSP 2.0  
    

Please see the changelog for details.  
  
Our next milestone is 1.2 RC1, which we intend to release as soon as possible: with Hibernate3 support, JMX support and further major new features. Nightly 1.2-dev snapshots with Hibernate3 support and JMX support will be available within a few days, so feel free to give 1.2 an early try  
![Smile](http://forum.springframework.org/images/smiles/icon_smile.gif)