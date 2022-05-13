---
layout: project
title: React Twitter NoTrack
description: A React component library for embedding Tweets without Twitter's tracking script.
image: react-twitter-notrack.png
created: "2021"
repo: Breq16/react-twitter-notrack
demo: https://github.breq.dev/react-twitter-notrack
tags: [javascript, serverless, react]
---

<Tweet id="1431392146339377152" />

`react-twitter-notrack` does exactly what it says on the tin: allow you to embed Tweets as React components without exposing your users to tracking. You can install it from [npm](https://www.npmjs.com/package/react-twitter-notrack) with `npm i react-twitter-notrack`.

```js
import { Tweet } from "react-twitter-notrack"

function App() {
    return (
        <Tweet id="20" apiUrl="https://twitter-proxy.breq.workers.dev">
    )
}
```

# Motivation

I wanted to be able to embed Tweets on my website, so I looked into React-based Twitter embed libraries. The two that I found, [`react-twitter-widgets`](https://github.com/andrewsuzuki/react-twitter-widgets) and [`react-twitter-embed`](https://github.com/saurabhnemade/react-twitter-embed) operated similarly: they both used the Twitter widgets.

Twitter has a [system of widgets](https://developer.twitter.com/en/docs/twitter-for-websites/javascript-api/guides/set-up-twitter-for-websites) that can be embedded on a website. They work by using a JavaScript library to dynamically include iFrames onto the page. I'm not a huge fan of this approach, for a couple reasons:

- The iFrames tend to load in after everything else on the page, leading to a huge layout jump.
- Embedding iFrames uses more resources.
- Users who use tracker-blockers, like Firefox Enhanced Tracking Protection, might not see the Tweet at all.
- Allowing Twitter to execute JavaScript on my webpage exposes my users to tracking without their consent.

I decided to try making my own Twitter embed, built as a pure React component without any imperative DOM manipulation.

# Technical Description

I started building out this project using [Storybook](https://storybook.js.org/). I had wanted to try out Storybook for a while by now. I really enjoyed how quickly it allowed me to iterate.

Using an official Twitter widget as a model, I tried to emulate the design as best I could. I built out this mockup using [`styled-components`](https://styled-components.com/), which was another first for me. I think that `styled-components` was a good fit for this project--it's a lot lighter-weight than Tailwind, and there was no need for me to stick to a broader design system like my website as a whole. That said, for more ambitious projects, I'll probably stick with Tailwind to keep things looking cohesive.

Then came the data fetching. I noticed that the official Twitter embed was sending a request to `cdn.syndication.twimg.com`:

![](twitter/network-request.png)

...and getting back a response with info about the tweet:

![](twitter/response.png)

So, just call this endpoint from the React component and we're good, right?

...nope. Twitter uses [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) to only allow `platform.twitter.com` to access this endpoint. For the official embed, this isn't an issue, since the iFrame is loaded from that origin. But for our pirate embed, we'll need to find another way.

I ended up building a proxy with Cloudflare Workers to spoof the `Origin` header to Twitter and send back a permissive `Access-Control-Allow-Origin` to the client. This is pretty much the same approach I used for GenReGen's [Pastebin proxy](/projects/genregen#technical-description).

With that out of the way, I just had to fetch the data from the proxy. I used trusty old [useSWR](https://swr.vercel.app/) to get the job done.

# Results

This library doesn't produce embeds with as much polish as the official Twitter ones -- they don't show the original tweet when embedding a reply or quote tweet, and they don't show more than one image at a time for now. But overall, I think this resulted in something usable and more performant than the official embed. I'm currently using it for all the Twitter embeds on this website, and it checks all the boxes. I don't know if anyone else will find it useful, butI'm still happy that I shared my work on NPM.
