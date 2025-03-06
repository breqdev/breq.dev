---
title: Codeplug
description: Automatically generate radio configurations from a crowdsourced list of repeaters and channels.
image: codeplug.png
created: 2024
repo: breqdev/codeplug
tags: [radio, python, cli]
writeup: 2024-06-13
---

![](codeplug.png)

<Caption>The codeplug generation tool in action.</Caption>

# Overview

Codeplug is a tool to automatically generate a configuration file (or colloquially, a "codeplug") for a handheld amateur radio.

The tool prompts users to select their geographic regions of interest and to choose which common simplex channels on amateur and other bands to include (such as calling frequencies, FRS channels, etc.), and builds a `.csv` file containing those channels and channels for radio repeaters in their selected regions.

# Motivation

Many of my friends are licensed amateur radio operators, and when we travel together, we often exchange notes on which repeaters to program into our radios. However, as I've made more extensive use of my radio, my previous strategy of including every repeater I can think of in my codeplug has caused me to hit the channel limit.

[Ari](https://adryd.com/) and I had the idea for a program which can automatically generate a suitable codeplug based on a subset of regions, channels, etc., allowing us to easily program in relevant channels to our radio based on our current interests, upcoming trips, and more.

# Technical Description

The tool is a CLI app built with [Inquirer](https://python-inquirer.readthedocs.io/en/latest/index.html) for Python. It loads repeater and channel definitions from `.yaml` and `.csv` files, and assembles a `.csv` which can be imported into [CHIRP](https://chirpmyradio.com/projects/chirp/wiki/Home), a common tool for editing and uploading these configs.

# Results

Instead of continuing to maintain my codeplug [by hand](https://github.com/breqdev/chirp), I'll be using and improving this tool going forward. A few of my friends have already offered to contribute repeater information to it, and I'm planning on extending it to include [AAR channels](https://www.on-track-on-line.com/scanner-radio.shtml) by region as well.
