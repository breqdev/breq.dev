---
title: Tiny Devices I Love
description: Pocket-sized tools I greatly adore.
tags: [hardware, edc]
---

I've developed a strong appreciation for small devices that solve problems for me. While larger versions of these tools exist, there are a few reasons why these tiny tools hold a special place in my heart.

The first is that I have spent the last several years living in small dorm rooms and now live in a relatively small apartment. While I wish I had the space for a dedicated electronics workbench, the practical reality is that my tools need to fit either on my normal-sized desk or be stored away in a drawer. The second is that, both for my work with the Northeastern Mars Rover Team and for my own projects, I do occasionally end up needing to fix, debug, or bodge something together in locations which are less conducive to this type of work (such as the middle of a grassy field).

The criteria I decided on for devices in this category include:

1. The device must be "cute." More formally, this includes things that are about the size you could fit into a large pocket. It also means that the device must be smaller than most others in its class.
2. The device must be something I would carry somewhere to perform a task. While I love my tiny [Netgate 1100](https://shop.netgate.com/products/1100-pfsense) (a gift from [Ari](https://adryd.com/)), it's not something I would transport to somewhere for a temporary installation.
3. The device must be good at what it does. It must not sacrifice functionality to become its small size.

**Acknowledgements:** This post was loosely inspired by my friend Hunter's [Devices of All Time](https://pixilic.com/devices-of-all-time) post. Many of these devices were gifts from close friends!

# iFixit Moray Driver Kit

![](pocket-size/ifixit.jpg)

_Gift from [Ari](https://adryd.com/) and [Hunter](https://pixilic.com/)!_

This is a screwdriver kit including a small screwdriver and a large collection of bits. It comes in a hard plastic case, the lid of which doubles as a tray for storing screws.

I've used the Moray's older sibling, the Mako, extensively on the rover team, but haven't had my own iFixit kit until recently! I like to flip the bits I'm using for a project down to visually distinguish them from the rest and make them easier to grab.

Likes:

- Very small and cute. Easy to throw into a backpack or tool bag.
- Extremely versatile, good selection of bits. Replaces the need to carry a whole range of screwdriver sizes.
- Handle size is large enough for "big screwdriver" tasks, but small enough to allow for delicate work.
- Spots for bits are labeled with both an icon and text.

Dislikes:

- No 2.0mm hex bit. (I encounter M2.5 screws enough that I'm surprised this was omitted!)
- While additional bits are available, there aren't any additional spots in the case to hold them. (It's possible to store them within the screwdriver, but that makes them harder to access.)

# FNIRSI DPS-150 DC Power Supply

![](pocket-size/power-supply.jpg)

_Gift from [Mia](https://miakizz.quest)!_

This is a benchtop DC power supply, which is an essential tool for electronics prototyping. This type of power supply is useful as it precise voltage control and current monitoring and limiting to protect your circuit. It provides power through "banana plugs" or directly to wires via the two terminals.

Likes:

- Taking power from a USB-C port greatly reduces the size of the unit.
- Screen is quite readable and useful for precise adjustments.
- Maximums of 30 volts and 5 amps.

Dislikes:

- Display hinge struggles to hold itself up.
- Voltage/current input is a bit unintuitive.

# GL.iNet Opal (AC1200) Router

![](pocket-size/gl-inet.jpg)

![](pocket-size/gl-inet-ports.jpg)

This is a "travel router": A small, lightweight router and wireless access point powered over USB-C. This one in particular is quite cheap and actually ran my home network for a bit until I was able to set up the pfSense unit I use now. It's also saved the day at Rover events a few times when I've used it to establish a wireless network in areas otherwise slightly too far from a nearby building's coverage.

Likes:

- USB type-C power input.
- Two LAN Ethernet ports.
- Strong featureset provided by OpenWRT.
- Antennas fold in for compactness when not in use.

Dislikes:

- Runs a very old patched version of OpenWRT, not the mainline version.

# RadioShack 22-182 Digital Multimeter

![](pocket-size/multimeter.jpg)

_This was a gift from... my dad probably? I've had it as long as I can remember._

This is a multimeter: a device that measures the voltage difference between two points, the current flowing through itself, or the resistance of an electrical component. While some meters support "autoranging," this one requires that you specify the range of values you expect the quantity you measure to be in (e.g. 200V, 20V, or 2V). I honestly prefer manual ranging meters, since dialing in the voltage at the start is usually easy to do and the meter responds more quickly when it doesn't need to go through the autoranging sequence.

Likes:

- Carrying case keeps probes inside.
- No need to switch probes between sockets for current vs voltage measurement.

Dislikes:

- Current measurements limited to 200mA.
- Case is slightly too small for probes to fit comfortably.
- No beeper for continuity testing.
- Uses an uncommon 12V battery.
- Not as precise as larger meters.

# Pinecil V2

![](pocket-size/pinecil.jpg)

_Gift from [Ari](https://adryd.com/)!_

This is a soldering iron: a tool that heats its tip up to a high enough temperature to melt solder (metal) and join electrical wires. Other potential uses include pushing heat-set metal inserts into plastic parts. This is a temperature-controlled iron, which is essential to allow heating solder efficiently without damaging components from excessive heat.

Likes:

- USB-C power input.
- Readable monochrome OLED display.
- Indicators for iron cooldown.
- IMU-based standby power-off.
- Easily swappable tips.

Dislikes:

- Doesn't include a stand or case of any sort.
- Some intermittent issues with connectivity between the iron and tip.
- Two-button based interface is sometimes unintuitive to use.

# AIOC (All-in-One Cable)

![](pocket-size/aioc.jpg)

_This is from a run made by [Mia](https://miakizz.quest/), although I believe I paid her back for it? Mia if you're reading this and I owe you money, please let me know :)_

This is a device with two purposes: to upload configuration data ("codeplugs") to handheld radios, and to connect a handheld radio as a soundcard to a computer. The former use case is nice for programming radio channels as it allows configurations to be easily created and distributed. The latter use case enables computer modulation techniques such as AX.25.

Likes:

- Smaller than conventional radio programming cables.
- Alignment between 2.5mm and 3.5mm jacks is not sturdy.

Dislikes:

- Can't be used to program my Retevis RT3S.
- 3D printed case is flimsy.

# Conclusion

You'll notice I didn't put direct links to where to buy any of these (and some of them, like that Radio Shack multimeter, are likely impossible to get these days). My intent is to show how these tools fit the style of work that I do and enable me in ways traditional alternatives don't, and to maybe help you consider how the tools you use in your work shape the projects you take on and the methods you use.
