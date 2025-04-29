```yaml
title: "When big growth happens to a slow-growth company"
author: Paul Jarvis
tags:
  - news
  - growth
  - GDPR
  - privacy
  - software testing
```

With DPAs in several European countries ruling that [Google Analytics is illegal](https://usefathom.com/blog/illegal-analytics), Fathom Analytics has been experiencing [higher-than-usual growth](https://usefathom.com/podcast/growth-tests).

Because we launched [EU Isolation](https://usefathom.com/features/eu-isolation) last year (after the [Schrems II](https://usefathom.com/features/eu-isolation) ruling), we were in a great place to ensure all our customers were compliant with these new rulings. That’s because we process EU visitor data in the EU, on EU servers. And, since Fathom Analytics is a Canadian-owned company, we have an adequacy ruling under GDPR. Basically: _we cover our customer’s butts when it comes to GDPR_.

Google Analytics isn’t the only big tech company affected by the EU cracking down on digital privacy; Facebook may also end up being banned altogether. Facebook said they’re okay to pull out, and EU regulators have [called their bluff](https://futurism.com/facebook-pull-europe-bluff) (😂).

All in all, it’s a good time _not to be_ a [Big Tech company](https://usefathom.com/blog/degoogle) that puts profits above privacy. It’s a great time to be an [alternative to Big Tech](https://usefathom.com/), as there’s a massive space for innovation and new players to emerge (with different values).

It’s not just the EU who care about digital privacy
---------------------------------------------------

There are businesses and people worldwide who care about digital privacy. Not just because it’s a law (GDPR), but because it’s the right thing to do. This separation of “EU data vs US data” can hurt the innovation within America. It could push US entrepreneurs to incorporate and run their businesses from other countries (like Estonia, which has easy foreign corporation setups) to avoid being caught in GDPR fines and complaints.

With Fathom Analytics, we’re lucky to be a Canadian corporation because we have data adequacy under GDPR between the EU and Canada. And we’re seeing huge growth in our product because we’ve focused on privacy law compliance and being a [privacy-first website analytics](https://usefathom.com/why-fathom-analytics/privacy-focused-web-analytics) company.

When a calm company gets busy
-----------------------------

With all of these legal rulings in the EU, we’ve seen a considerable uptick in growth in new customers starting to pay for [Fathom Analytics](https://usefathom.com/). We’ve had our best weeks ever in terms of signups and conversions.

And while that’s a fantastic “problem” to have, it does require extra work on our part. [Customer support](https://usefathom.com/blog/saas-customer-service) is much busier due to a higher volume of sales emails, and we will have to hire a full-time support person shortly if this spike becomes a trend.

We couldn’t have guessed all of these things would be happening right now, but we could continue work to ensure we’re in the best place possible when they do. Our infrastructure is top-notch and can handle huge increases in traffic we process. Our software has been tested (and tested, even more, see the final section of this article) to ensure our features work well and are well-documented. We’ve also been slowly growing our company (with our new engineering hire starting in Feb!)

An area we need to think more about is how information about how Fathom works is surfaced since we still do get emails about “if a feature exists” when we’ve documented this pretty extensively. So we need to do better at how we surface information quickly and easily to answer questions on our site before they become a support email. We can’t expect everyone to read every word on our website.

[Our MRR growth](https://usefathom.com/podcast/mrr) has tripled lately, but that also doesn’t mean we’re tripling our expenses or ramping up hiring. We still use pessimistically optimistic growth/financial forecasting because that still feels like the most reasonable, risk-averse way to run our business. We never want to outspend our growth rate because growth rates are variable. This is new territory for us, so we’re adapting and learning as things go.

We try the best that we can to put ourselves in the best position possible. While luck is happening for us right now, we’re prepared for being lucky.

Software tests are so time-consuming but so necessary
-----------------------------------------------------

In the beginning, it’s important to get software out the door, so you can start charging for your software (if that’s your business model). So you aren’t always going to write extensive automated software tests from the beginning.

> What’s a software test? It’s automated code to test things like registration forms (to ensure they complete correctly), APIs, units of code, etc. So one example of a test might be to have it automatically open up a browser window, fill in a name and test credit card information, and then see if it processes correctly.

Software tests are helpful because if you modify one area or feature of your software, it can cause other areas of your software to break. These tests can expose bugs before they break your production/live code. So software tests exist to ensure your software works as best as possible, even as you’re adding to it. These automated tests can be run quickly to expose problems before they’re problems.

In addition, writing tests allows you to be explicit about what you’re coding. What does your code do? What should it prevent? What about edge cases? Instead of testing this manually, you write automated tests that can run repeatedly.

Fathom Analytics isn’t new software. We’ve now been around for almost four years, our software runs on over 100,000 websites, and we have customers worldwide: from small businesses to governments, Fortune 100s, and everyone else. **We process over one billion page views each month**.

This is a lot of responsibility. If anything goes wrong with our script or software, it will affect many businesses and their websites. And this is something we take very seriously. And while we had solid test coverage around the essential parts of our software (our pageview collection endpoint), now we’re in a place where we have quite a few features and needed tests to ensure new features work just as well as the rest of our existing software.

But these tests take a lot of time to set up correctly. Meaning we had to pause building out and launching features until our test coverage was complete. We wanted to be confident about launching features, so we had to take a break and write these tests first. So it’s an investment in moving more quickly later by moving slowly right now.

We’ve spent the last few months writing these automated tests, and it’s been the first task of our new engineering hire as well. And we’re very close to having test coverage across our entire codebase!

Once these tests are written, we’ll be able to move faster, even as a small team, and release the features we have planned for our customers in 2022.
