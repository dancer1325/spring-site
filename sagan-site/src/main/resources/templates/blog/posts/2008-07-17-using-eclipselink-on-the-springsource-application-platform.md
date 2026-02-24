---
title: Using EclipseLink on the SpringSource Application Platform
source: https://spring.io/blog/2008/07/17/using-eclipselink-on-the-springsource-application-platform
scraped: 2026-02-24T09:15:52.877Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rob Harrop |  July 17, 2008 | 0 Comments
---

# Using EclipseLink on the SpringSource Application Platform

_Engineering | Rob Harrop |  July 17, 2008 | 0 Comments_

This week the EclipseLink team [announced the release of EclipseLink 1.0](http://eclipselink.blogspot.com/2008/07/eclipselink-10-released.html). I've been using EclipseLink on S2AP for a while now; in fact, I used EclipseLink when developing our JPA load-time-weaving support.

We've yet to upgrade our internal usage to 1.0 - our beta9 was tagged just before the announcement - but I wanted to demonstrate how effectively the pairing works in an OSGi environment.

## EclipseLink in Petclinic

In the [1.2.0 version](http://dist.springsource.com/release/AP/petclinic-1.2.0.RELEASE.zip) of the S2AP Petclinic sample, we released the EclipseLink implementation of the Clinic back-end. The back-end is a drop-in replacement for the JDBC back-end that was previously the only option.

## Building Petclinic EclipseLink

To build the EclipseLink version of Petclinic, simply open a terminal window in the Petclinic root directory and run:

```code
Copycd org.springframework.petclinic.eclipselink
ant collect-provided jar
```

```
Copy	<p>
		This will create the Petclinic EclipseLink PAR file in  <span style="font-family:courier">org.springframework.petclinic.eclipselink/target/artifacts/org.springframework.petclinic.eclipselink.par</span> and will put all the required bundles in  <span style="font-family:courier">org.springframework.petclinic.eclipselink/target/par-provided/bundles/</span>.
	</p>
	<h2 id="running-petclinic-eclipselink">
		Running Petclinic EclipseLink
	</h2>
	<p>
		To run the Petclinic EclipseLink application, copy all the provided bundles to the S2AP repository directory:
	</p>
	
```

```code
Copycp target/par-provided/bundles/*.jar $PLATFORM_HOME/repository/bundles/usr
```

```
Copy	<p>
		And then copy the PAR file to the S2AP  <span style="font-family:courier">pickup</span> directory:
	</p>
	
```

```code
Copycp target/artifacts/org.springframework.petclinic.eclipselink.par $PLATFORM_HOME/pickup
```

```
Copy	<p>
		Once that is done, you can start the HSQLDB database needed by the Petclinic application:
	</p>
	
```

```code
Copycd $PETCLINIC_ROOT
cd db/hsqldb
chmod +x server.sh
./server.sh
```

```
Copy	<p>
		Now start the S2AP instance:
	</p>
	
```

```code
Copy$PLATFORM_HOME/bin/startup.sh
```

```
Copy	<p>
		When this is complete you should see log messages like this:
	</p>
	
```

```code
Copy[2008-07-11 10:03:24.560] fs-watcher               <SPSC1000I> Creating web application '/petclinic'.
[2008-07-11 10:03:27.419] async-delivery-thread-1  <SPSC1001I> Starting web application '/petclinic'.
[2008-07-11 10:03:27.904] fs-watcher               <SPDE0010I> Deployment of 'org.springframework.petclinic.eclipselink' version '1.2.0.BUILD-20080711085448' completed.
```

```
Copy	<h2 id="testing-petclinic-eclipselink">
		Testing Petclinic EclipseLink
	</h2>
	<p>
		To try the application out, simply hit  <span style="font-family:courier">http://localhost:8080/petclinic</span>:
	</p>
	<p>
		<img alt="Petclinic Home Page" src="http://blog.springsource.com/main/wp-content/uploads/2008/07/petclinic.png" />
	</p>
	<h2 id="modularity-in-petclinic-eclipselink">
		Modularity in Petclinic EclipseLink
	</h2>
	<p>
		The Petclinic EclipseLink application is made up of six bundles:
	</p>
	<p>
		<img src="http://blog.springsource.com/main/wp-content/uploads/2008/07/modules.png" alt="Module Layout" />
	</p>
	<p>
		The  <span style="font-family:courier">domain</span>,  <span style="font-family:courier">web</span>,  <span style="font-family:courier">repository</span> and  <span style="font-family:courier">infrastructure</span> bundles are common across all versions of the application. These bundles have the following roles:
	</p>
	<ul>
		<li>
			 <span style="font-family:courier">domain</span> - contains the persistent types such as  <span style="font-family:courier">Pet</span> and  <span style="font-family:courier">Vet</span>
		</li>
		<li>
			 <span style="font-family:courier">repository</span> - contains the main repository interface  <span style="font-family:courier">Clinic</span>
		</li>
		<li>
			 <span style="font-family:courier">web</span> - contains all the web front-end classes and configuration
		</li>
		<li>
			 <span style="font-family:courier">infrastructure</span> - defines the  <span style="font-family:courier">DataSource</span> to connect to HSQLDB and exports this as a service
		</li>
	</ul>
	<p>
		Note that the  <span style="font-family:courier">web</span> bundle only depends on the  <span style="font-family:courier">domain</span> and  <span style="font-family:courier">repository</span> bundles at the module level. This means that  <span style="font-family:courier">web</span> only needs types from those two bundles. In the case of  <span style="font-family:courier">Clinic</span> which is an interface, the  <span style="font-family:courier">web</span> bundle gets its implementation from OSGi:
	</p>
	
```

```xml
Copy <reference id="clinic" interface="org.springframework.petclinic.repository.Clinic"/>
```

```
Copy	<h3 id="basic-jpa-implementation-and-configuration">
		Basic JPA Implementation and Configuration
	</h3>
	<p>
		The implementation of the  <span style="font-family:courier">Clinic</span> interface is provided by the  <span style="font-family:courier">repository.jpa</span> bundle. It is worthwhile looking at the implementation and configuration of this bundle in some detail. The  <span style="font-family:courier">EntityManagerClinic</span> class implements  <span style="font-family:courier">Clinic</span> using JPA:
	</p>
	
```

```java
Copy@Repository
@Transactional
public class EntityManagerClinic implements Clinic {

    @PersistenceContext
    private EntityManager em;

    @Transactional(readOnly = true)
    @SuppressWarnings("unchecked")
    public Collection<Vet> getVets() {
        return this.em.createQuery("SELECT vet FROM Vet vet ORDER BY vet.lastName, vet.firstName").getResultList();
    }

    @Transactional(readOnly = true)
    @SuppressWarnings("unchecked")
    public Collection<PetType> getPetTypes() {
        return this.em.createQuery("SELECT ptype FROM PetType ptype ORDER BY ptype.name").getResultList();
    }

    @Transactional(readOnly = true)
    @SuppressWarnings("unchecked")
    public Collection<Owner> findOwners(String lastName) {
        Query query = this.em.createQuery("SELECT owner FROM Owner owner WHERE owner.lastName LIKE :lastName");
        query.setParameter("lastName", lastName + "%");
        return query.getResultList();
    }

    @Transactional(readOnly = true)
    public Owner loadOwner(int id) {
        return this.em.find(Owner.class, id);
    }

    @Transactional(readOnly = true)
    public Pet loadPet(int id) {
        return this.em.find(Pet.class, id);
    }

    public void storeOwner(Owner owner) {
        // Consider returning the persistent object here, for exposing
        // a newly assigned id using any persistence provider...
        Owner merged = this.em.merge(owner);
        this.em.flush();
        owner.setId(merged.getId());
    }

    public void storePet(Pet pet) {
        // Consider returning the persistent object here, for exposing
        // a newly assigned id using any persistence provider...
        Pet merged = this.em.merge(pet);
        this.em.flush();
        pet.setId(merged.getId());
    }

    public void storeVisit(Visit visit) {
        // Consider returning the persistent object here, for exposing
        // a newly assigned id using any persistence provider...
        Visit merged = this.em.merge(visit);
        this.em.flush();
        visit.setId(merged.getId());
    }

}
```

```
Copy	<p>
		This class depends on a standard JPA  <span style="font-family:courier">EntityManager</span> which is annotated for injection using  <span style="font-family:courier">@PersistenceContext</span>. The transaction configuration is defined using Spring's  <span style="font-family:courier">@Transactional</span> annotation. The configuration for the  <span style="font-family:courier">EntityManagerClinic</span> is contained in  <span style="font-family:courier">module-context.xml</span>:
	</p>
	
```

```xml
Copy<bean id="clinic" class="org.springframework.petclinic.repository.jpa.EntityManagerClinic"/>
```

```
Copy	<p>
		The  <span style="font-family:courier">EntityManagerClinic</span> needs to be injected with an  <span style="font-family:courier">EntityManager</span>. Spring's JPA support provides the  <span style="font-family:courier">LocalContainerEntityManagerFactoryBean</span> which provides access to a shared  <span style="font-family:courier">EntityManager</span>:
	</p>
	<p>
		To enable Spring transaction management, the configuration defines a  <span style="font-family:courier">JpaTransactionManager</span>:
	</p>
	
```

```xml
Copy<!-- JPA EntityManagerFactory -->
<bean id="entityManagerFactory" class="org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean"
    p:dataSource-ref="dataSource">
    <property name="jpaVendorAdapter" ref="jpaVendorAdapter" />
</bean>
```

```
Copy	<p>
		The  <span style="font-family:courier">JpaVendorAdapter</span> defines which provider you are using, along with the provider-specific configuration. Rather than define the  <span style="font-family:courier">JpaVendorAdapter</span> in-line, Petclinic uses an OSGi service to get the  <span style="font-family:courier">JpaVendorAdapter</span> from another bundle. This allows for different JPA providers to be added without having to change the core  <span style="font-family:courier">repository.jpa</span> bundle.
	</p>
	<p>
		Enabling Spring's annotation-driven configuration will allow for the configured  <span style="font-family:courier">EntityManager</span> to be injected into the  <span style="font-family:courier">EntityManagerClinic</span>:
	</p>
	
```

```xml
Copy<context:annotation-config/>
```

```
Copy	<p>
		Transactions are enabled using the  <span style="font-family:courier">JpaTransactionManager</span> and annotation-driven configuration:
	</p>
	
```

```xml
Copy<!-- Transaction manager for a single JPA EntityManagerFactory (alternative to JTA) -->
<bean id="transactionManager" class="org.springframework.orm.jpa.JpaTransactionManager"
        p:entityManagerFactory-ref="entityManagerFactory"/>

<tx:annotation-driven mode="aspectj"/>
```

```
Copy	<p>
		Notice that the configuration defines the transaction mode as  <span style="font-family:courier">aspectj</span>. In this mode, AspectJ load-time weaving is used to apply the transaction behaviour. This requires that Spring's load-time weaving support be enabled and configured for AspectJ weaving:
	</p>
	
```

```xml
Copy<context:load-time-weaver aspectj-weaving="on"/>
```

```
Copy	<p>
		The  <span style="font-family:courier">LoadTimeWeaver</span> is also used to support the weaving needed by EclipseLink when it transforms the persistent types. No special configuration is needed to use the S2AP  <span style="font-family:courier">LoadTimeWeaver</span>; this will be added when the application is deployed.
	</p>
	<p>
		The  <span style="font-family:courier">osgi-context.xml</span> configuration pulls in the necessary services and exports the  <span style="font-family:courier">EntityManagerClinic</span>:
	</p>
	
```

```xml
Copy<service id="osgiClinic"
         ref="clinic"
         interface="org.springframework.petclinic.repository.Clinic" />

<reference id="dataSource" interface="javax.sql.DataSource"/>
<reference id="jpaVendorAdapter" interface="org.springframework.orm.jpa.JpaVendorAdapter"/>
```

```
Copy	<p>
		Notice that the  <span style="font-family:courier">JpaVendorAdapter</span> is being referenced as an OSGi service - this allows the  <span style="font-family:courier">repository.jpa.eclipselink</span> bundle to provide the exact  <span style="font-family:courier">JpaVendorAdapter</span> needed to run with EclipseLink.
	</p>
	<h3 id="eclipselink-specific-configuration">
		EclipseLink-specific configuration
	</h3>
	<p>
		The configuration for the  <span style="font-family:courier">JpaVendorAdapter</span> is contained in the  <span style="font-family:courier">repository.jpa.eclipselink</span> bundle:
	</p>
	
```

```xml
Copy<context:property-placeholder location="classpath:META-INF/spring/jpa.properties,classpath:org/springframework/petclinic/infrastructure/db.properties" />

<bean id="jpaVendorAdapter" class="org.springframework.orm.jpa.vendor.EclipseLinkJpaVendorAdapter"
    p:databasePlatform="${jpa.eclipselink.databasePlatform}" p:showSql="${jpa.showSql}"/>;
```

```
Copy	<p>
		The  <span style="font-family:courier">jpaVendorAdapter</span> bean is then exported as an OSGi service:
	</p>
	
```

```xml
Copy<service ref="jpaVendorAdapter" interface="org.springframework.orm.jpa.JpaVendorAdapter" />;
```

```
Copy	<h2 id="import-scopes">
		Import Scopes
	</h2>
	<p>
		To enable the  <span style="font-family:courier">Clinic</span> implementation to be switched without having to make changes to the four core bundles, it is important that any changes are contained within the implementation bundles only. Unfortunately, this is not possible in standard OSGi.
	</p>
	<p>
		When EclipseLink weaves a type, it adds dependencies on its own types to that type. For instance, weaving  <span style="font-family:courier">Vet</span> will cause  <span style="font-family:courier">Vet</span> and thus the  <span style="font-family:courier">domain</span> bundle to depend on EclipseLink. One way of solving this is simply to add the appropriate  <span style="font-family:courier">Import-Package</span> or  <span style="font-family:courier">Import-Bundle</span> statements to the  <span style="font-family:courier">domain</span> bundle. This is undesirable because it breaks the modularity - the  <span style="font-family:courier">domain</span> bundle shouldn't care about how it is persisted.
	</p>
	<p>
		This problem exists wherever bytecode transformation is used, and to a lesser degree where runtime class generation is used. For example, when using Hibernate, CGLIB is used to generate subclasses of persistent types. For the most part this is fine, except when some other code starts to reflect on objects of this dynamically generated type. This is quite common in web code, where reflection is used for data binding - all of a sudden the web bundle finds it has a dependency on Hibernate!
	</p>
	<p>
		To solve this, S2AP supports the notion of Import Scopes. When using  <span style="font-family:courier">Import-Bundle</span> inside an application, you can define that the scope of the import is the application. This will cause the import to be added to all the other modules in the application dynamically. This allows you to get the dependencies you need to make your application run, but without having to make changes to your application that might limit its flexibility.
	</p>
	<h3 id="configuring-import-scope">
		Configuring Import Scope
	</h3>
	<p>
		The  <span style="font-family:courier">repository.jpa</span> bundle has no dependency on EclipseLink:
	</p>
	
```

```code
CopyManifest-Version: 1.0
Bundle-Version: 1.0.0
Bundle-ManifestVersion: 2
Bundle-SymbolicName: org.springframework.petclinic.repository.jpa
Bundle-Name: PetClinic JPA-based Repository Implementation
Bundle-Vendor: SpringSource Inc.
Import-Library: org.springframework.spring;version="[2.5,2.6)"
Import-Bundle: com.springsource.javax.persistence;version="[1.0.0,1.0.0]",
 com.springsource.org.aspectj.runtime;version="1.6.0",
 com.springsource.org.aspectj.weaver;version="1.6.0"
Import-Package: javax.sql,
 org.apache.commons.logging,
 org.springframework.petclinic.domain,
 org.springframework.petclinic.repository
Export-Package: org.springframework.petclinic.repository.jpa
```

```
Copy	<p>
		The  <span style="font-family:courier">repository.jpa.eclipselink</span> bundle introduces the EclipseLink dependency and defines that all the application modules should see EclipseLink:
	</p>
	
```

```code
CopyManifest-Version: 1.0
Bundle-ManifestVersion: 2
Bundle-Version: 1.0.0
Bundle-SymbolicName: org.springframework.petclinic.repository.eclipselink
Bundle-Name: PetClinic EclipseLink-based Repository Implementation
Bundle-Vendor: SpringSource Inc.
Import-Library: org.springframework.spring;version="[2.5,2.6)"
Import-Bundle: com.springsource.org.eclipse.persistence;version="1.0.0.m5";import-scope:=application
Import-Package: org.apache.commons.logging,
 org.springframework.petclinic.infrastructure
Export-Package: org.springframework.petclinic.repository.eclipselink
```

```
Copy	<h2 id="summary">
		Summary
	</h2>
	<p>
		Using EclipseLink and JPA in the SpringSource Application Platform requires very little extra effort on your part. The Import Scope feature allows you to keep your non-EclipseLink modules completely isolated from your usage of EclipseLink.
	</p>
</body>
```