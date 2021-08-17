---
layout: project
title: Vibrance
subtitle: Vibrance synchronizes computers and smartphones to display configurable animations and effects.
image: "../images/pansexual.png"
video: /videos/vibrance.480p.webm
created: "2020"
repo: Breq16/vibrance
---

<YouTube id="uvB-t6f3MoE" />

<Caption>
Music in the video is made by my sibling, <a href="https://www.maxmichaelmusic.com/">Max Michael</a>.
</Caption>

# Overview

Vibrance is a tool to use a large number of computers or smartphones as a single output to create lighting effects. By setting the color on each screen in unison, colorful and interesting visual effects can be created. Vibrance also handles generating these effects based on some input, such as a Digital Audio Workstation, keyboard input, or custom-made lighting controller.

# Motivation

I remember seeing a video of a Coldplay concert in which every audience member had an LED wristband which would light up in sync with the music. It seemed like a cool way to involve the audience in a concert.

I wanted to make a light show like the Coldplay concert that would cost almost nothing. No big screen, no manufacturing hundreds of bracelets, just everyone's personal devices and some controller software.

# Technical Description

The Vibrance system has three main parts: the *controller*, the *relay*, and the *clients*. Working backwards from the clients:

<img className="mx-auto" src="/diagrams/vibrance_simple.svg" />

## Clients

The client code is a simple JavaScript app that runs on audience members' phones or computers. It receives messages from the relay and changes the color displayed on the user's screen accordingly. These messages are JSON objects, which allows for a variety of extensions to be added. For instance, it is possible to direct a client to display certain text on its screen (song lyrics, a welcome message, etc). Because this code runs in JavaScript, and the messages require very low latency, I chose the WebSocket protocol.

## Relay

Most of the time, both the client devices and the controller will be connected to a public WiFi network or a cell network, and thus be hidden behind NAT. So, an intermediate server with a public IP address is required to facilitate the connection. The Relay fills this role.

Because it would be impractical for the controller to calculate separate colors for hundreds of clients, the clients are divided into zones. Client devices will indicate their zone to the relay (typically after prompting the user to choose which part of the room they are in). Messages sent to the relay by the controller are marked with their destination zone.

Upon receiving a message from the controller, the relay simply forwards it along to each device in its intended zone. In the background, the relay manages newly-connected clients, ensures connections are kept alive, and removes inactive clients.

## Controller

The controller is the most complicated part of the pipeline. It is responsible for handling input from some device (through a *driver*), determining the color messages to send to the relay (using an *interface* and *script*), and sending these messages to the relay.

### Driver

The role of the Driver is to read input from some source and return it in a common format. Drivers can use a variety of inputs, such as MIDI ports, computer keyboards, and serial ports (e.g. for use with Arduino).

Virtual MIDI ports in particular are quite useful for reading input from a Digital Audio Workstation such as Ableton Live. By placing MIDI notes at certain points in the song, lighting effects can automatically be triggered.

Users can implement their own Drivers to use different controller devices (joysticks, Wii remotes, devices over the network, etc.)

### Interface and Scripts

Users supply Scripts (written in Python) that describe how to translate inputs from Drivers into messages to send to the Relay. These scripts use an Interface to manage the drivers and relay connection. The Interface allows Vibrance to recover gracefully from a temporary connection failure, and it allows users to change the connected Driver and Relay at any time.

For example, here is an example script that flashes zones 1 and 2, with a 1 second delay in between, whenever MIDI note 60 is received:

```python
@api.on("midi", "note_on_60")
def animation(event):
    api.color(1, "FFF")
    api.color((2, 3, 4), "000")
    api.wait(1)
    api.color(2, "FFF")
    api.color((1, 3, 4), "000")
```

A variety of example scripts are provided by Vibrance.

## Block Diagram


<img src="/diagrams/vibrance.svg" />

# Results

I don't think I'll have an opportunity to test Vibrance in the real world any time soon, because of the COVID-19 pandemic. However, I have tested it with multiple devices and with hundreds of simulated clients at my house.

I started this project a few weeks (!) before the stay-at-home orders started, and I had initially planned on trying it at the next opportunity my brother had to perform his music. As an alternative, in the video I filmed demonstrating Vibrance, I emulated his Ableton Live setup as closely as possible.
