---
layout: project
title: LetMeIn
subtitle: Automate unlocking doors at Northeastern's IV dorm.
image: "../images/default.png"
video: /videos/letmein.480p.webm
created: "2021"
repo: Breq16/letmein
---

<YouTube id="zk6Bb-aY_Yo" />

<Caption>
A video of me unlocking my door. Don't worry, I changed my PIN afterwards.
</Caption>

# Motivation

I wanted to learn how to use [Puppeteer](https://pptr.dev/), since I've seen it used in different projects. Puppeteer automates a browser, and it's used for both automated testing and in various backend applications. For instance, [VSinder](https://www.youtube.com/watch?v=bfd8RyAJh6c) used Puppeteer to automate screenshotting code snippets, which famously knocked [carbon](https://carbon.now.sh/) offline for while when it was DDOSed. Lore aside, I wanted to get experience with actually using it, since I figured it would likely come in handy at some point.

# Technical Description

The code is just a hundred lines of NodeJS. The Puppeteer API makes heavy use of Promises, so I wrote it all using async functions. I'm using [Koa](https://koajs.com/) to trigger the process when a HTTP request comes in—it's like Express, but based on promises instead of callbacks.

I had a tough time getting a consistent setup to automate. Northeastern uses its own SSO system, plus [Duo](https://duo.com/) for two-factor authentication. Annoyingly, these two are seemingly on different expiration timers, making reliable execution difficult.

I eventually decided to try removing all Northeastern cookies on each invocation and manually stepping through the sign-in process (typing in username and password), which worked well to consistently get through Northeastern's login step. For Duo, I tried to save cookies between invocations, but ran into unreliable behavior.

I could have configured Duo to send an SMS to a [Twilio](https://www.twilio.com/) phone number and then read that into Puppeteer to enter the 2FA code, but I didn't want to spend money on this project. Thus, in the final video, I manually clicked "approve" on my phone. Sorry for the deception.

# Results

I mean, it worked? It did unlock my door. That said, it's so impractical in its current state that I don't think I could salvage it into something actually useful. A couple key takeaways:

**Browsers are made for humans, so they aren't deterministic.** Browsers have functionality designed for humans, and even with puppeteer, there are going to be some hiccups when controlling them with automation. Even simple things like waiting for a page to be loaded can be hard—requests happen in an unpredictable order, so waiting for one specific event or request can introduce race conditions. The recommended solution is to wait a predetermined interval after the last web request is closed, which covers _most_ edge cases but is nonetheless inefficient.

**Browsers are _huge_, and that leads to a lot of overhead.** Including a full Chromium instance in a project makes `node_modules` massive, and even spinning up a new tab to handle a request takes an appreciable amount of time. This is a setup that could work in a parallelized testing rig, but it's really an option of last resort for any production use case.

**Not everything lends itself to automation.** In this case, my script needed to wait for many different Northeastern sites to load, and considering the primary web portal I used has seemingly not been touched in a decade, it loaded quite slowly. Even though the process was automated, it wasn't actually that much faster than doing the steps by hand. This surprised me. I'm used to humans slowing down machines, so I figured I could get a significant speedup by applying automation to the problem, but the human was never the bottleneck in the first place.
