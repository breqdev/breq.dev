---
title: Rolodex
description: A "contacts app" for amateur radio callsigns and DMR IDs.
image: rolodex/opengraph.png
created: "2024"
repo: breqdev/callsign-rolodex
demo: https://rolodex.breq.dev/
tags: [radio, react, web, firebase]
writeup: 2024-07-03
---

![](rolodex/mine.png)

<Caption>My own card as it appears in my account.</Caption>

# Overview

Rolodex stores a virtual contact card with a callsign, name, and other metadata for each of your amateur radio friends. Cards can be viewed, created, and updated on a desktop or mobile device.

# Motivation

My friends and I often use local amateur radio repeaters to communicate, so I often need to call one of them by callsign. I didn't feel like I had a centralized place to store this information: a text note would be difficult to navigate and annoying to sync between devices, a traditional contacts app lacks an appropriate field for callsign or DMR information, and I wanted something that I could search by callsign in case I can't quite remember who holds a particular call. The resulting app is a single place where I can track all of my friends' calls, and is something I can easily reference from my phone in the field.

I chose the name "Rolodex" because it conveyed the purpose of the app (storing contacts), and it sounded unique, functional, and a little playful.

# Technical Description

The frontend uses the stack I tend to reach for for frontend work: Vite, TypeScript, React, and Tailwind.

Cards use a fixed aspect ratio to follow the [ID-1](https://en.wikipedia.org/wiki/ISO/IEC_7810#ID-1) spec. I used the morse code version of the callsign as an artsy divider between the callsign and name -- this uses a specific morse code font file. The interface uses a mix of DIN and JetBrains Mono, two fonts I haven't worked with much before, since I felt they worked together well and gave each card a utilitarian look without being off-putting.

The "rolling" animation in the column view works by checking where each card is in the scroll view with a JavaScript event, then applying rotation in X and translation in Y and Z. This took me the most effort to get right, and I'm probably going to continue tweaking it to improve its behavior across various screen sizes.

The backend of the app is entirely done in Firebase. This was my first Firebase project, and I figured it was a good fit since the requirements are quite standard (it needs a simple authentication system and a basic way for each user to store and retrieve a small amount of data).

The app is a Progressive Web App, allowing me to install it on the home screen of my phone.

# Results

You can try it at [rolodex.breq.dev](https://rolodex.breq.dev/)! At the time of writing, we have 5 total users, including myself! Personally I have more than a dozen contacts saved already, and am constantly adding more. I've already found it quite useful, and am looking forward to using it more as more of my friends get licensed and have callsigns issued to them.
