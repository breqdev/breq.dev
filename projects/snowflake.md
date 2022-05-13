---
layout: project
title: Snowflake
description: A scalable service to generate time-ordered, unique ID numbers.
image: default.png
created: "2020"
repo: Breq16/snowflake
demo: /apps/snowflake.html
tags: [python, redis]
---

# Overview

This is a service to generate Snowflake IDs. These are unique, time-ordered IDs, useful for things like instant messages or posts.

# Motivation

I wanted to get more experience working with the [12 Factor App](https://12factor.net/) model. Implementing a basic service like this seemed like the easiest way to go about it. I also figured this kind of service could be useful for me at some point.

# Technical Description

The "Snowflake" ID format was designed at Twitter for identifying tweets, so its scalability is its main selling point. Each Snowflake is a 64-bit integer composed of a timestamp in milliseconds (42 bits), worker ID (10 bits), and increment (12 bits).

The format can support 1024 possible worker IDs -- too many to hardcode by hand, but too few to assign randomly. So, I made a second app, "SnowCloud," that handles the assignment of these worker IDs to the Snowflake server instances. When a Snowflake server comes online, it will request a worker ID from a SnowCloud server. Then, it will periodically renew the worker ID with the SnowCloud server. The pool of worker IDs are stored as a Redis set, sorted by how recently each was used. In addition, each Snowflake server is identified by a UUID, and these UUIDs are tracked to ensure Snowflake servers can only renew their own assignments. (For reference, the SnowCloud repo is at, predictably, [Breq16/snowcloud](https://github.com/Breq16/snowcloud).)

# Results

It does everything I set out to accomplish, and I got more experience developing microservices, which was cool. This was just a quick afternoon project--it was cool to go from idea to finished product in just a couple hours.
