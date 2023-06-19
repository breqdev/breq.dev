---
layout: project
title: Wall Matrix
description: A small, flashy display I made to hang on the wall.
image: default.png
video: matrix.480p.webm
created: "2021"
repo: breqdev/wallmatrix
demo: https://matrix.breq.dev/
tags: [python, hardware]
writeup: 2021-08-26
---

<YouTube id="o5zavmZU38s" />

<Caption>A video of me doing the final assembly of the display.</Caption>

# Overview

This is a sign that I built that hangs on the wall and shows information from the Internet.

# Motivation

I bought an [LED matrix panel](https://www.adafruit.com/product/420) from Adafruit years ago, and I've tried to use it to display things in the past, but I had never figured out a good way to mount it. Around the time I built this project, I had just gotten some threaded inserts for use with 3D printing, and I figured making a case for this display would be a good project to use them for.

# Technical Description

## Hardware

My 3D printer can only do up to 120mm in each dimension, so I needed to split the print up into two parts. I used threaded inserts to join these together, and I did the split slightly off-center so that the mounting hole would be stronger.

To attach the Raspberry Pi, I had hoped to screw it into the threaded inserts as well, but the RPi's mounting holes are M2.5 while the inserts I got are M3. I ended up making pegs that fit into the Pi's mounting holes, and a "seat belt" to hold the Pi against them. This solution was surprisingly sturdy.

Finally, it came time to connect the display to the Pi. While Adafruit sells a [HAT](https://www.adafruit.com/product/2345) to make the connections easy, it [doesn't use the default mapping](https://github.com/hzeller/rpi-rgb-led-matrix/blob/master/wiring.md#alternative-hardware-mappings) for the library I had planned on using. I decided to build my own on a [Perma-Proto](https://www.adafruit.com/product/2310), and to leave room in case I wanted to add other matrix strands or devices in the future.

## Software

The matrix is driven using [hzeller's rpi-rgb-led-matrix](https://github.com/hzeller/rpi-rgb-led-matrix) library. Specifically, I'm making use of the Python bindings.

The code is split into four major sections:

### The Driver

The driver exposes an interface allowing other components in the stack to send an image to the matrix. I wrote two drivers: a "real" driver that shows the image on the matrix, and a "fake" driver that draws the image in a TkInter window. This allows me to test out new sources, images, and designs on my own computer before deploying them to the Pi.

### The Server

The server is written in Flask, but I've turned off the threading abilities so that the driver can remain a singleton. (Normally, this is a bad idea, but I've decided that it's fine, since this is an embedded device anyway.) It loads in any available sources, retrieves an image from the current source, and handles incoming requests to change the active source or interrupt the source with a scrolling message.

The server and driver communicate over a message queue. The server will send a `SOURCE_CHANGED` message when the user chooses a different source, and it will send a `FLASH_MESSAGE` message when the user submits a message to show.

### The Sources

I've written four basic sources so far.

**ColorBars**: Shows the basic color bar test image on the screen.

![](wallmatrix/weather.jpg)

**Weather**: Shows the current time, temperature, and weather on the screen, using the OpenWeatherMap API.

![](wallmatrix/crypto.jpg)

**Crypto**: Shows the current price and 24-hour percent change of a cryptocurrency (defaults to ETH), using the CoinMarketCap API.

![](wallmatrix/mbta.jpg)

**MBTA**: Shows the next northbound Green Line and Orange Line trains passing through the Northeastern University campus, using the MBTA's official API.

These sources inherit from a base `Source` class, which has some data caching logic built in. By default, APIs are only called once every 60 seconds, but the Crypto source caches data for 5 minutes due to the more restrictive API license.

### The Client

![](wallmatrix/client.png)

The client is written in static HTML/CSS/JS. It features a dropdown menu to change the source and a textbox to input messages to flash. I designed it to be usable on a phone, since I figured that's how most people would like to control the sign.

# Results

The finished result looks a lot more polished than I was expecting! I had a lot of bugs to work out at first -- it turns out there are a lot more edge cases than I thought there would be when it comes to displaying time -- but it's been quite reliable.
