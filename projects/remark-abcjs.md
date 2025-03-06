---
layout: project
title: remark-abcjs
description: A Remark plugin to format music notation.
image: remark-abcjs.png
created: 2022
repo: breqdev/remark-abcjs
tags: [javascript]
writeup: 2022-01-04
---

```abc
X: 1
T: Nokia Tune
M: 3/4
L: 1/8
K: Amaj
| e'd' f2 g2 | c'b d2 e2 | ba c2 e2 | a6 |
```

# Overview

`remark-abcjs` is a [Remark](https://github.com/remarkjs) plugin to render sheet music written in [ABC notation](https://abcnotation.com/).

# Motivation

I wanted to learn more about the [Unified](https://unifiedjs.com/) ecosystem by writing a plugin for it, and this seemed like an interesting challenge. I also figured I might end up using it on my site if I ever get around to posting music-related content.

# Technical Description

The plugin looks for nodes in the syntax tree with type `code` and language `abc`. This means you can write ABC notation as:

````md
```abc
X: 1
T: Nokia Tune
M: 3/4
L: 1/8
K: Amaj
| e'd' f2 g2 | c'b d2 e2 | ba c2 e2 | a6 |
```
````

It then uses [ABCJS](https://paulrosen.github.io/abcjs/) to render the music to an SVG, storing the result in the `data` property of the node so that `remark-rehype` can render it as HTML.

# Results

Works well enough that I'm using it successfully on my site. That said, compromises had to be made. ABCJS doesn't support Node.js environments out of the box, so I had to use [patch-package](https://github.com/ds300/patch-package) to manually patch it, and then use a build script to include the patched version. My patch uses [JSDOM](https://github.com/jsdom/jsdom) to create a `document` object for DOM manipulation.

Also, this project showed me, to put it frankly, how broken the ES module rollout has become. The UnifiedJS collective has more or less entirely switched to pure ESM packages, which can't be `require()`'d. On the other hand, Gatsby is still purely CommonJS. As a result, any Gatsby site has to pin an old version of `remark`/`rehype` and friends. I was primarily developing this plugin for my own site, but I wanted to support the latest standards, so I used [Babel](https://babeljs.io/) to transpile the ES module source to CommonJS. This added complexity to the build process, and I had to pin the CommonJS dual mode versions of all the UnifiedJS packages I depended on. This ended up being kind of the worst of both worlds.

Overall, though, I'm happy I took on this project. I ended up with something useful and I learned a lot about the inner workings of `remark` and the rest of the Unified ecosystem.
