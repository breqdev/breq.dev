---
title: eightyeightthirty.one
description: A snapshot of the social graph of 88x31 badges.
image: eightyeightthirtyone/88x31.png
created: 2023
repo: NotNite/eightyeightthirtyone
demo: https://eightyeightthirty.one/
tags: [javascript, 88x31, web, redis, rust]
writeup: 2023-12-26
---

![](eightyeightthirtyone/graph.png)

<Caption>The entire mapped network of 16,000+ pages, as of 2023-12-26.</Caption>

This project was a joint effort by myself and a few friends:

<div className="flex justify-center" style={{imageRendering: "pixelated"}}>
<div className="flex flex-row border-2 border-black dark:border-white p-4 gap-4 rounded-lg">
  <a href="https://notnite.com/"><img src="/badges/notnite.png" /></a>
  <a href="https://adryd.com/"><img src="/badges/adryd.png" /></a>
  <a href="https://breq.dev/"><img src="/badges/breq.png" /></a>
</div>
</div>

# Overview

88x31 buttons are everywhere on the indie web -- they're those tiny buttons on the homepage or footer of sites like mine which link to friends, projects, etc. They've been around for decades and have spread all over webpages and forum signatures. However, until now, there has been no way to view the entire network of 88x31 links all at once.

My friends and I have implemented a scraper which can crawl a page for 88x31 links, a server to manage the queue of sites to crawl, and a web frontend to visualize the graph as a whole.

# Motivation

[NotNite](https://notnite.com/) provided the initial idea and implementation, and after [adryd](https://adryd.com/) sent me a proof of concept, the three of us and some friends immediately hopped on a call to work out the details.

# Technical Description

The implementation consists of three parts: the scraper, the orchestration server, and the frontend.

## Scraper

The scraper receives a URL and is responsible for visiting the webpage to look for 88x31s which link to pages. We experimented with a webdriver-based solution (using [Puppeteer](https://pptr.dev/)), but ended up switching to static HTML parsing for performance, making the tradeoff that the scraper can't read client-side-rendered pages.

The scraper is also responsible for noting any redirects that happen, and for trying to identify canonical URLs for pages, just as a traditional search engine crawler would need to.

The scraper is written in Rust and keeps no state, so it can be scaled up horizontally as needed.

## Orchestration Server

To coordinate the scrapers and provide access control, an orchestration server is used. This server also accepts URLs into the network (adding them to the queue) and produces the graph file.

The orchestration server is backed by a Redis database -- this was chosen to ensure the queue was stored in memory.

The orchestration server also handles inserting found links into the queue, and correcting records after a redirect is found -- both complex processes to handle edge cases that arise when webmasters change things about their site.

## Frontend

The frontend is used to display the graph to the user and allow them to navigate it efficiently. It has some functionality for zooming to a particular node and highlighting its links, and it can show the badge images used to link from one site to another.

We struggled to choose an effective graph library implementation which could render this many nodes on the screen, but eventually settled on [Cosmograph](https://cosmograph.app/) as it blew everything else out of the water in terms of performance. The end result still takes time to load the initial graph but feels relatively snappy to navigate even on mobile devices.

# Results

The result is a map of over 16,000 pages, either linking to or linked from another using 88x31s.

One thing that we didn't expect to happen was webmasters noticing our user-agent in their access logs and inquiring about our work. Apparently folks aren't used to scrapers which specifically target 88x31 images! It was very cool to get to explain this project to those who asked about it, and we made sure to clearly identify ourselves and provide opt-out instructions in case any operators disagreed with our mission.

I also got to finally use everything I learned in a network science course last year to [analyze our resulting data](/2023/12/26/88x31-science), which was quite fun. TL;DR: our dataset of 88x31 links is similar to other social networks which have been studied in the field!
