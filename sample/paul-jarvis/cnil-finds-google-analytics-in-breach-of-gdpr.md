```yaml
title: CNIL finds Google Analytics in breach of GDPR
author: Paul Jarvis
tags:
  - CNIL
  - Google Analytics
  - GDPR
  - EU Data Protection
  - Schrems II
  - Data Privacy
  - Analytics
```

> **Update**: [CNIL has published an FAQ on Google Analytics](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/questions-reponses-sur-les-mises-en-demeure-de-la-cnil-concernant-lutilisation-de-google-analytics) on June 7th, 2022 stating that websites have only one month to comply and remove Google Analytics from their website. They have stated that there is no way for GA to be configured to satisfy Schrems II and no supplementary measures that can be taken to make GA compliant.

Similar to the [Austrian DPA findings last month](https://usefathom.com/blog/illegal-analytics), the French data protection watchdog, [CNIL](https://www.cnil.fr/en/use-google-analytics-and-data-transfers-united-states-cnil-orders-website-manageroperator-comply), has found that Google Analytics is now illegal. The ruling states that Google Analytics does not protect EU visitor data sufficiently from US surveillance and spying.

Basically: this new ruling has found that moving data from the EU to the US is unsafe, not “sufficiently regulated,” nor does it offer sufficient protection for EU citizens and their data.

> “The US fails this critical equivalence test on account of having sweeping surveillance laws which do not provide non-U.S. citizens with any way to know whether their data is being acquired, how it’s being used or to seek redress for any misuse.” (Source: [TechCrunch](https://techcrunch.com/2022/02/10/cnil-google-analytics-gdpr-breach/))

Google declined to comment on this decision and has so far declined to update their software to be GDPR compliant.

The CNIL suggests using an alternative analytics tool that does not involve a transfer outside the EU to ensure GDPR compliance.

[Fathom Analytics](https://usefathom.com/) falls under a “GDPR compliant alternative analytics tool” because we launched [EU Isolation](https://usefathom.com/features/eu-isolation) last year. Meaning: all EU visitor data we process is done on EU servers. And, since Fathom Analytics is a Canadian company, we have an adequacy ruling under the GDPR. This means we can work with EU companies and not transfer any personal data (IP) to US-controlled servers.

With [101 complaints filed](https://noyb.eu/en/austrian-dsb-eu-us-data-transfers-google-analytics-illegal) in the EU in the wake of the Schrems II decision, it’s just a matter of time before more EU DPAs rule similarly against Google Analytics and potentially ban the use of Google Analytics in general.

This also means other companies who use software that runs on US-controlled servers to process data could likely be subject to similar rulings in the future.

Google Analytics is used by about 85% of the internet because people thought it was “free software.” The true cost of paying for software with data is now becoming apparent, and using free software and risking fines or complaints may not be worth the risk moving forward.

### You might also enjoy:

*   [EU Ruling: Google Analytics is now illegal](https://usefathom.com/podcast/illegal-analytics)
*   [The Journey to EU Isolation](https://usefathom.com/blog/eu-isolation)
