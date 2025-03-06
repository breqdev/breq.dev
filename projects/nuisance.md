---
title: Nuisance
description: Northeastern University Information, Services, and Notifications Considered Essential
image: nuisance.png
created: 2021
repo: breqdev/nuisance
demo: https://nuisance.breq.dev/
tags: [react]
writeup: 2022-03-24
---

![](nuisance.png)

<Caption>The Nuisance dashboard, in light mode.</Caption>

Nuisance is a dashboard I made collecting links to Northeastern University student portals and online services.

# Motivation

Northeastern has a few different collections of links: myNortheastern, which was disorganized and shut down, and the Student Hub, which is, frankly, filled with irrelevant information and loading spinners. I wanted an unobtrusive portal that would load quickly and link to the services I found most useful.

# Technical Description

The page is built using React and Create-React-App, and styled with Tailwind. It doesn't have any notable features other than a dark mode option and a setting to choose between opening links in the current tab or a new tab. Both of these settings are persisted in `localStorage`. In hindsight, React was almost certainly not necessary, but I had experience with a component-based project structure and wanted to iterate quickly.

I picked Cloudflare Pages for hosting, to make sure the site loaded fast.

# Results

This was a lot more successful than I had thought it would be. I shared it with a few friends, and it's accumulated a fair number of users across Northeastern. In hindsight, it isn't that surprising to think that since I had a problem, others probably did too.

I didn't collect a ton of user feedback: I added GitHub links for suggestions, but only a month or so after I initially shared it. This might have led to broader adoption. They didn't take much effort to add, so in future projects, I'll make an effort to add them initially instead of waiting for popularity to come.

I also didn't have any sort of analytics configured (since I had meant for this project to just be for myself), which made it hard to measure how much traffic the dashboard was getting. In hindsight, I guess it doesn't really matter what the numbers say, though. This project made my day-to-day life a bit more smooth, and it helped out a few friends, too.
