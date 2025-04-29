```yaml
title: How to use UTM Parameters
author: Paul Jarvis
tags:
  - UTM
  - marketing
  - analytics
  - tracking
  - Fathom
```

How Fathom uses UTM parameters to track campaigns
-------------------------------------------------

If you’ve done online marketing before (or used Fathom’s dashboard for any length of time), you’ve probably seen or heard the term “UTM Parameter” before. They look something like this when used in a URL:

https://usefathom.com/features?utm_source=twitter&utm_campaign=jacks+hype+tweets&utm_medium=organic+social&utm_term=analytics&utm_content=dec21+2021

What is a UTM parameter?
------------------------

UTM stands for “Urchin Tracking Module,” which initially started within Google Analytics (who acquired a product called Urchin decades ago).

Now they are used as an industry standard and accepted in far more places than just Google Analytics. And, luckily, no data is sent to Google if you use them on sites that don’t have Google Analytics or Google tag tracking on them.

A UTM parameter is the text included in the URL to better understand where the traffic is coming from, and therefore, which content you’re sharing is the most relevant or best at converting to sales or leads.

This all may sound a little technical, but it’s quite simple and easy to create and track UTM links without having to be a nerd, invade privacy or write complicated code. You can even use [our UTM builder](https://usefathom.com/utm-builder) to create these links.

Let’s look at the URL from above again and break it down:

https://usefathom.com/features?utm_source=twitter&utm_campaign=jacks+hype+tweets&utm_medium=organic+social&utm_term=analytics&utm_content=dec21+2021

The UTM parameters are all the content that comes after the ?. Let’s look at that URL in a broken down, more understandable format:

*   `https://usefathom.com/features` - this is the base URL, as in, your website (hostname) and page (pathname). It has to include the protocol , too, the https:// part, because that’s just how the internet works.
*   `?` - the question mark here is what separates the base URL from the UTM parameters.
*   `&` - the ampersand is used to separate UTM parameters.
*   `utm_source=twitter` - this is where the traffic is coming from, in this case, Twitter.
*   `utm_campaign=jacks+hype+tweets` - this is the name of the campaign, specific to this effort. In this case, it’s Jack (our [Chief Hype Officer](https://usefathom.com/podcast/hype)), hyping up Fathom.
*   `utm_medium=organic+social` - this is the type of marketing, and since it was just a normal tweet, not a paid campaign, we classed it as “organic”.
*   `utm_term=analytics` - this is an optional parameter, and it’s used to classify paid keywords. Typically if it’s an organic campaign, this parameter isn’t needed.
*   `utm_content=dec21+2021` - this is used to help separate similar links from the same place. In this case, we used to separate a Tweet on Dec 21, 2021 from another tweet on a different day.

Types of UTM parameters
-----------------------

As you can see from above, there are five types of UTM parameters, three are required, and two are optional.

| Parameter       | Description                                   | Example                  |
| --------------- | --------------------------------------------- | ------------------------ |
| `utm_source`    | The site or platform the traffic is coming from. | twitter, facebook, mailchimp |
| `utm_campaign`  | The effort or campaign that’s driving the traffic. | spring+sale, free+trial  |
| `utm_medium`    | The type of marketing channel driving the traffic. | cpc, social, email       |
| `utm_term`      | The paid keywords used.                        | gdpr, analytics, privacy+focused |
| `utm_content`   | The specific content that was clicked.        | text+ad, footer+link     |

Why use UTM parameters?
-----------------------

You can use UTM parameters if you are sending traffic to your website from social media accounts, paid digital campaigns, newsletters, and so much more. You’ll then see these parameters, broken down by parameter, on your Fathom dashboard (if you’re a customer), and you filter by each.

#### There are really four key reasons to use UTM parameters when linking to your website from other places on the internet:

1.  They help you track the value of social media campaigns and measure return on investment (to see how well each campaign converts into signups, trials, or actual sales).
2.  They provide more precise data about traffic sources (i.e. on platforms that scrub the specific referring URL, you can use UTMs to measure links you post).
3.  They allow you to test out posting links head-to-head to determine which content worked best to get a click (as in, you post two different tweets with the same URL - if you use a different UTM for each, you can see which wording led to the most clicks).
4.  UTMs don’t (typically) include anything that violates privacy (i.e. Personal Data from a user). They more relate to aggregated data from campaigns. So if someone clicks a link with a UTM, it won’t expose their entire browsing history or anything like that.

To dive a bit further into the second point, using a UTM helps you collect a bit of data from “[dark social](https://blog.hootsuite.com/dark-social/)” (i.e. those platforms that scrub specific URLs) like Facebook, Instagram, WhatsApp, WeChat, or even email.

If you think about it, email can be a huge part of your marketing strategy, but without a UTM present, it’d be hard (or impossible) for you to know which emails or newsletters are driving traffic to your site.

#### Here are a few more reasons to consider using UTM parameters when sharing links online and in emails:

1.  Use UTM parameters for testing your ideas. A/B testing lets you hypothesize and then hopefully confirm your theory worked best for your audience. For example, you could use UTMs to test 2 different words for a sale you’ve got on your product, and then look at which leads to more clicks. Or you could use different UTMs to drive traffic to different landing pages on your site to see which leads to more conversions.
2.  You could use UTM parameters to track influencer marketing or affiliate marketing you’re doing. Just use a different UTM parameter value for each influencer or each affiliate you’ve got.
3.  Use UTM parameters to help refine your social media plans to see which efforts net the best results.

How to create UTM parameters
----------------------------

You can simply write out the UTM parameters you want to use and then paste them in the place you want to share. You’d start with something like this:

https://www.yoursite.com/?utm_source=[SOURCE]&utm_medium=[MEDIUM]&utm_campaign=[CAMPAIGN]&utm_term=[TERM]&utm_content=[CONTENT]

And then, simply replace the words in square brackets with your actual values.

You can also use a UTM builder, [like this one we created](https://usefathom.com/utm-builder). These can help ensure your UTMs are valid.

A few guidelines on using UTM codes/UTM tracking
------------------------------------------------

UTMs can be any words you want, but it’s important to pay attention to a few key points when creating them:

1.  Don’t use UTMs on internal links. They should be used for links coming from other sources only.
2.  Don’t use punctuation, special characters or emojis.
3.  Stick to lowercase (as UTMs can be case sensitive on some platforms, and that could lead to multiple results for the same thing, ex: “TWITTER” and “twitter” would track as two different UTM parameter values). In Fathom, UTMs are not case-sensitive (we think makes more sense).
4.  Use underscores or plus signs instead of spaces, otherwise you can easily mess up URLs and perhaps load a 404 instead of your web page.
5.  Keep things simple and memorable. After all, you have to remember what your UTM parameter value is related to, even months later. You can always create a spreadsheet to keep track of UTMs on your end, especially since Fathom lets you store your analytics data forever.
6.  Watch out for using a UTM parameter when you don’t mean to, or using the wrong UTM parameter. Always double-check the UTM parameters are values that are the right ones for the link you are using.

Why use UTM parameters with Fathom
----------------------------------

Fathom lets you easily view and then filter by UTM parameters. So you can see all the UTMs you’ve used for your campaigns right on your site’s dashboard, and then filter each one (or multiple UTMs at the same time) to further drill into your data and see your campaigns progress.

You can even use UTMs to filter [events](https://usefathom.com/docs/events/overview). So you can see which UTMs lead to which conversions (for things like newsletter signups, product purchases, trials, etc).

If you’re not yet a customer, Fathom is a privacy-focused analytics company, so why not [start a 30-day free trial](https://app.usefathom.com/register)? Then you can start seeing how useful tracking UTMs can be for your business or website.
