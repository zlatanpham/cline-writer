```yaml
title: "Fathom Analytics now supports two-factor authentication (2FA)"
author: "Paul Jarvis"
tags:
  - news
  - security
  - two-factor authentication
  - 2FA
  - Fathom Analytics
```

In an ideal world, all passwords would be secret and unhackable. Since that’s not the case (😿), Fathom now offers 2FA on all accounts. So even if someone steals your password, they still can’t log in without your verification device.

Using two-factor authentication increases security of your account because it requires two steps.

Step 1
------

The first step is your email and password, both of which should be private and unique. A lot of people will use a single email address for all logins but that is not the best practice.

Example of best practice:

1.  `fathom3509043@mydomain.com`. The first part, `fathom` lets you know which service this email address is for. The second, `3509043` is a random string that can’t be easily guessed. Yes, this is just your email address (username), but still, the more private and secure, the better.
2.  `slek$r5u34095roiej#$jkofl`. A secure password like this one (but not this one, obviously) which you use only for logging into Fathom Analytics and is not shared with any other services.

Step 2
------

This is an additional security step that is required to log into your account if you turn 2FA on. This is a step that requires an external application (like Authy, Duo Mobile or 1password) to generate a unique one-time password (OTP). This OTP is a six-digit code that expires.

By adding this second step, and requiring an OTP, even if somewhere were to steal your email and password, they’d still need the device you use to generate your OTP, otherwise they can’t gain access.

There is no step 3
------------------

We will note that we only support OTPs generated via an authenticator application. Other software lets you receive OTPs via SMS, but SMS is [easily hackable](https://gimletmedia.com/shows/reply-all/v4he6k/) (with SIM-jacking, and similar) and we don’t feel it’s secure enough for our customers. Our focus has always been to create a [simple website analytics](https://usefathom.com/why-fathom-analytics/simple-web-analytics) platform, so even with new features like this, we want them to be simple for our users.

How to set 2FA up on your Fathom Account
----------------------------------------

It’s easy and straight-forward to get the best security possible by enabling 2FA in Fathom Analytics. Here's how you [set it up](https://usefathom.com/docs/account/2fa):

1.  Log into your account, and navigate to `Settings` (it’s in the footer)
2.  Click to `Account` if you aren’t taken there automatically. Then scroll down to the Two-factor authentication section and toggle `Enable 2FA on my account`.
3.  You’ll see a modal window with a QR code. Scan that into your authenticator app, and you’ll be given a 6-digit code to type into the input field below. Then click `Enable 2FA now`.
4.  You’ll be presented with a backup code. Should you lose your device or accidentally delete your authenticator app, this backup code is the ONLY way to get back into your account. Save this, write it down, store it somewhere safe. It can be used once to log in.

That’s it! You’ll have setup and enabled 2FA on Fathom Analytics, so each time you log in from there, you’ll be asked for your 6-digit OTP after you enter your email and password.

Here’s to more security on Fathom and the rest of the interwebs.
