---
title: My Home Network Lab Notebook
description: Notes from setting up my homelab.
tags: [networking, ipv6, web]
---

Some of you might know that [Ava](https://avasilver.dev/) and I recently moved to our new home in Somerville! As part of this, I finally got the space to start having fun in building a home network setup.

While the setup is pretty tame for now (and Ava has specifically banned me from purchasing any rackmount gear -- alas...), I hope to keep this post updated with notes I have as I work to build more.

# Core Equipment

## Modem

We get internet through a cable provider, so the network starts with a modem. I picked a basic Arris SURFboard with DOCSIS 3.2 support since I wanted the flexibility to configure or upgrade a router down the line.

This modem operates a little strangely: it gives itself `192.168.100.1`, hands out `192.168.100.10` to the first device it sees on DHCP, then also forwards along the assigned public IP address to the connected device.

## Router and Switching

My router is a small Netgate box running pfSense that was gifted to me by my friend [Ari](https://adryd.com/). It has two LAN ports (presumably for a DMZ subnet), but I only use one.

While waiting for this router to arrive, I got a cheap gl.inet travel router to use in the interim. I keep this one around for any networking shenanigans that might require it.

I have two Netgear switches I picked up at MIT Swapfest a while ago: one sits near the rest of the equipment on my shelf, and the other sits on my desk to connect to my desktop and oscilloscope.

## Wi-Fi

After dealing with tons of Wi-Fi dropouts in our old apartment, I decided to invest in a Ubiquiti U6 Mesh access point. It's definitely overkill, but we get exceptional connection to anywhere in the apartment.

While it's theoretically possible to set up the device without a UniFi Controller, I couldn't figure out how to do so (the app kept crashing when I tried to go through the flow). So, I just installed the UniFi server software onto my desktop and ran it so I could configure the device, then closed out of it. While the software allows creating any number of separate SSIDs, we couldn't think of a good use for this. (Maybe we'll think of one later?)

# Layer 3

Our IPv4 subnet runs on `10.0.0.0/24`, mostly since it makes it possible to use [shorthands](https://en.wikipedia.org/wiki/IPv4#Address_representations) like `10.2` instead of `10.0.0.2`.

Our also ISP provides us IPv6 - yay!

I use pfSense's Dynamic DNS tools to point `home.breq.dev` at our IPv4 address. I couldn't get this to work for IPv6 (the router would use its own address, where I wanted to direct traffic to another point on the network). So I put our IPv6 prefix directly into the DNS dialog on Cloudflare and hoped for the best.

## IPv6 Addressing

Getting the "suffix" of my IPv6 address to remain static ended up being a hassle -- I wanted my computer to continue to respect the prefix it was given, but to keep the same suffix part instead of randomly generating it.

I found [`ip token`](https://man7.org/linux/man-pages/man8/ip-token.8.html) to solve this problem.

To try things out, I ran:

```bash
# Accept Router Advertisements to configure the network prefix
sudo sysctl -w net.ipv6.conf.enp37s0.accept_ra=1
# Set an IP token identifier (::bc for my initials)
sudo ip token set ::bc dev enp37s0
```

Then, to make it persistent:

```bash
# add net.ipv6.conf.all.accept_ra=1 in the ipv6 section
sudo nano /etc/sysctl.conf

# NetworkManager equivalent of the ip command
# My wired network is called "Ethernet",
# or by default it's something like "Wired Connection 1"
sudo nmcli connection modify Ethernet ipv6.addr-gen-mode eui64
sudo nmcli connection modify Ethernet ipv6.token ::bc
```

## Split DNS

For IPv4, since we do NAT, I needed to use Split DNS to make sure services were available both on and off the network. (And since the DNS resolver built into pfSense was synthesizing records for these addresses, I also needed to have it synthesize `AAAA` records accordingly too.)

# Services

We've got a few services hosted here, with more potentially to come:

- [home.breq.dev](https://home.breq.dev/), largely just a landing page for now hosted with Caddy from my desktop
- a Nextcloud instance with our home files
- the [LED matrix](/projects/wallmatrix), running through a Cloudflare Tunnel for now

In the future, I'd love to also spin up

- a "home node" for syncing my files with Syncthing
- a permanent place for the UniFi controller software other than my Ubuntu desktop
- a VPN host, for remote maintenance, getting around firewalls, and maybe hooking up my friends' networks and mine to make a mega home network

Eventually, I'd love to have a dedicated server for lots of these things (Nextcloud, Syncthing, etc) and maybe a reverse proxy to point to other devices on the network? It's not a huge priority, but maybe after I upgrade my desktop machine I'll be able to scrounge together some hardware.
