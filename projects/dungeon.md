---
title: 88x31 Dungeon
description: A set of web experiences to traverse the 88x31 graph, inspired by text-based dungeon crawl games.
image: dungeon/dungeon-full.png
created: "2024"
repo: breqdev/dungeon
demo: https://dungeon.breq.dev/
tags: [javascript, 88x31, web]
writeup: 2024-09-07
---

<br />

88x31 Dungeon is a set of "games" that allow you to traverse the graph of [88x31 buttons](/projects/eightyeightthirtyone), which are small, pixel art buttons that website owners include to link to related people and projects. It's based on data collected by [eightyeightthirty.one](https://eightyeightthirty.one/), a scraper which originally mapped the full 88x31 network. The graph is used to generate a "dungeon" grid, with each room containing a particular website. This project can be thought of as an alternate way to visualize and interact with the graph created by eightyeightthirty.one.

# Experiences

88x31 Dungeon provides a set of related experiences, each providing a different way to interact with the graph.

## Birds Eye

![](dungeon/birdseye.png)

The birds-eye view shows the full grid and allows the user to scroll across the map. This was the first and simplest experience I implemented, and is useful mostly to visualize the layout of the dungeon. Each square renders the site's 88x31 and domain name, and it's possible to "fly" to a specific site.

## Navigate

![](dungeon/navigate.png)

Navigate embeds each site with an `<iframe>` and allows you to visit its neighbors using arrow keys. It's loosely inspired by the "dungeon crawler" format, but the arrow buttons at the top let you see the domain of the site you're about to navigate to. It's almost like a two-dimensional [webring](https://en.wikipedia.org/wiki/Webring). I find it fun to move quickly through this one, getting a feel for each region of the dungeon by seeing each site for a few seconds.

## Walk

![](dungeon/walk.png)

Walk presents a draggable canvas on which rooms of the dungeon are embedded as `<iframe>`s. The buttons at the left allow you to switch between "drag mode" and "interact mode," where the latter allows you to scroll, click, and interact with each website on the grid. Unlike the other frame-based experiences, Walk shows up to nine frames at once, letting you see each site in the context of its neighbors.

A limitation of Walk is that each site is rendered in a relatively small viewport, breaking some sites. This is particularly an issue on mobile browsers where the viewport is already very small.

## Crawl

![](dungeon/crawl.png)

Crawl is the most similar experience to a text-based dungeon crawler. At the top, the site is embedded in a 4:3 `<iframe>`, and at the bottom, the user can run commands in a terminal.

Crawl provides the following commands:

- `go [dir]`: Move in a direction (`north`, `southeast`, etc)
- `look`: Look around (prints the domains of the rooms that border the current room)
- `fly [domain]`: Teleport to a specific room

# Technical Description

This project consists of two parts: the code to generate the dungeon, and the frontend experiences.

## Dungeon Layout Generation

![](dungeon/dungeon-full.png)

<Caption>A full view of the generated dungeon layout.</Caption>

The dungeon is generated using a breadth-first greedy algorithm, which is roughly defined as:

1. Start by placing `breq.dev` at `(0, 0)` and adding its neighbor cells to the queue
2. Pull a grid cell from the queue
3. Find domains with links (in either direction) to the rooms neighboring this cell
4. Sort the candidate domains by the number of unique links
5. If no candidates exist, return to step 2
6. Place the best candidate in a room at this cell
7. Add the neighbors of the newly placed cell to the queue
8. Return to step 2

I'm happy with how this algorithm creates neighborhoods, and it places a good portion of the total graph. However, it struggles with cliques, since each node can have at most 4 neighbors.

## Putting Sites in Frames

Each experience is implemented differently, but most required embedding untrusted sites using `<iframe>` tags. Iframes are a relic of the old web, and honestly probably would not become a web standard if they were proposed within the last few years. A few issues I ran into included:

### React reusing frame elements

Previously, some parts of the implementation looked like this:

```tsx
return <iframe src={`https://${room.domain}`} />;
```

The subtle bug here that creates undesired behavior is that when `room` changes, the `iframe` element is reused instead of recreated, so the old frame contents persist while the new ones are loaded. This leads to a confusing user experience, especially in Walk where frame positions are constantly changing positions and sources.

React provides a `key` parameter for lists to tell what elements to create, destroy, or reuse. The best solution I found in this case is to create a 1-element list and use this:

```tsx
return <>{[<iframe src={`https://${room.domain}`} key={room.domain} />]}</>;
```

### Dead links leading to frames not loading

If you scroll for any appreciable amount of time, you're likely to find either the "page crashed" icon (in Chrome) or a "Firefox can't display this page" error (in Firefox). Unfortunately, many targets of 88x31 links are dead pages. While I'd love to show a fallback UI containing the 88x31 button itself in these cases, [IFrames don't send `error` events](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#error_and_load_event_behavior) since it could be used to "probe the URL space of the local network's HTTP servers." Since there are many other ways to probe the URL space of the local network's HTTP servers from a website, I'm not sure what the merit of this policy is, but as web developers we must accept that we live and die at the whim of browser makers.

Amazingly, [someone found a batshit insane way to solve this problem](https://stackoverflow.com/questions/375710/detect-failure-to-load-contents-of-an-iframe/54952975#54952975), but I'm hesitant to use a brittle solution like this.

### Sites setting the `X-Frame-Options` header

A lot of sites set [the `X-Frame-Options` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options) (or its modern alternative, the Content Security Policy directive [`frame-ancestors`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors)) to prevent untrusted websites from loading them as frames.

There is a legitimate security argument for some sites due to an attack called [Clickjacking](https://developer.mozilla.org/en-US/docs/Web/Security/Practical_implementation_guides/Clickjacking), in which trusted content is loaded into an `<iframe>` and buttons, input fields, or other interactive elements are overlaid on top of the frame to capture input. However, this isn't applicable to most simple personal websites.

While it might be possible to build and use a proxy which strips these headers from the site, doing so would violate the spirit of this header: if someone set this header, they would probably prefer their site not be embedded into other sites, and I don't want to override their preference. (I'd still really prefer to show a fallback... alas.)

### Sandboxing frames

During early development, I found a few sites acting annoyingly, including one that would navigate the top-level window away (what the hell?). While I'd love it if everyone on the indie web played nice, I did implement some protections using [the `sandbox` attribute](https://web.dev/articles/sandboxed-iframes).

I added the following flags:

- `allow-scripts`, since JS in frames is mostly harmless
- `allow-same-origin`, since leaving this out interferes with many websites' ability to load fonts and other resources

This still lets frames cause problems (lagging the user's computer, autoplaying annoying audio, etc), but the worst of the problems have been dealt with. Plus, this project deciding what's annoying and restricting features of iframes runs counter to the spirit of showcasing the variety present in the indie web. As such, this approach strikes a balance between maintaining the availability of the site and allowing for creative expression.

# Conclusion

While some parts are a little clunky, the intent behind this was less a polished end result and more an experiment into designing interesting and fun experiences which are part game and part visualization tool. I'm happy with the variety present in the end result. Undoubtedly I think I'm going to end up finding more ideas for experiences, and I'm excited to explore this idea further.
