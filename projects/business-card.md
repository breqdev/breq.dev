---
layout: project
title: USB Business Card
description: A PCB business card implementing a UVC video device for games
image: default.png # TODO need image
created: 2025
# repo: breqdev/matrix2
tags: [networking, hardware]
writeup: 2025-03-06
---

- Motivation
  - Fun project!
  - I have not done firmware work in ages
  - I've loved the idea of business cards, and many of my friends have them
  - I want the joy of giving someone something that's useful in some way
- Design
  - STM32 microcontroller for simplicity -- no external flash or crystal
    - Considered a clone, but found the setup environment difficult
    - Need native USB
  - USB port built into the board!
  - Capacitive touch buttons
  - A few LEDs for fun
- Software
  - Emulates a UVC video device, to make games playable
  - Website explains assembly instructions etc
- Features
  - PICO-8 emulator???
  - Built in games?
- Extras
  - Chaining using TRS cables
    - Each board forwards its inputs to the next one in line
    - Decided against bidirectional TRRS since those cables are less common
  - STEMMA ports
  - Extra GPIO header, inspired by PocketCHIP and the Flipper Zero
  - Fun graphics!
