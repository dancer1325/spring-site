---
title: Replies to Nonsense about Open Source
source: https://spring.io/blog/2007/09/20/replies-to-nonsense-about-open-source
scraped: 2026-02-24T09:24:55.769Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rod Johnson |  September 20, 2007 | 0 Comments
---

# Replies to Nonsense about Open Source

_Engineering | Rod Johnson |  September 20, 2007 | 0 Comments_

My [blog](http://blog.interface21.com/main/2007/06/11/nonsense-about-open-source/) a couple of months ago about models of open source businesses seems to have struck a chord. I've had many positive responses, and it prompted an interview request from a site called "How Software is Built". My interview is [here](http://howsoftwareisbuilt.com/2007/09/10/interview-with-rod-johnson-ceo-interface21/).

Finally someone from OpenLogic has posted an interesting reply. Bryan Noll left some comments in a reply to my blog that merit a proper response.

> First and foremost, I think your assertion that it is not healthy for a project or open source in general when people who have no real investment in a particular project offer support for it is an interesting oneâ¦ one I've not heard before. I think there's enough validity to it to make a company like ours consider it and genuinely examine our responsibility to the open source projects we support. The result of this examination, in my mind, would be a demonstrable policy OpenLogic would have in order to mitigate the potential concerns you're raising. I'm sure I don't know what exactly that would be, so allow me to be vague at this point. This dovetails nicely though into some of the issues I have with what you're saying.

I think it would be pretty simple to find such a "demonstrable policy". OpenLogic needs to understand that the opening comment in [Stormy's post](http://www.openlogic.com/blogs/2007/05/whats-your-time-worth/) that "Developers that work on open source software typically have day jobs that pay pretty well...so they work on open source software for free and write code during the day for big bucks" is largely wrong, understand where the open source software they hope to profit from comes from, partner appropriately, and set a price point that allows for genuine support. An alternative would be to stop claiming to provide enterprise support, and be clear that what is being offered is a kind of on-call development assistance, with no guarantee of being able to resolve critical issues. Which takes me back to why I felt strongly enough about Stormy's post to deconstruct it.

I see the aggregation model as a supermarket style business. When I shop at at supermarket, I expect that they will take a (small) cut from everything I buy, in return to dealing with many suppliers, bringing all the items I want to all to one place for me and providing a car park and shopping trolleys. I expect that most of the economic value will go back to the companies that produced the products.

OpenLogic and a couple of their competitors have a valid opportunity for a supermarket-style business. It's just that they seem to hope that open source, as a new market, allows the notion of a supermarket that keeps virtually all the money and doesn't reimburse suppliers. That's a destructive model that can't survive in the long term.

There are more sustainable routes to aggregation. A number of global SIs offer support contracts to customers that include aggregation services and, in order to provide the quality of support enterprise customers need, subcontract to various open source companies. In other words, they don't aim to keep all the money for the goods in the supermarket, and they price in the provision of *real* support. OpenLogic should do the same. Perhaps the reason they do not is that acceptance that an aggregator is really a broker leaves them in an awkward situation between large SIs and specialist companies that create open source IP. Nevertheless, there is a sustainable business opportunity there.

Brian continues:

> You can't have your cake and eat it too. You say:
> 
> > My "support" may be coming from non-committers. So OpenLogic can't guarantee to resolve issues strategically. Dependable support involves the ability to commit to the main treeâas well as, in some cases, branches maintained for a particular revision of customer.
> 
> Interesting to note that in the case of Spring, Interface 21 would be the one and only entity capable of doing what you're proposing. (Please correct me if I'm wrong here.) Seems like a sweet deal for Interface 21 there.

Yes, that's right. It may seem strange to you, but it's normal for individuals and companies to want a return on investing millions of dollars, passion, blood sweat and tears in something. Interface21 sustains and develops Spring and we do a good job. I think it's perfectly reasonable to expect that we can leverage this investment into an advantage in the support market. Our Fortune 500 support customers agree.

So it seems that you're arguing that it's somehow unfair that OpenLogic doesn't get to make money out of code and communities that the hard work and investment of others has created. Is it unfair that I can't make money out of supporting, say PhP, WebLogic or Oracle? Is dominating the market for WebLogic Server maintenance revenue an unreasonably "sweet deal" for BEA?

This flawed argument around "fairness" ignores the practical question of whether OpenLogic can "resolve issues strategically". Which it can't, for the reasons I described.

> If you open source your stuff, and it's a great product that is a big hit like yours is, do you really expect that no one else in the market will attempt to engage in business surrounding it? Surely notâ¦ for another example of this, just take the books written about the Spring Framework not written by folks working for Interface 21, or the countless number of developers out there who are highly marketable because they've learned the framework you open-sourced. Are they to feel guilty for the health of the project as well? Interface 21 is allowed to reap such great benefits because the product is A) great, but also because the product is B) being delivered to the marketplace en masse because you've open-source it and made it free. While not being exactly the same, this argument has that “nobody else should be able to make and sell cars because I invented them” feel to it.

Other companies and individuals will inevitably engage in business around the product, and that's great. However it's fair to examine any claims they make make.

Let's look at the facts: the Spring team at Interface21 has always been supportive about books written by folk outside, like Craig Walls. We encourage people to write about Spring. Folk like Craig have the requisite experience to write such books, and we wish them great success from that. (Btw Craig has a second edition of [Spring in Action](http://www.manning.com/walls3/) coming out. Buy it and I promise I won't be mad at you.)

As for developers who are more marketable because they have learned Spring, this is great. I feel proud to have founded a project that has helped create a market for my fellow developers (as well as make their jobs more enjoyable); I feel happy that the investment my company continues to put into our products continues to grow this market. There are now *thousands* of job listings every day specifying Spring as a required skill and they're rapidly [trending upwards](http://www.indeed.com/jobtrends?q=spring+and+java&l=); best wishes to applicants applying to them as they answer the questions on Spring.

Authors and thousands of these developers contribute to the success of the project and community through their evangelism. That's an important way of contributing. OpenLogic does not; it merely aims to make money from projects that others have built, evangelized and conveniently maintain and enhance. Now *that's* a "sweat deal".

My post concerned the provision of enterprise level support. That's a different matter. OpenLogic isn't merely claiming that it can provide knowledge about Spring in this fashion, or help deliver projects on Spring; it is claiming that it can provide the level of support that the enterprise supports for many projects. I laid out detailed arguments as to why it cannot.

Note that my blog was addressing a more general question about the quality of enterprise support for open source. While I'm now addressing your issues regarding Spring directly, the flaws in this model apply to many projects.

The first sentence of your paragraph deserves another reply:

> If you open source your stuff, and it's a great product that is a big hit like yours is, do you really expect that no one else in the market will attempt to engage in business surrounding it?

Now I wonder why it's a great product? Why is it a big hit? Did it happen by accident or was it the result of large and sustained investment?

> Secondly, while I again confess that I think you make good points about potential project health ramifications, another fact driving aggregated support of the market remains. What enterprises have to do today to obtain support for the software they're developing and deploying into production is a painstaking processâ¦ the idea of managing support contracts for x number of projects across y number of stove-piped divisions seems like an inefficient nightmare to me. Aggregating these services makes sense from the enterprise's standpoint, however shortsighted you may claim it is. If an opportunity to do business in a market exists, you can't fault someone for swooping in and taking advantage of that opportunity.

I didn't argue that aggregation has no merit. Just that an aggregation of low-quality services isn't worth much. A chain is only as strong as its weakest link.

The idea of "managing support contracts for x number of projects across y number of stove-piped divisions" brings up another issue. Aggregators need to play up the complexity of the open source ecosystem. In reality, a smallish number of products are more equal than others. Get true enterprise grade support for the elephants; then worry about the dogs and cats. Customers can't evade responsibility for managing their open source usage by imagining that a "support" contract with an aggregator means that they can engage in a free-for-all. The issue isn't that much different with commercial software, although the fact that open source software is free to obtain creates a danger this case.

Let me quote from the conclusion to my original post:

> Perhaps there are areas in which this model makes sense. There are products (largely outside the enterprise space, or in simpler technologies) where volunteers do most of the work. But it makes no sense at all in enterprise Java. The problem is not the notion of aggregationâwhich can make sense if a company possesses the resources to invest and sustain projects, or partners with others that doâbut the idea that an industry can be sustained in disregard of the laws of economics, and that motivating people with games consoles rather than security of income will provide a basis for enterprise quality support.
> 
> It's proven that the most scalable revenue around open source software (disregarding commercial add-ons) is in support. OpenLogic's model divorces that entirely from the creation of the software in the first place. That's not the future of enterprise open source â unless open source has no future.

I stand by my comments.