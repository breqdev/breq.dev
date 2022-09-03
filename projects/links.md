---
title: Links
description: A dynamic URL shortener made using SSR.
image: links/dashboard.png
created: "2021"
repo: breqdev/links
demo: https://links.breq.dev/
tags: [node, koa, redis]
---

![](links/signin.png)

<Caption>The sign-in screen.</Caption>

![](links/dashboard.png)

<Caption>The dashboard for the URL shortener.</Caption>

Exactly what it says on the tin: a basic URL shortening service that allows changing the destination of the URL after creating it.

# Motivation

I had done some server-side-rendering work with Flask before, but I hadn't ever approached it from the JavaScript side of things. I wanted to understand some of the frameworks that are used to perform SSR using Node.

At the time I made this, the college application season wasn't that far behind me, and I remember seeing mail from some colleges using a plus sign from their domain as a URL shortener, such as `https://wpi.edu/+FJI3DE`. This seemed like a cool idea, since it wouldn't interfere with existing routes but would provide short URLs on a recognizable and trusted domain.

# Technical Description

URLs are stored in [Redis](https://redis.io/), since a key-value store seemed like a great fit for this scenario. Routing is handled using [koa](https://koajs.com/). For requests to the redirect URLs, this is all that happens.

For the login and dashboard pages, I used templates written in [nunjucks](https://mozilla.github.io/nunjucks/), a JavaScript templating language similar to Python's [jinja2](https://www.palletsprojects.com/p/jinja/) (used with [Flask](https://flask.palletsprojects.com/en/2.0.x/)).

Authentication was handled with JWTs as cookies, and I used the GitHub OAuth API instead of storing usernames and passwords. I didn't use a client-side JavaScript framework, just plain old HTML forms and a bit of vanilla JS to handle some show/hide buttons.

# Results

This project made me shift my thinking a lot. In many regards, I'd been spoiled by front-end frameworks. Working without one, I had to think about how I could use the platform to accomplish my goals. This in turn gave me a better understanding of concepts like JWTs, cookies, and HTML forms.

It was cool to use platform features like forms and cookies to handle data submission and authentication without client side JS. Contrast this with [flowspace](/projects/flowspace), in which I just passed the token as an `Authorization` header for every `fetch` POST request I made. This was a pretty simple project, but I'm glad I took it on.
