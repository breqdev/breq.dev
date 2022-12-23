---
layout: project
title: flowspace
description: A social network.
image: flowspace/login.png
created: "2021"
repo: breqdev/flowspace
demo: https://flowspace.breq.dev/
tags: [node, react, sql]
---

![](flowspace/login.png)

<Caption>
The login screen for the flowspace web app.
</Caption>

# Overview

flowspace is a social network website. It has a few basic features, such as direct messaging, friend requests, and public and private posts. Notably, there are two "tiers" of friends--the "wave" tier includes anyone you acknowledge and allow to message you, and the "follow" tier puts that person's posts into your feed. This outer tier maintains a gate around private messaging, helping to reduce the potential for harassment, but it also doesn't require someone to be shown every post from someone just to exchange messages.

![](flowspace/feed.png)

<Caption>
The primary feed, containing posts of people you follow.
</Caption>

# Motivation

Honestly, I kind of just wanted to take on a big project to learn and have fun. I definitely didn't have any hopes of actually building a userbase, considering the (aptly-named) network effect would make it pretty difficult to get anything off the ground. I figured a larger web project like this would involve a lot of interesting architectural decisions and using frameworks and services that I hadn't used much before.

# Technical Description

The service uses a JAMstack architecture, separating the static client app from the dynamic REST API. The API backend is written in NodeJS.

Handling HTTP requests, middleware, routing, etc. is done with [Koa](https://koajs.com/) and many plugins. Koa is a rewrite of the popular Express framework that uses Promises instead of callbacks--this results in much cleaner code in my opinion :)

The service uses three databases: PostgreSQL, S3 (compatible), and Redis. PostgreSQL is the primary data store, and it stores user profiles, messages, friend requests, posts, and the like. I'm using [Prisma](https://www.prisma.io/) to make working with relational data easier. The S3 compatible service stores profile pictures, and it could be used to store message and post attachments as well. Initially, I used a self-hosted [Minio](https://min.io/) container for this, but I decided to switch to GCP because of the generous free tier. Finally, Redis is used to handle rate-limiting the API.

The client app is a static single-page-application built with React and create-react-app. The CSS is all done in [Tailwind](https://tailwindcss.com/). I've deployed it to [Cloudflare Pages](https://pages.cloudflare.com/), again due to their generous free tier.

Authentication is handled through JWTs stored in localStorage. Upon login, a user will get two tokens: an access token and a refresh token. The refresh token will allow generating a new access token for up to seven days, letting users stay logged in for a while. Tokens are signed using both a secret key and the user's password hash, ensuring that if a user resets their password, any existing tokens will be automatically invalidated. Password resets and email verification is handled through [SendGrid](https://sendgrid.com/). (Gotta love free tiers, amirite?)

![](flowspace/messages.png)

<Caption>
The messages page.
</Caption>

In addition to the REST API, a WebSocket "Gateway" endpoint is provided. This allows clients to subscribe to any message channel for updates, and receive any messages that come in on that channel. This is used for real-time direct messaging.

# Results

It works! And while it's far from complete, the feature set is pretty good. I don't think I'm going to work more on it, considering it's first and foremost a learning project for myself and nobody else is using it much.

![](flowspace/profile.png)

I hadn't worked with NodeJS in the backend before. Previously, my go-to was always Flask for these kinds of APIs, and I'd been tinkering with [Quart](https://pgjones.gitlab.io/quart/) as well (which is a reimplementation of Flask that uses an event loop via Python's asyncio library). Eventually, I asked myself why I was using this small fork of Flask just for the event loop feature when NodeJS was famous for its event loop and I was already familiar with JavaScript on the client side. I wasn't sure how long it would take to get up to speed with NodeJS, but I found it pretty easy to learn from a client-side background. (Having Node APIs not match Web APIs was a bit jarring, and I'd like to look into [Deno](https://deno.land/) at some point, but it just doesn't seem like the ecosystem is there yet.)

Working with a big relational database was also really interesting. The app has different relationship types: For instance, the mapping from users to posts is one-to-many, but the mapping of users to followers/friends is many-to-many. Learning how to express these relationship types in SQL was a surprising challenge for me, considering I hadn't really worked with data like this before.

This was also one of the first major sites I built with Tailwind. CSS is something I'm gradually starting to get better at, and I think Tailwind is helping with that. It really helped shift my perspective on CSS from "those weird layout commands" to "nuanced rules to declaratively describe the layout of any element as a function of its size, children, etc." Miriam Suzanne's [video](https://www.youtube.com/watch?v=aHUtMbJw8iA) on "Why is CSS so weird?" is a really great starting point for this way of thinking, but I think it really takes time and practice to understand how to work within the CSS rules, instead of around them.

P.S. if you'd like to message me on there, make an account and browse to my profile at [https://flowspace.breq.dev/u/AtACdumJQAA](https://flowspace.breq.dev/u/AtACdumJQAA). I might not get your message unless you ping me elsewhere though, since I never got around to implementing push notifications :)
