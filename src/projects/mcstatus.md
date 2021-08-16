---
layout: project
title: McStatus.js
subtitle: A JavaScript library to embed information about a Minecraft server into a website.
image: "../images/logo/minecraft.jpg"
created: "2020"
repo: Breq16/mcstatus
demo: /apps/mcstatus/
---

<link rel="stylesheet" href="/assets/css/mcstatus.css" />
<script type="text/javascript" src="https://github.breq.dev/mcstatus/mcstatus.js"></script>

## Overview

McStatus.js is a JavaScript library and API backend to embed a Minecraft server status readout.

## Demo

Here are a few popular Minecraft servers (Hypixel and Mineplex):

<div class="mc-status" data-mc-server="mc.hypixel.net"></div>

<div class="mc-status" data-mc-server="us.mineplex.com"></div>

One that I run (you might see me or some of my friends on here):

<div class="mc-status" data-mc-server="breq.dev"></div>

One that doesn't exist (so you can see how a failed connection)

<div class="mc-status" data-mc-server="not-a-real-server.example.com"></div>

## Motivation

I wanted to be able to check who was online on my Minecraft server without having to join. I also wanted a project where I could improve my understanding of JavaScript, the DOM, and web technologies in general.

## Technical Details

`mcstatus.js` loads a div complete with Minecraft server information into the DOM wherever it finds a `<div class="mc-status">`, using the `data-mc-server` attr to set the server IP. The status protocol for Minecraft servers uses raw TCP sockets, so a pure-JS server query-er isn't possible. There are a lot of existing Minecraft server status tools, like [mcsrvstat.us](https://api.mcsrvstat.us/){:target="_blank"}, but they don't have a CORS header set, so they couldn't be used from JavaScript. So, I implemented my own at `https://mcstatus.breq.dev/` with the bare minimum API for this project to work. I'm using Dinnerbone's [Server Pinger](https://github.com/Dinnerbone/mcstatus){:target="_blank"} under the hood for this.

## Results

It pretty much does everything I wanted it to do, and working on the project definitely gave me a better understanding of how to style websites using CSS. I didn't really end up using the CSS/JS part for anything, but I did use the server component for [Breqbot]({% link _projects/breqbot.md %}){:target="_blank"}'s Minecraft server functionality.
