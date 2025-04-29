```yaml
title: How to Enable and Use Link Tracking Protection in iOS 17
author: Paul Jarvis
tags:
  - iOS 17
  - Link Tracking Protection
  - Privacy
  - Marketing
  - Analytics
  - Apple
```

iOS 17 and link tracking: what marketers need to know
-----------------------------------------------------

A new feature in iOS 17 is something called Link Tracking Protection. It’s a significant privacy update that automatically activates when iOS 17 is installed and affects links shared within Messages, Mail and Safari (private browsing).

Link Tracking Protection (LTP) removes “tracking parameters” from URLs shared in the above software. It does this because Apple feels that some tracking parameters aren’t good for digital privacy.

Let’s dive into what this means and what types of links are affected.

What is Link Tracking Protection(LTP)?
--------------------------------------

LTP will remove some tracking information added to the end of some URLs. Here’s what Apple’s press release says about this feature:

> “Some websites add extra information to their URLs in order to track users across other websites. Now this information will be removed from the links users share in Messages and Mail, and the links will still work as expected. This information will also be removed from links in Safari Private Browsing.”

What’s a tracking parameter? It’s just extra information at the end of a URL. In Fathom Analytics, for example, we use UTMs to help our customers learn more about clicks coming into their websites from places like social media sites (dark social), email/newsletters, etc. And we offer this because UTMs don’t contain personal information.

Because some places on the web and in email remove things like “referrer,” adding something like a UTM value can help attribute where folks are coming from when they visit your site.

Other software can add things like advertisement data to help track ad targeting and personalization (i.e. things that are less privacy-focused).

Which tracking parameters are being removed?
--------------------------------------------

Link Tracking Protection(LTP) isn’t targetting and removing ALL parameters, just some. I.e. the ones they deem harmful to user privacy.

[According to one source](https://www.wojtek.ch/advertising/safari-17-beta-utm-tracking-parameters-problem/), the following tracking parameters are being removed from URLs when clicked in Mail, Messages and private Safari browsing:

*   `gclid` - Google AdWords // Analytics
*   `dclid` - Google Display Network
*   `foclid` - Facebook Advertising
*   `twelkd` - Twitter Advertising
*   `msclkid` - Microsoft Advertising
*   `mc_eid` - Mailchimp
*   `igshid` - Instagram

For example, here’s how iOS 17 LTP will change URLs to remove tracking parameters:

Non-iOS 17 link:

```
https://website.com/?utm_campaign=newsletter_name&GCLID=example
```

If you’re using iOS 17 and click on a link in Mail, Messages or private Safari:

```
https://website.com/?utm_campaign=newsletter_name
```

So, as you can see, the GCLID would be stripped and removed, so your website would no longer get that information.

Which tracking parameters are safe from Apple LTP?
--------------------------------------------------

Luckily (especially for Fathom Analytics customers), UTMs are not being affected, nor are they being removed. [So you can continue building](https://usefathom.com/utm-builder), using, and seeing UTMs on your dashboard.

> “UTMs will remain intact, so advertisers will still be able to track traffic source.” Tori Shulman  
> Senior manager of performance media, Klaviyo

So, even if people click links in Mail, Message and private Safari, the UTMs will stay intact and be sent to your Fathom Analytics dashboard.

According to [a source](https://www.linkedin.com/in/jonathan-cairo/) who tested this, Apple uses a list of tracking query parameters sourced from [Privacy Tests](https://privacytests.org/).org. So, if the parameter is not on that list, it should be fine. That means, of course, UTMs are safe, but also custom parameters.

Does this mean click data won’t be available for email marketers?
-----------------------------------------------------------------

Some ESPs (newsletter software companies) handle click tracking by routing URLs and their parameters to a URL on their software and then redirecting it to the final destination (your site). When that happens, depending on your ESP, it could strip out some parameters.

If you use newsletters or email marketing, this is something to ask your ESP about and test yourself before sending your next campaign.

What Apple’s LTP means in general
---------------------------------

Over the last few years, Apple has been pretty public about “protecting the digital privacy” of its customers. LTP and other privacy features target third-party cookies and advertising companies (or at least, they target advertising companies not owned by Apple).

This will certainly and heavily impact businesses that rely on advertising data to run campaigns, as parameters like `fbclid` and `gclid` (Facebook and Google ad trackers) will be blocked on many devices now. This will result in decreased attribution, as the parameters required to track attribution to campaigns will be removed from some devices.

What can be done about this? Well, it is a win for privacy, as it means things like retargeting and ad personalizations will have a more challenging time following you around the internet. So, companies should re-prioritize more privacy-focused marketing endeavours instead of focusing on short-term workarounds for something like this.

As the world moves further from a blind reliance on Big Tech and cares more about digital privacy, companies could focus on long-term marketing solutions that don’t rely on user identification, retargeting and other means to follow people around the internet and mine their data for advertising.
