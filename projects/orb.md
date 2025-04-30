---
layout: project
title: orb.breq.dev
description: Web-based control of my desk light using HomeAssistant
image: orb.breq.dev/ui.png
repo: breqdev/orb.breq.dev
demo: https://orb.breq.dev/
created: 2025
tags: [home automation, python]
writeup: 2025-04-29
---

![](orb.breq.dev/fado.jpg)

Sitting right next to my desk as I type this is an [IKEA FADO](https://www.ikea.com/us/en/p/fado-table-lamp-white-70096377/) lamp fitted with an RGBW LED bulb. Among friends, it's become affectionately known as "the orb" due to its unique shape.

# Implementation

This project uses quite a few moving parts to pipe lighting data through from the user's browser into a smart light bulb. I'll trace the flow through each of these components.

The user chooses a color through a basic web UI written in vanilla HTML, CSS, and JS. There's a sketch of the orb that I made in [Inkscape](https://inkscape.org/) to provide a preview.

![](orb.breq.dev/ui.png)

The UI makes calls to a [Flask](https://flask.palletsprojects.com/en/stable/)-based backend, which turns around and calls HomeAssistant. This layer exists only to allow unauthenticated users to call these two specific methods on the HomeAssistant API (since the Flask app keeps a bearer token around). I deployed this on [Dokku](https://dokku.com/), which is a stack [I've developed a strong familiarity with](/2021/02/10/dokku).

While I initially tried to make this project work with Google Home, I couldn't find an API that would allow me to invoke commands programmatically. Ava and I had been looking for an excuse to migrate to HomeAssistant for a while, and this was it! We found the setup process to be quite straightforward: most of our smart devices are Matter bulbs, which could easily be added to both Google Home and HomeAssistant.

![](orb.breq.dev/homeassistant.png)

HomeAssistant gives each entity an "Entity ID", which makes programming easy. The orb light is just `lights.orb`! While finding the right documentation was a bit difficult, invoking actions on entities through the REST API was overall easy and straightforward.

We've deployed HomeAssistant to a Proxmox server running in [our home mini-rack](/projects/minirack). Since our HomeAssistant instance is publicly routable at `homeassistant.home.breq.dev`, no special considerations were needed for piping together the Flask app deployed in the cloud with HomeAssistant running in our home network.

# Results

In and of itself, the orb demo isn't that interesting, especially because you need to actually be in front of the light to see it working (and if you're already physically in my apartment, you can just use the Google Home to set the light). That said, it's a fun party trick, and I enjoyed finally being able to interact with my smart home devices easily from code! I'm definitely looking forward to doing more smart home projects in the future.
