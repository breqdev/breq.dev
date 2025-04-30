---
layout: project
title: Mini-Rack Homelab
description: A 10" rack system for network equipment and experimentation.
image: minirack/rack.jpg
created: 2025
tags: [networking, hardware]
writeup: 2025-04-29
---

![](minirack/rack.jpg)

I recently reorganized all of my home networking hardware into a 10" rack that sits in an IKEA KALLAX shelf next to my desk.

# Why Mini-Rack?

I was motivated to take this project on by Jeff Geerling's [Project Mini Rack](https://mini-rack.jeffgeerling.com/) website, which collects links to hardware and guides for rackmount builds in the 10" form factor. I've wanted to build out a rackmount system for ages, partly because I want a rigid frame for my networking hardware (as opposed to a loose collection of boxes sitting atop a shelf), and partly because I love the aesthetics of rackmount gear. While I could undoubtedly achieve the same goals in this project without using a rack at much less cost, I've wanted to play with something in the rackmount form factor for _years_. I had largely written it off as impractical given the small size of the apartment, but the proliferation of 10" gear has made it possible to set up a compact rackmount homelab system.

# Goals and Improvements

My existing home network setup is designed for a small apartment which I share with my girlfriend [Ava](https://avasilver.dev/). We get internet service from a cable connection (no fiber here unfortunately), and we bought a basic Arris SURFboard modem. From here, we use a Netgate pfSense router gifted by my other girlfriend [Ari](https://adryd.com/), which also runs a site-to-site Wireguard VPN connecting to her home network. The router connects to a Ubiquiti U6 Mesh access point which both provides our personal Wi-Fi network and functions as a working [eduroam](https://eduroam.org/) service provider with client isolation (the details of which will remain a mystery).

The wired side of the network runs through a Netgear GS105 switch which I got at [MIT Swapfest](https://w1mx.mit.edu/flea-at-mit/) for five bucks. (My switch was actually, unbeknownst to me, featured on my friend [Hunter's blog](https://pixilic.com/devices-of-all-time) last year.) From here, wired connections run to my desktop and Ava's desktop.

My primary goal for this project was to reduce the clutter on my shelf and replace it with something that looked cool. I also wanted to finally have a good way to self-host things again. While I'm happy to keep most services hosted online, it would be nice to have some services running locally where convenient.

# Networking Setup

![](minirack/empty-rack-on-shelf.jpg)

I chose a [RackMate T0](https://deskpi.com/products/deskpi-rackmate-t1-rackmount-10-inch-4u-server-cabinet-for-network-servers-audio-and-video-equipment) case, since it would fit within a single shelf of the IKEA KALLAX next to my desk (and because the next size up was 8U and I doubted I would have enough hardware to justify that). The case arrived with a broken top acrylic panel, but the folks at GeeekPi (DeskPi) shipped me a replacement quickly without any hassle! In the meantime, I got to start building out the rest of the rack.

No rack is complete without a patch panel, and mine needed some way to pass cables through from the front-mounted Ethernet ports on my router and network switch. I chose a [12-port model from DeskPi](https://deskpi.com/products/deskpi-rackmate-accessory-10-inch-network-switch), designed for the rack I used. This provides more ports than I need for my modem connection, access point, and for our desktops, but the Ethernet ports can be swapped for any keystone block in case I want to use them for any other purpose.

One problem I wanted to solve with this design was the bundle of power bricks tangled up behind my shelf. I saw the [DeskPi PDU Lite](https://deskpi.com/products/deskpi-dc-pdu-lite-7-ch-0-5u-for-deskpi-rackmate-t1?_pos=1&_sid=782266501&_ss=r) available, and decided to use it in combination with a 12V 8A power supply to power devices in the rack. Right now, it powers my modem, router, and GS105 switch, but there are 4 additional channels which could be used for an SBC, hard drive mount, etc.

![](minirack/rack-v1.jpg)

# Proxmox

After using the rack for some time, I finally broke down and spent the money on an actual server. I went with a refurbished Lenovo ThinkCentre M710q that I bought for around $75, since it had relatively modern hardware, would fit within a 10" 1U shelf, and uses relatively low power.

![](minirack/grapefruit.jpg)

A few friends recommended I try [Proxmox](https://www.proxmox.com/) for this project, so I decided to give it a try! It supports full VMs as well as containers, which is nice. Previously I've relied on solutions like Dokku which only support container-level virtualization.

## UniFi Network Controller

Shortly after I moved, I [invested in a Ubiquiti access point](/2024/10/22/home-network) for the new apartment, and I absolutely do not regret my decision. However, this AP has one minor annoyance for home use compared to a traditional residential access point. Instead of being configured via a web UI running locally on the device, Ubiquiti APs are configured by a central server. This approach is great for managing a large deployment of access points but slightly annoying for a home setup.

![](minirack/unifi.png)

However, there's an upside: Ubiquiti's controller software can be [self-hosted rather easily](https://help.ui.com/hc/en-us/articles/220066768-Updating-and-Installing-Self-Hosted-UniFi-Network-Servers-Linux)! I decided to do this first, and after spending 5 minutes trying to find where to install container templates from, I got the Unifi controller running on an Ubuntu container. After [exporting and importing](https://help.ui.com/hc/en-us/articles/360008976393-Backups-and-Migration-in-UniFi) my config to transfer it to the new controller, I can finally manage access point settings without needing to boot my desktop!

## HomeAssistant

Ava is a big fan of smart home devices, so we've ended up with a dozen smart light bulbs in the apartment. While running these through Google Home works great for basic usage, the lack of an extensible API is something we've missed dearly. Our home has already started to collect [weird and wonderful homemade devices](/projects/matrix2), and an open platform would give us much greater opportunity for fun shenanigans.

![](minirack/homeassistant.png)

On the recommendation of a friend, we're trying out [HomeAssistant](https://www.home-assistant.io/) to run our devices. Most of our devices are based on the [Matter](https://www.home-assistant.io/integrations/matter/) standard, which should (in theory) enable fully local control. The process of importing Matter devices went pretty smoothly, although we needed to tediously rename each device we added. We do have a few weird bulbs we bought to fit in an IKEA fixture that used the Tuya app, but HomeAssistant had an integration for those as well which seems to work perfectly.

## Reverse Proxy

With all of these services on the same box, I'll definitely need to set up a reverse proxy for these services. My go-to for this is usually [nginx](https://nginx.org/), but I decided to try [Caddy](https://caddyserver.com/) instead to avoid the hassle of setting up HTTPS certificates. While I did find it more annoying to debug, adding new hosts and proxying new services is turning out to be a breeze so far!

![](minirack/proxy.png)

The reverse proxy also serves a basic static site, mostly as an excuse for me to make a cute drawing of the rack and my desktop.

## Syncthing

For my "hot workspace" of files (documents, code, etc), I like to store things in [Syncthing](https://syncthing.net/) so they're available on each of my devices. It's the best cross-platform tool for file sync that I've found, and is really easy to self-host!

![](minirack/syncthing.png)

I created a container and followed the Syncthing setup steps for Ubuntu. The only snag I hit was that I couldn't remotely login to set up the GUI from a different device. Turns out the approach is to edit the config to replace `127.0.0.1` with `0.0.0.0`, which is pretty straightforward:

```
nano /root/.local/state/syncthing/config.xml
```

The documentation for [setting it up to run with systemd](https://docs.syncthing.net/v1.0.0/users/autostart.html#linux) also worked perfectly.

## NAS

I tend to keep only actively used files on Syncthing since my devices are constantly running out of storage space. For long term storage, Ava and I used to use NextCloud, but found it annoying to keep it running and stable. Thus, we switched to a basic Samba and WebDAV share for this.

While I don't immediately have hard drives ready to add, I was able to get started by just setting up a container and using a folder on its root volume. Installing Samba was straightforward. I do eventually want to install WebDAV as well, but that will have to wait for another time (I've been sitting on this blog post for far too long!)

## OctoPrint

[OctoPrint](https://octoprint.org/) is a server for managing a 3D printer remotely. I recently dusted off my old Ender 3 Pro and started [making stuff with it again](/projects/matrix2), and now that I've graduated and work a normal work schedule, I have fewer opportunities to check on a print throughout the day.

![](minirack/octoprint.png)

I decided to use the popular [octoprint_deploy](https://github.com/paukstelis/octoprint_deploy) for installation. Since the README warns against trying to deploy in an LXC container, I made this host a full Ubuntu Server VM. I was able to pass through the USB device easily by its vendor and product ID, and everything worked on the first try! I don't have a USB camera for remotely monitoring yet, but I might decide to add one if I find this useful.

## General purpose Ubuntu and Windows servers

I find myself occasionally booting into Windows 11 for things, most recently for uploading a codeplug to my OpenGD77 radio. Since I almost never use this partition otherwise (the video games I play all support Linux at this point), I really only need a basic Windows 11 box with USB passthrough support. I got the idea for this from my girlfriend [Ari](https://adryd.com/) who uses a Windows VM for similar purposes. I also set up an Ubuntu desktop machine at the same time, mostly because it was easy to do so.

# Results and Conclusions

First off, I would like to think Ava for putting up with me occasionally disrupting our home internet to perform upgrades or maintenance. Thanks also to [Ari](https://adryd.com/), [Hunter](https://pixilic.com/) and [Tris](https://tris.fyi/) for helping me troubleshoot on the countless occasions I accidentally shot myself in the foot with Proxmox. This project veered farther into the realm of networking and system administration than I ever had before, and I couldn't have done it without help.

Taken as a whole, this is probably one of my more practical projects as of late: I'm finally able to clean up my convoluted file sync situation, I've gained the ability to remotely manage stuff on my home network, and I've already enabled a few helpful automations with HomeAssistant.
