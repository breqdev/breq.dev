---
layout: project
title: GenReGen
subtitle: A mashup generator.
image: ../images/genregen.png
created: "2021"
repo: Breq16/genregen
demo: https://genregen.breq.dev/
tags: [javascript, serverless]
---

![](../images/genregen.png)

# Overview

"Genre Gen"-erator? "Gen"-erate "Regen"-erate? Regardless of what the name means, this is a program that'll take in a list of items and spit out randomized mashups.

# Motivation

I received an email from [my uncle Mitch](https://deadline.com/2020/07/gerard-butler-screenwriter-mitchell-lafortune-signs-with-apa-1203000985/) asking for a random genre mashup generator to help with coming up with ideas for movies. I wanted to make something stable, that would continue working even without my involvement.

# Technical Description

The brief was simple enough -- just pull two random items from a list. I didn't even use a framework for this; it's all done with imperative DOM manipulation. Since it's just a few static files, I'm hosting it on Cloudflare Pages. Implementing a few other features, like going backwards through the list of generated mashups, was also pretty trivial.

What complicated things a bit was Mitch's request that the list be editable. I didn't want to manage an authentication system to restrict access to a central list, since that would require hosting and a custom backend solution (which is more expensive to run, more difficult to implement, and more work to maintain).

The hack that I settled on was using Pastebin as a source. Anyone can upload a list of things to Pastebin, then put the URL of that list in the "source list" box to generate random pairings from that list. The JavaScript will detect changes to this field and pull the list from Pastebin, using it for all subsequent mashups. It'll even save the most recent URL in the browser `localStorage`, so that the user doesn't have to keep re-pasting it.

Of course, there was another hurdle: [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). Yes, it helps keep us safe on the web, yes, it protects private data and intellectual property rights... but in this case, it was just another issue to work around.

Oh, but Pastebin adds the `Access-Control-Allow-Origin` header, right...?

<Tweet id="916213585960947712" />

Ah, capitalism strikes again.

To solve this, I ended up using [Cloudflare Workers](https://workers.dev/) to make a simple proxy that adds CORS headers on top of the Pastebin API.

```js
addEventListener("fetch", (event) => {
  event.respondWith(
    handleRequest(event.request).catch(
      (err) => new Response(err.stack, { status: 500 })
    )
  );
});

async function handleRequest(request) {
  const incomingOrigin = request.headers.get("Origin");

  if (!/(breq\.dev|genregen\.pages\.dev)/.test(incomingOrigin)) {
    return new Response("Origin Not Allowed", { status: 403 });
  }

  const url = new URL(request.url);
  const paste = url.searchParams.get("paste");

  request = new Request("https://pastebin.com/raw/" + paste, request);
  request.headers.set("Origin", "pastebin.com");

  let response = await fetch(request);

  response = new Response(response.body, response);
  response.headers.set("Access-Control-Allow-Origin", incomingOrigin);
  response.headers.set("Vary", "Origin");

  return response;
}
```

# Results

Honestly, it does everything I had hoped it would. The Pastebin solution is a bit janky, but in the end, I'm glad I got everything working without any recurring costs or complex backends to maintain.
