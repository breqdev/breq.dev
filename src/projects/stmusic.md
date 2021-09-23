---
layout: project
title: STMusic
subtitle: A Guitar-Hero-style game built for the ST Discovery board.
image: "../images/default.png"
video: /videos/music-game.480p.webm
created: "2020"
repo: Breq16/STMusic
---

<div class="max-w-2xl mx-auto bg-red-100 rounded-xl my-4 p-2">
    Note that unlike other projects on this site, I wrote this for a homework assignment. That being said, adding in the speaker and music were things I did because I wanted to have fun, not to meet the assignment requirements.
</div>


<YouTube id="_AXSp7ZT-E8" />

<Caption>
Here's a video I recorded demonstrating the game.
</Caption>

# Overview

This game is similar to Guitar Hero or other rhythm-based games. The player should push the "USER" button whenever one of the scrolling indicators reaches the left of the screen. This was the first major project I made using C. The biggest challenge in this project was figuring out how to store and generate the sounds that made up each song.

# Motivation

This was a homework assignment in my Computer Organization class to help us learn how to use bitwise operations to display a game on the ST Discovery's LCD. I chose to add sound functionality mostly because I thought it would be an interesting challenge, I was interested in how basic microcontrollers generate different sounds, and I figured a silent game would be rather boring.

# Technical Description

## Sound Generation

The STM32 microcontroller this project used doesn't have any purpose-built hardware for generating sounds (that I'm aware of). So, the solution I settled on was to manually generate a square wave by setting a GPIO pin high, waiting for half the length of the waveform, setting it low, and waiting for the rest of the waveform.

The biggest hurdle with this approach was accurate timing. The STM32 can use interrupts to delay for a precise number of milliseconds, but generating square waves at specific frequencies requires sub-millisecond precision. The solution I came up with was to calibrate a busy-wait loop when the code begins using the millisecond timer, then use that busy-wait loop for sub-millisecond-precision delays.

This yielded a decent-sounding square wave, but the game audio still felt incomplete.

I attempted to play multiple notes at once by summing the square waves, but the result did not sound very good. Additionally, the timing code required to play two separate frequencies at once quickly became complicated. Perhaps I could have used two separate GPIO pins and a voltage divider to effectively increase the bit depth (allowing for 4 separate voltage levels to be sent to the speaker).

Instead of attempting that, I decided to try adding drum sounds. By playing each drum sound and then quickly switching to playing the melodic note, the device can give the illusion that both sounds are playing at once. This didn't work out as well as I had hoped, but it sounded okay at least.

For the kick drum, I borrowed a [trick](https://www.youtube.com/watch?v=Jd6nyynuzio) used frequently by composers for the NES: By doing a rapid downward pitch bend in between melodic sections, it's possible to fake a kick drum sound somewhat convincingly. Because I don't have the luxury of a triangle-wave channel, this doesn't sound as good in my project as it does in NES games, but the trick still works.

For the snare drum, I decided to just use a burst of white noise. But as the STM32 doesn't have any built-in random number generation, I had to choose a pseudorandom algorithm to implement.

At first, I tried to use a Linear Congruential Generator, because it seemed easier to implement. However, with the parameters I chose, the period was small enough that I could hear a distinct tone in the output. I could have probably eliminated this by choosing better parameters, but I didn't want to spent a bunch of time tuning the parameters.

I then looked into using a Mersenne Twister, because it seemed like a popular choice. I ultimately decided it against it as it seemed hard to implement. I also worried that it might be too slow, considering I'd want to be sending bits to the GPIO pin as fast as possible to ensure the snare sound had enough high-end frequencies.

Finally, I settled on XorShift, which was fast and had a basic implementation.

## Data Packing

After figuring out how to synthesize the song, I needed to figure out how to store it. The trial version of CrossWorks Studio that I was using restricted me to a 16kB code size. I initially wanted to include multiple long songs (although I later scrapped this due to time constraints), so I needed to find an efficient way to store each note, drum, and indicator on the screen.

I decided early on to try to fit the information for each beat into a small integer and store these integers in an array. I looked into what information I would need to store:
* Note pitch (7 bits when stored as MIDI note number)
* Drum sound (2 bits - kick, drum, or neither)
* Indicator (1 bit)

To store each note pitch, I decided to use MIDI note numbers. These only use 7 bits per note, and they can be converted to frequencies using a basic formula, so this was a much better solution than trying to store the note frequency or wavelength.

10 bits is kind of an odd size, so I tried to figure out what else I could include to use all bits in a 16 bit integer. The first thing I added was duty cycle controls. The original NES had 3 duty cycle settings, and composers could create interesting [effects](https://www.youtube.com/watch?v=kl9v8gtYRZ4) by switching between them. I decided to add 4 duty cycle settings to this project, although they didn't sound as different as I had hoped (likely due to the poor quality speaker I used). This brought the total up to 12 bits.

Finally, I came up with the idea of including a "message length" field which would specify how many beats after this one were to be held out. This could drastically compress the resulting array by removing duplicate entries. I made this 4 bits long, allowing for up to 16-beat messages.

Here's the spreadsheet I built to pack these messages together for me. On the left, you can set the parameters of each note: is a marker shown on the display? what specific note is played? for how long? is there a drum sound? etc. On the right is each section packed into a single 16-bit integer. An array of these integers can be included with the game code to play back the song. By switching the tab at the bottom, you can see both of the songs I included with the game.

<iframe className="w-full h-96" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQ2jTL6TOiYkK7ZLyM8OinKNpnfOwafpIabo_0DhFtii-M3KLkS-VDod56g5RjTcI22kW2fR8Yx7kno/pubhtml?widget=true&amp;headers=false"></iframe>

# Results

I had fun working on this, and I learned a lot about programming for embedded systems. The results didn't sound spectacular, but they still enhanced the final game in my opinion.
