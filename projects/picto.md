---
title: Picto
description: A Pictochat clone built on Web technologies.
image: picto.png
created: "2021"
repo: breqdev/pictochat
demo: https://picto.breq.dev/
tags: [react, node]
writeup: 2022-03-23
---

![](picto.png)

This is a clone of Pictochat built on top of Web technologies.

# Motivation

<Indent>

> I wish we never met<br /> **We broke up on PictoChat, crying on my DS**<br /> I went to a birthday party for one of her friends<br /> And now that this is over I can hate them, I don't have to pretend

<Indent>

\- Glitch Gum, "NEVER MET!"

</Indent>

</Indent>

I grew up with a Nintendo DS, so it's no surprise I have a ton of nostalgia for Pictochat. And when a certain hyperpop song rekindled that nostalgia, I wanted to find a way to experience Pictochat again.

# Technical Description

The project is mostly just a React single-page-application (although there's a small WebSocket server component [here](https://github.com/breqdev/pictoserver/blob/main/index.js) to rebroadcast messages).

I didn't strip any assets from Pictochat itself, and I'm not much of a sound or icon designer, so I made do with what I could find. I picked similar sounds from [material.io](https://github.com/breqdev/pictoserver/blob/main/index.js) and icons from [Font Awesome](https://fontawesome.com/). Some of them are a better match than others, but overall, they match up pretty well.

I made an effort to have usable keyboard navigation. The original DS allowed using either the stylus or control pad for navigating the interface, so I wanted this project to have a similar experience.

I also tweaked the onboarding flow a bit. In the original Pictochat, the name and theme color of the user was read from the DS system settings. Since I'm only cloning Pictochat itself, I instead prompted for these during onboarding. I also tweaked the chatroom mechanics somewhat. The original Pictochat used the Nintendo Low Latency Protocol to create chatrooms with nearby DS handhelds within range over 2.4GHz. While a similar system would be fun to implement on dedicated Linux boxes ([IBSS](https://wiki.archlinux.org/title/ad-hoc_networking) + [batman-adv](https://www.open-mesh.org/projects/batman-adv/wiki), anyone?), I certanly couldn't implement it in a Web browser, so chatrooms are global.

One of my favorite aspects of Pictochat was the closed-ness of the rooms: even though you might be in a room with unfamiliar people (e.g. at an event), you could be certain it was a relatively small group that you could get to know. Having four global chatrooms seemed counter to this, so I insted opted to let chatroom names be any arbitrary string. My hope was that people would choose mostly-unique names, keeping the number of users per chatroom relatively low.

Building this as a React app and styling it with Tailwind was mostly straightforward. It was a bit difficult to get the viewport string correct such that the window wouldn't become narrower on mobile -- for once, we don't actually want the site to be responsive, since it has to exactly match the layout of the original Pictochat! Also, keeping the state of the canvas in the message compose box was tough, since the state of the image couldn't be extracted from the canvas element itself. As a workaround, I passed a ref object _down_ to the canvas, which assigned it to a dispatch function. Then, the parent component could dispatch commands down into the child and request state to flow up from it. It's ugly, but I can't think of a better way of doing things: I can't exactly change how the platform works, and mixing multiple data models never works well.

# Results

It isn't perfect, but it's accurate enough that I was able to relive some of my childhood: typing a bunch of text and scribbling furiously with the pen tool to make a message completely black, copying and editing a message to write all over it, and dragging letters all over the page as decoration.

The WebSocket connection had some reliability issues, and I think my reconnection logic might have been broken somehow. Other than that, I was pretty happy with how everything turned out. It didn't blow up, but it helped me and my friends scratch that nostalgic itch, which was nice.
