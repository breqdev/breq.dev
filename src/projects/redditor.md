---
layout: project
title: AutoRedditor
subtitle: A service for caching and providing random Reddit posts.
image: "../images/default.png"
created: "2020"
repo: Breq16/redditor
demo: /apps/redditor.html
tags: [python, flask, reddit]
---

# Overview

This is a service to cache and retrieve Reddit posts.

# Motivation

When I started to work on [Breqbot](/projects/breqbot), I wanted to return popular posts from Reddit. However, the Reddit API doesn't provide a "random popular" function. The closest options were to retrieve either a random post, which could be low-quality, or the top posts of a certain time period, which will repeatedly return the same posts.

So, when I started to implement Breqbot's Reddit feature, I added a built-in cache feature. Every couple hours, a background process would retrieve the top 100 posts from each subreddit and cache each post ID in a database. Then, when a user requests a Reddit post, the bot will query the database for a random post.

Eventually, as my bot became more complex, I decided to try to spin off certain functionality into their own services to improve maintainability and reliability. The Reddit functionality was an easy choice -- it had its own worker processes, and its use of the database can be easily isolated. This would also allow me or others to build other services which access random Reddit posts. Thus, I spun out AutoRedditor into its own separate service.

# Technical Description

AutoRedditor is built around [Redis](https://redis.io/). The worker thread will look through the list of subreddits and configurations, then retrieve the top posts of each week from Reddit and populating the Redis database. It will also use configured filters, which could (for instance) require a certain post type or block content marked as a spoiler. The posts are stored as a sorted set, so that once new entries are added to the database, old posts can be removed.

In addition, to prevent post repetition, clients can provide a "channel" parameter with a unique identifier for where they are serving the Reddit posts. AutoRedditor will create a sorted set to cache the most recent posts sent to that channel to ensure no repetition happens.

# Results

The service works well enough that I'm using it to power Breqbot. Using an in-memory database like Redis has enabled this service to be fast enough for a real-time application like a Discord bot. Going through the process of breaking off functionality from an existing project into its own independent service was also unique and interesting.
