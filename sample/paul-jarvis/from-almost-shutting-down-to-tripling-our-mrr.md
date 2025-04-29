```yaml
title: From almost shutting down to tripling our MRR
author: Paul Jarvis
tags:
  - news
  - Laravel Tips
  - SaaS
  - web analytics
  - privacy
  - startup
```

This isn’t a story of facing adversity and triumphing over it. The truth is, this story is still being told and we’re just getting warmed up.

But let’s rewind a little bit… on April 16, 2018, I had an idea and tweeted:

> What if website analytics software didn't take your users data to line their pockets from advertising? What is website analytics software was simple and trustworthy? Here's my new idea (and if this gets enough traction, I'll build it) https://usefathom.com/

![Image 1: Fathom dashboard idea](https://usefathom.com/assets/src/old/fathom-v0.jpg) Funny how the initial mockup isn't _that_ far off from our current version in terms of its goal.

I did about 3 total hours of work on it, I registered a domain, I put up a static HTML/CSS landing page, added a Mailchimp signup form, and spent the remaining 2.5hrs mocking up what the dashboard would look like. This was quite a bit before most other analytics platforms cared about privacy and none considered that analytics could actually be simple. I wanted to build a [simple website analytics tool](https://usefathom.com/why-fathom-analytics/simple-web-analytics) that was an [alternative to Google Analytics](https://usefathom.com/).

Funnily enough, the tweet and signups instantly took off. It got enough traction, even more than I had expected. I went looking for a developer to partner with (since my skills are marketing and design), and found out that my friend Danny Van Kooten, maker of MC4WP, was interested in building Fathom with me. This was great!

We built the open-source version first, again, to test the waters and gauge interest. It quickly became a trending product on Github, has over 6,000 stars and was the #5 product of the week on [Producthunt](https://www.producthunt.com/posts/fathom-analytics). The Docker image has been pulled more than one million times.

Next, we built out the PRO version, allowing non-developers to host their Fathom Dashboards with us. And once again, it took off and hit #4 on [Producthunt](https://www.producthunt.com/posts/fathom-analytics-pro). Slowly but surely we were building our MRR.

A year later though, Danny’s life was pulling him in another direction. He was a new dad and MC4WP was generating a lot more revenue than Fathom. So he stepped down privately in Dec 2018, and we [announced it publicly](https://dannyvankooten.com/stepping-down-fathom-maintainer/) in Mar 2019.

When Danny told me he wanted to move on from Fathom, I honestly wasn’t sure if I would continue the project. A lot of what Fathom had become was a result of my partnership with Danny, so I wasn’t sure I wanted to go out and find a new cofounder and start quite a bit further back. There were definitely a few days where I thought I was definitely going to shut Fathom down for PRO customers, and just let the repo wither and die, like so many other open-source projects.

During that time, I was working on another project, Pico, a publishing platform with Jack Ellis. I mentioned off-hand that Danny had left Fathom and much to my surprise, Jack offered to step in as the technical cofounder. I had been enjoying working with Jack on Pico, so it gave me the renewed confidence and momentum I needed to want to keep Fathom going, and keep it going long-term.

The first step for Jack was to dive into the codebase and see how everything was built. We had it so that we had a single database for every customer, and those customers were spread across multiple servers, so things were very distributed. This wasn’t the setup that Jack typically preferred, so he immediately started thinking about architecture changes. Additionally, Go, the original programming language, wasn’t a language that Jack was familiar with, so he rebuilt Fathom Pro using Laravel, which is what Fathom still uses. He also concluded that we should completely change our architecture and move from a handful of dedicated servers to a PaaS (Platform as a Service) that auto-scales, so we moved to Heroku. That way, our stats collector was always-on, and able to handle massive surges in website traffic for our customers. We broke the application down into 3 distinct parts: API, Collector and Billing, which allowed us to scale each area independently. In addition to this, we also brought in new ways to process pageviews in the background and moved to a Redis-driven queue system to support additional scale.

Jack and I created our business shortly there-after, and incorporated in Canada (where we both live), and called it Conva Ventures. The word “Conva” means nothing, it was just a fun domain I had registered a while back because the word looked nice in a sans-serif typeface.

Jack’s rebuild of Fathom focused on what _had been_, because we wanted to get a version that was easy to maintain and fix to our paying customers, but both of us had ideas for the future. For what Fathom _could_ be moving forward. So after an intense few months of rebuilding the system from scratch, we began talking about version two (V2).

Jack was on board with my initial vision of “simple” and “private”—basically, a [Google Analytics alternative](https://usefathom.com/) that was easy to use and respected the personal data of website visitors. For the private part, we started to implement ideas like [cookie-free anonymous hashing](https://usefathom.com/blog/anonymization) and other things. For the simple part, it’s always hard to reign in what “could be” added to software in terms of features and what “should be” added. If we added every idea, we’d end up like Google Analytics, and have page after page of data for customers to wade through to get to the useful bits.

We began planning out V2 in the summer of 2019. As we did this, our revenue continued to grow at a steady pace, which gave us motivation to make V2 something great for our customers. We debated details and what features should or shouldn’t be added. We kept notes from our customers about what they wished Fathom did. We listened on Twitter to what people were saying they liked the most about our software. Our ideas started to take shape around how V2 would work, what would be added, and what our new plan would be going forward (past V2).

At the same time, I started pining (as designers often do) for a new marketing site. The previous version was working and converting, but it just didn’t feel like “us”. It felt generically SaaS.

I started to redesign the marketing site alongside the dashboard, so they’d be different, but speak the same visual languages. I did this a few times, but wasn’t happy with the results, so I tore down the first few versions of the website and application design and started from scratch. This was hard to do since I not only designed both, but coded the HTML/CSS for both a few times as well. The sunk cost fallacy is real, and each time I did, I felt as if I may be too deep in to start again. But still, it wasn’t feeling quite right, so I began again.

The current V2 of the marketing site and dashboard that you see today is probably more like V4 or V5 internally. But that’s ok, because for one (and this is rare for designers), I’m pleased with how both the marketing site and application have turned out. No tiny detail was overlooked, and where we could, we’ve added our own unique style and flair (like those weird cats in scarves).

At the same time as designing the final version of V2, Jack noticed that Laravel was releasing a new product, [Vapor](http://vapor.laravel.com/), a serverless deployment platform for Laravel, powered by AWS. So we quickly signed up for the waiting list so we could deploy the new Fathom with it. Fortunately, we were brought in during the first wave of invites (thanks Taylor!). This meant a huge migration (by this time we’d collected over 60 million page views for our customers) from Heroku and we needed to do the migration with zero data loss. (There’ll be a full article from Jack about this migration at some point soon, he pinky swears).

We alpha tested V2 with a handful of current customers, and much to our delight (and surprise, let’s be real), there were almost no bugs or changes required. So we migrated our customers over to V2, and then launched the new marketing site, which was both stressful and a nice relief after having worked on both for almost half a year. It’s great to see them out there, live, in the world, and we have been blown away by the constant emails / tweets of great feedback from everyone.

V2 feels like an accomplishment, sure, but it’s also a solid foundation to build upon. Our architecture is at a place where we’re happy with how our data is collected and stored, happy with how scalable things are, and happy with the way everything looks and functions. We’re now in a place where we can iterate and add new features at a speed that’s quicker than once per year, and ensure that Fathom is the best [privacy-focused web analytics](https://usefathom.com/why-fathom-analytics/privacy-focused-web-analytics) software out there.

Our roadmap is shaping up, dictated heavily by what our customers are asking for and what still meets the mandate of “simple and private”. The new version has brought an incredible amount of new customers, taking advantage of our free trial.

It’s hard to imagine that a year ago Fathom almost disappeared. At the time, it felt like that was the better option, to shut it down. Now though, I’m glad I didn’t and even glad-er that Jack offered to become a partner in this. Software/Saas can be challenging in terms of building and sustaining revenue, and we’re not quite at a place where we’re both working on Fathom full-time either. As I mentioned, this is still very much the start of the story. But we’re getting closer, and it’s a pretty amazing feeling to wake up to a support queue that on some days is full of people telling us how pleased they are they’ve found and started to use something we created.

#### Looking for some Laravel Tips? Check out Jack's [Laravel Tips section here](https://usefathom.com/blog/categories/laravel-tips).
