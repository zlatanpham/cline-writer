```yaml
title: "Google FLoC is dead; long live Google Topics"
author: "Paul Jarvis"
tags:
  - news
  - digital privacy
  - advertising
  - Google Topics
  - FLoC
```

Amidst a ton of backlash from people who care about digital privacy, [Google has announced it’s killing off FLoC](https://blog.google/products/chrome/get-know-new-topics-api-privacy-sandbox/) and moving to something they’re calling Topics instead.

[We wrote about why FLOC was bad for privacy](https://usefathom.com/blog/google-floc) when Google laughably promoted it as “privacy-friendly.”

As always, the TL;DR here is: **you shouldn’t use “free” software owned by an advertising company**.

Whatever way their PR engine spins it, you should be using a different browser if your browser spies on what websites you visit and sells that data to advertisers. Period. The end. It’s 2022, and you can pretty quickly [DeGoogle your business](https://usefathom.com/blog/degoogle).

But let’s look at what this means for all the folks who continue to use Chrome.

What are Google Topics?
-----------------------

According to Google, “Topics” is a new system for interest-based advertising. The way it works is that it surveils your browsing habits and activities and then assigns you topics to be used by their advertising partners. You can read more about it on their [API GitHub page](https://github.com/jkarlin/topics).

[Google had created 350 topics](https://github.com/jkarlin/topics/blob/main/taxonomy_v1.md) to start and won’t include sensitive categories like race or gender. (Let’s just hope their definition of “sensitive” aligns with everyone who uses their software.)

How do Google Topics work?
--------------------------

With Topics, your browser will keep track of topics related to sites you visit (i.e. your browser watches and collects data on your internet habits). For example, if you visit a lot of sites about the Premier League, the topic of “/Sports/Soccer” will be assigned to your browser.

Your topics will then help determine which advertisements you see while browsing the internet. Sites with ads on them won’t need to know who you are to know that you should see ads about “/Sports/Soccer” because Topics are stored locally on your device and then accessed by the site with the ads on them.

The specific topics stored about you will be stored for three weeks. And it’s worth noting that topics are just one potential signal to decide on the ad to be shown to any given website visitor. So it becomes yet another signal to gain data about individuals.

![Image 1: How Google Topics work](https://usefathom.com/assets/src/blog/topics.png)

In Chrome, as we mentioned, you will apparently be able to control which topics are shared with the sites that serve ads. They’ve also said you can even turn the feature off (this functionality is not built yet). There’s also a limit of three topics available to any given website, limiting the amount of data shared.

How “Topics” differ from their previous method of using cookies to track and store personal information is that the sites you visit aren’t shared across the web any longer. Instead, Topics are shared directly with the site serving the ad.

Why is Google trying out FLoC and Topics?
-----------------------------------------

Based on regulatory pressure, they’re [running out of time](https://www.theverge.com/2021/6/24/22547339/google-chrome-cookiepocalypse-delayed-2023) to phase out third-party cookies (Google has now pushed back phasing out third-party cookies until mid-2023).

Since Google is an advertising company, they surely want to delay this as long as possible as their revenue is tied to ads (and those ads are linked to collecting data from us to serve us relevant ads).

It’s important to note that other browsers like Safari and Firefox have been blocking third-party cookies for years.

FLoC and now Topics feel like a workaround to still collect data about us but avoid the technology that blocked cookies and the challenges from [antitrust investigations](https://www.europarl.europa.eu/doceo/document/E-9-2021-000274-ASW_EN.pdf) and [regulatory pressure from the UK’s CMA](https://www.gov.uk/government/news/cma-to-investigate-google-s-privacy-sandbox-browser-changes).

Are Google Topics good or bad for your digital privacy?
-------------------------------------------------------

The fact that these are ads are now contextual is a step in the right direction. And that a user can turn off or adjust settings on what their browser tracks about them is also a step in the right direction. Topics, as it stands now, is an improvement from FLoC.

The problem still is that data is being passed from a “free” browser software for advertising. “Topics” are still used to spy on users and then serve them ads. In comparison, other browsers don’t do this (like Safari, Firefox or Brave).

Another problem is that Topics will undoubtedly be turned on by default (this is just a guess, but a pretty good one). So the onus is on the user to turn it off or adjust their settings, and most people just use the default settings on browsers.

This is still surveillance, and it’s a sneaky method of following us around the internet and keeping note of what sites we visit. That data (even if it doesn’t hit Google’s servers) is still then shared with third parties to serve us ads. Hopefully, those ads are innocuous and not used to inform our opinions about democracy and/or politics.

**Our browsing activity should be our own private business**, and this doesn’t line up with Google’s need to build tracking tech for advertisers into their browser.

As this is brand new, we haven’t yet had time to run tests on Topics (like we did for FLoC) to see if there are further privacy violations. But as noted at the top of this article, why use a browser that tracks you at all (using cookies, FLoC, Topics or whatever new thing they come out with) when you can use a browser that is just a browser.

### You might also enjoy reading:

*   [What is Google FLoC, and why it’s bad for your digital privacy](https://usefathom.com/blog/google-floc)
*   [Your website analytics are breaking the law](https://usefathom.com/blog/illegal-analytics)
*   [Let’s make surveillance-based advertising illegal](https://usefathom.com/blog/ban-surveillance-based-ads)
