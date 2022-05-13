---
title: Dynamic Music
description: Navigate and manipulate a virtual environment of sound sources.
image: dynamic-music.png
created: "2021"
repo: Breq16/dynamic-music
demo: https://music.breq.dev/
tags: [javascript, three, music]
---

![](dynamic-music.png)

<Caption>A screenshot of the environment.</Caption>

# Overview

This project is a virtual environment containing several sound sources, represented as spheres. The listener, represented with a cone, can navigate around the environment to hear different combinations of the sources. Additionally, they can move the sources around within the environment.

# Motivation

I was inspired by the way it feels to work with music in a DAW: almost like exploring some sort of space. I decided to create a virtual space which replicated that feeling, allowing anyone to play with the mixing of a song. I also made this out of a desire to work with [Three.js](https://threejs.org/).

# Technical Description

The app is written in vanilla JS using [Vite](https://vitejs.dev/) for build tooling. Each audio track was a `wav` file exported from an Ableton Live set. I decided to take an object-oriented approach to the code layout, representing each sound object with an ES5 class.

# Results

Aside from a, uh, [learning moment](https://twitter.com/threejs/status/1484518641098014722) causing some issues with the audio panning, most of the project was straightforward. In the end, I think I succeeded at creating the environment I set out to create, although a bit more variety in the sound sources (perhaps multiple sections of the piece which could be alternated between?) might have helped the experience not bore the listener as quickly.
