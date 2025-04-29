```yaml
title: "What is Google FLoC (it’s bad for your privacy)"
author: Paul Jarvis
tags:
  - news
  - privacy
  - advertising
  - Google
  - FLoC
  - digital privacy
```

On March 30, 2021, Google launched trials of something called “Federated Learning of Cohorts (FLoC)” in several countries via their Chrome browser in version 89 and above. They did so without asking Chrome users first and turned it on by default.

[In their press release](https://blog.google/products/ads-commerce/2021-01-privacy-sandbox/), they called it “a privacy-first future of web advertising.” And, here are [the nerdy details](https://github.com/WICG/floc).

This article will explain why it’s the opposite of “privacy-first” and why a billion dollar advertising company has no interest in collecting _less_ data about all of us.

What is Google FLoC?
--------------------

To put it simply: **FLoC is a method to collect, summarize and sell your recent internet browsing activity**. So, for FLoC to be helpful (to Google), it has to reveal information about our behaviour. However, it’s not done through third-party tracking scripts like Google Ads or Google Analytics; it’s done directly through their Chrome browser (and other browsers that may adopt FLoC too).

How does FLoC work?
-------------------

The nitty-gritty of how FLoc works is this: Chrome uses algorithms to create “cohorts”, which are groups of people who share similar interests and qualities (based on browsing habits). It does this by watching your browsing habits, and then determining which cohort you should belong to. Even though supposedly your local browsing data is not shared (as just cohort information is transmitted), that data can still be combined with other data exposed in the browser to create a unique fingerprint of each person (just like the example above illustrates).

If that sounds a bit dense/technical, the next section gives a specific example of FLoC in action to help explain it better.

A second problem arises from FLoC as well: its technology will share NEW personal data with existing trackers who already identify users. The project’s Github page states, “Sites that know a person’s PII (e.g., when people sign in using their email address) could record and reveal their cohort. This means that information about an individual's interests may eventually become public.”

If this sounds horrible/scary, that’s because it is.

It means any site you visit would get a decent picture of what kind of person you are on first contact, without having to follow you and track your future browsing. FLoC exists because a lot of us care about digital privacy. Wait, what? Let me explain: there’s been a massive surge in people blocking malicious scripts that follow us around the internet and target us with ads based on personal information being collected about it. It’s done through ad-blockers and even real “privacy-first browsers” that block malicious scripts by default.

> (This is why [Fathom Analytics](https://usefathom.com/) exists in the first place—we wanted to offer website sites a way to learn about their site without learning personal details about their visitors.)

As more citizens of the web have become aware of how they are being tracked and identified by Google and similar companies, they’ve started to do things to block Big Tech from spying on them (by switching to Fathom, by using ad-blockers, switching to Firefox, etc.).

This privacy awareness is not good for targeted advertisers or Google (one of the biggest advertising companies ever). So, they went a step deeper, right into their browser, Google Chrome. And then, tried to label it as something beneficial to privacy.

A hypothetical example of how FLoC works
----------------------------------------

With FLoC, Google Chrome watches the websites you browse and its local algorithm puts you into a “cohort”. The best way to explain this is with a short story about two people, so you can clearly see where the problems are:

**Jon**

1.  Visits https://betterhelp.com for help with his depression
2.  Visits https://groupon.com to ease his mental state with shopping
3.  Google Chrome browser assigns Jon to cohort `12345`

**Amanda**

1.  Visits https://betterhelp.com for help with her depression
2.  Visits https://groupon.com to soothe her mental state with shopping
3.  Google Chrome browser assigns Lucy to cohort `12345`

So up to this point, Jon and Amanda have both done similar things, which has led to them being in the same cohort. Groupon has seen two users landing on their website in cohort `12345`. No problems yet.

The next day, Jon visits https://groupon.com/offers/therapy because he desperately needs counselling and wants to speak to a therapist. He books an appointment spends the cash, and Groupon can see that someone from cohort `12345` booked a therapy appointment. Remember, Google Chrome sends the website visitors’ cohort ID to the website they’re browsing.

The day after that, Lucy visits the site using Google Chrome, which broadcasts her cohort ID (`12345`, the same one Jon is assigned to), and Groupon might say “Oh, Jon from cohort `12345` booked a therapy appointment through us yesterday. This user is in the same cohort as him, so we should serve an advert to THIS USER from cohort `12345` and suggest they book therapy”.

Do you see the problem here? Sites can track actions from a user in a certain cohort, and then target another user of the same cohort. It’s freaky. Imagine being in Amanda’s position, and being hit with a targeted advert by Groupon. (Also, we’re not trying to hate on Groupon, we just used them as an example.)

But now let’s imagine that Groupon knows that users in cohort `12345` are suffering from depression. It might have a table like this:

| Cohort | Offer bought |
| --- | --- |
| 12345 | Mental health therapy |

If Lucy (a new person) purchased a Groupon offer for “Addiction Rehab”, the table might change to the following:

| Cohort | Offer bought |
| --- | --- |
| 12345 | Mental health therapy & Addiction Rehab |

So when 100 other users, who are also in cohort `12345`, visit Groupon, they can throw all kinds of advertisements about mental health therapy & addiction at them. This is dangerous because it allows a malicious actor to reverse engineer your interests/issues from your cohort.

And can you imagine if this data leaked?

Suddenly every website owner on the internet would be able to see which of their website visitors suffered from depression. Employers could send links to their employees, encourage them to log in, and then store their cohort ID. So now employers would know which of their employees are suffering from mental health conditions, and start discriminating against them. The same concepts apply to politics and everything else.

Sure, this is a cynical look at things, but the point we’re making is that it’s not privacy-first. There are still so many risks to privacy associated with this methodology.

Why Google FLoC is terrible for your digital privacy
----------------------------------------------------

With FLoC enabled, Chrome creates “cohorts” that group similar users with similar browser habits together, as we’ve explained above. These cohorts grow in size and relevance as more data is fed into them, based on sites people visit, ads they view, behavioural patterns, how often they browse and more.

So, the more FLoC watches you, the more it learns about you. And all of this is done in a way that makes our current quiver of privacy tools not work the way they should (as they’re meant to block scripts, not entire browsers).

The worst part is that millions of Chrome users were signed up for this tracking experiment without agreeing to it or opting into it. So, if you use Chrome (which 65% of people do currently), your cohort data will be continuously transmitted to Google, which then shares it with advertisers.

Every user of Chrome (past version 89) is currently having their browsing habits watched, packaged up, and then shared with countless advertisers for profit.

If Google truly cared about digital privacy, as it’s said it does, they wouldn’t be doubling down on a business model that’s based on tracking our behaviours and habits for profit. Their business model, if unchanged, is a violation of what being “privacy-first” means.

Mozilla did [an analysis of FLoC](https://blog.mozilla.org/en/mozilla/privacy-analysis-of-floc/) and found many privacy issues that need to be addressed.

FLoC is only being tested in countries where GDPR is not in place
-----------------------------------------------------------------

Google and their FLoC technology are scared of the EU.

This is because FLoC probably should require consent where GDPR exists as it’s collecting personal data. So it’s no surprise that FLoC is only being tested in countries without strong privacy laws like GDPR.

[According to the EFF](https://www.eff.org/deeplinks/2021/03/googles-floc-terrible-idea), FLoC makes it easier to fingerprint and track individuals:

> If a tracker starts with your FLoC cohort, it only has to distinguish your browser from a few thousand others (rather than a few hundred million).

The problem here becomes worse, as EFF explains, if a website collects any personal information from a person (like email address), it could record and reveal their cohort. This means FLoC could be used to tie personal interests and browsing behaviours to individuals. So you can see why they aren’t using FLoC in countries with GDPR, as it seems like a massive violation of the privacy law.

While the basis and goals of FLoC are supposed to prevent the threat of individualized profiling, it can easily allow open up holes to let advertisers reach some people while excluding others. And, over the years, targeted advertising has been used for [discrimination](https://www.reuters.com/article/us-facebook-advertisers/u-s-charges-facebook-with-racial-discrimination-in-targeted-housing-ads-idUSKCN1R91E8/), [harm](http://stoponlinevaw.com/wp-content/uploads/2018/10/Black-ID-Target-by-Russia-Report-SOVAW.pdf) and [exploitation](https://www.americanbanker.com/news/payday-lenders-are-finding-ways-around-googles-ad-ban). We believe that [targeted advertising should be banned](https://usefathom.com/blog/targeted-ads).

How to opt-out of FLoC as a consumer
------------------------------------

As a user of the internet, luckily, it’s easy to opt-out of FLoC: stop using Google Chrome. It’s bad for [so many other reasons too](https://chromeisbad.com/). Or, use a Chromium-based browser with FLoC disabled by default.

Google has said they will introduce an opt-out option for FLoC, but it’s not ready yet (so they launched a new tracking technology with no way to opt-out of it).

You can also test if you are being FLoCed using [EFF’s tool](https://amifloced.org/).

How to opt-out of FLoC as a website owner
-----------------------------------------

As a website owner or developer, you can tell Google that your site doesn’t want to be included in the list of sites for cohort calculation. And just like FLoC in Chrome, the default is your site allows Google to send cohort data back to themselves from your site.

Luckily this can be turned off by setting a permissions policy in your HTTP response header:

```
Permissions-Policy: interest-cohort=()
```

Or, if you can edit your .htaccess file, add:

```
<IfModule mod_headers.c>  Header always set Permissions-Policy: interest-cohort=()</IfModule>
```

On NGINX servers, you can update your config file:

```
server {    location / {      add_header Permissions-Policy interest-cohort=();    ...    }}
```

And then test your site using [a tool like this one](https://securityheaders.com/).

There is also [a new WordPress plugin that disables FLoC](https://wordpress.org/plugins/disable-floc/) (so you don’t need to fiddle with your server configuration).

Cookies are dead, long live cookie-like tracking!
-------------------------------------------------

It doesn’t feel right that Google owns much of the online advertising world and also the browser with the largest market share and combines the two to maximize its profits. And they’re doing this without asking anyone.

This is why [The Competition and Markets Authority in the UK is now investigating Google and FLoC](https://www.gov.uk/government/news/cma-to-investigate-google-s-privacy-sandbox-browser-changes) because advertising spending could become very concentrated in Google’s ecosystem.

With third-party cookies being less and less effective (since we are mostly blocking them), FLoC is Google’s replacement to keep their advertising profits intact.

With FLoC, Google hasn’t changed tracking and targeted ads for the better; they’ve just made them different and harder to avoid.

For decades Google and similar companies used cookies to generate multi-billions of dollars off our personal data. Then we collectively wised up. While FLoC may be one of their most ambitious projects, it also has the potential to be the most harmful too (turned on by default in the world’s most popular browser).

FLoC and a future that enables it to exist, embedded right in our browsers, is not a future we want, nor is it one that anyone who cares about privacy deserves. Stop using Chrome and ensure your website blocks it too.

Sadly, this isn't the only problem Google faces. Recently, [Google Analytics was found to be in violation of GDPR](https://usefathom.com/blog/illegal-analytics) by the [Austrian DPA](https://noyb.eu/en/austrian-dsb-eu-us-data-transfers-google-analytics-illegal).

### You might also enjoy reading:

*   [Your website analytics are breaking the law](https://usefathom.com/blog/illegal-analytics)
*   [Is Big Tech actually a big problem?](https://usefathom.com/blog/big-tech-big-problems)
*   [Let’s make surveillance-based advertising illegal](https://usefathom.com/blog/ban-surveillance-based-ads)
