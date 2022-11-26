---
title: Emulation Project - Call for Collaborators!
description: Something exciting I've had in the works, and how you can help!
tags: [rust, emulation]
image: noentiendo/pet.png
---

I'm trying to emulate a bunch of 6502-based systems -- the Commodore PET, VIC-20, and 64, the Apple IIe, and the NES. I'm writing it in Rust, currently targeting desktop and WebAssembly but with plans to support mobile and embedded, too. Right now, I've got the PET working, and you can try it out [here](/noentiendo/index.html).

This is an ambitious project, and I'm seeing some exciting results, but **I need your help** if I'm going to have a chance at getting all of this working within a reasonable timeframe. If you like Rust, are interested in old hardware, and might have some free time soon, [let me know](/contact).

![A screenshot of a Commodore PET running BASIC.](noentiendo/pet.png)

# The Premise

The MOS 6502 defines an era of retro computing. It was a powerful chip, priced incredibly low. This same chip was used in the Commodore 64, Apple IIe, BBC Micro, and others, and a knockoff (with an entirely compatible instruction set) was used in the Nintendo Entertainment System. Many of these computers also relied on the MOS 6520 (Peripheral Interface Adapter, or PIA) and the MOS 6522 (Versatile Interface Adapter, or VIA).

Rust, like C or C++, is notable for its wide range of potential platforms. Toolchains exist for desktop, web, mobile, and even embedded processors, leaving open the possibility of creating a handheld device built to run this emulator.

By writing an emulator that works off of a few basic building blocks -- the 6502, the PIA and VIA, some basic RAM and ROM, and some special functions like the VIC chip -- it should be possible to emulate a wide range of systems, sharing much of the code between them. And by implementing this in Rust and targeting a variety of platforms, it should be possible to emulate anything, anywhere.

# The Work So Far

If you prefer reading code, take a look at [the repo](https://github.com/breqdev/noentiendo).

## `--system brooke`

The first system implementation was just something I came up with for testing. A `System` represents the 6502 and some attached `Memory`, which in this case was just RAM from `0x0000` through `0x3FFF`, some memory-mapped I/O at `0x4000`, and just ROM from `0x8000` to `0xFFFF`. I chose this configuration to be similar to [Ben Eater's homemade computer](https://eater.net/6502)[^1], so that I could use his toolchain and examples to test my processor.

Here's some of the assembly I wrote by hand in the early days. This program will capitalize any letter it receives:

```asm6502
MAPPED_STDIO = $4001

  .org $8000

reset:
  LDA MAPPED_STDIO
  CMP #$61
  BMI skip_capitalize
  CMP #$7B
  BPL skip_capitalize

  AND #$DF

skip_capitalize:
  STA MAPPED_STDIO
  JMP reset

  .org $fffa
vectors:
  .word $0000; NMI
  .word reset; RESET
  .word $0000; IRQ
```

## `--platform text`

How does the above program actually read and write text? This is where `Platform`s come in. The `Platform` trait provides platform-specific code to run the `System`, and each `Memory` object can keep a `PlatformProvider` to provide functionality like writing to the terminal, prompting for input, drawing a pixel on the screen, or checking which keys are pressed.

The Text platform is the simplest, only providing read and write capabilities through the terminal.

## `--system klaus`

To verify that every opcode of my 6502 implementation worked, I decided to use [Klaus Dormann's functional tests](https://github.com/Klaus2m5/6502_65C02_functional_tests). This `System` was the harness that let me run these tests.

## `--system easy`

Another project I leaned off of was the [Easy6502](https://skilldrick.github.io/easy6502/) guide. This guide walks you through writing a game of Snake for a bespoke 6502 system which outputs to a 16x16 color display. I implemented this video system for my emulator, and ran the example implementation of Snake. This basic 16x16 display was substantially more simple than any real-world video circuit, so it made a perfect first implementation.

## `--platform winit`

To actually push pixels to the screen, I landed on using [`pixels`](https://github.com/parasyte/pixels) to plot pixels and [`winit`](https://github.com/rust-windowing/winit/) to handle creating the window and handling keyboard events. I initially tried using [`minifb`](https://github.com/emoon/rust_minifb) to handle both tasks, but I found it to have slightly worse performance.

## `--system pet`

My next step was to actually implement a real computer. I chose the Commodore PET, since its simple monochrome text-mode graphics would be relatively easy to implement.

In the PET, text is placed on the screen by writing a specific character code to a specific location in the video memory. There is no color support, bitmap mode, or other frills -- it's just text mode.

The PET also uses a PIA chip, which I needed to implement. This is used to read the keyboard row, and to receive a 60Hz interrupt from the video circuitry.

I did still have to implement the keyboard, which proved slightly difficult. The keyboard layout on the PET's "graphics keyboard" (one of the two standard keyboards for the PET) is quite different from a modern computer keyboard. Notably, it places the double-quote <kbd>"</kbd> on a key which does not require <kbd>Shift</kbd> to be pressed. After adding that and a few other special cases, it just required implementing the keyboard matrix scan logic to return the correct bits for each keyboard row.

## `--target wasm32-unknown-unknown`

![A screenshot of a Commodore PET emulator running in a browser.](noentiendo/wasm.png)

This is when I added support for WebAssembly. In a browser, the emulator draws to a `<canvas>` element, also using `winit`. (I'm thinking of transitioning away from `winit` and just directly setting up the `<canvas>` through JavaScript bindings.) The Easy6502 implementation works fine, and so does the PET. (The text-mode stuff also works, albeit through `alert()` and `input()` calls.)

## `--system vic`

![A screenshot of a VIC-20 displaying the BASIC startup screen.](noentiendo/vic.png)

My most recent work has been trying to emulate the VIC-20. The VIC-20 is named after the _VIC chip_, or the Video Interface Chip. (Specifically, it's the MOS 6560 or 6561 in NTSC and PAL regions respectively.) This chip manages the background and border colors, the sound output, the light pen, and a few other miscellaneous video-related features.

The VIC-20 also trades the PIAs for VIAs. Although the PET contained a VIA, it was only used for the IEEE-488 interface (used for disk/tape drives and storage), so I didn't implement it. The VIC-20 uses its VIAs for reading the keyboard state and for setting up a 60Hz timer, both of which are required to get a minimal working system.

The VIC-20 uses three separate areas of memory for video-related functions:

- The _screen memory_ stores what character is displayed at each position on the screen.
- The _character memory_ stores the shape of each character -- kind of like the "font" of the system.
- The _color memory_ stores the color code for each position on the screen.

**This work is ongoing.** At time of writing, the system boots to the startup screen (with color), but fails to blink the cursor or display typed characters. Work is ongoing in the `bc/vic-20` branch of the repo.

# The Road Ahead

My immediate goal is to get the VIC-20 working, which should happen soon. Past that, and loosely in order of priority, here's what I want to tackle:

## Emulating Disk Drives

Currently, the PET can only be used for running programs that you're willing to type out at the BASIC interpreter. Emulating a disk drive will make it easier to load a wide array of software, increasing the utility of the emulator and helping to test other parts of the system. Notably, lots of Commodore machines used the same drives, which might make this easy.

## Cleaning Up the WebAssembly Experience

Right now, the WebAssembly build is a somewhat manual process built on top of `wasm-pack`, with no automated deployment. Additionally, swapping between systems requires commenting out system-specific code.

I'd like the WebAssembly experience to be user-friendly enough for a user to select the system they would like to run from their browser. I'd also like deployment to be more automated, so pushes to the Git repository will trigger the web deployment to be up to date. This might also be a good time to remove the `winit` dependency for WebAssembly, and to work with the `<canvas>` directly. (That would also let us attach event listeners to the page itself, not just the canvas.)

## The Commodore 64

I'd like to emulate the Commodore 64, due to its popularity. The only substantial difference it has to the VIC-20 is the video circuitry, so once the VIC-20 is working, this should be a pretty easy system to get running.

Notably, the Commodore 64 uses the MOS 6510, not the 6502. This adds an 8-bit I/O port.

## Native Mobile Apps

While mobile users _could_ use the WebAssembly version, the low performance of mobile devices means that the overhead of WASM makes the experience laggy. A native mobile app could also give a better keyboard experience for users.

## The Apple IIe

This was another popular 6502-based computer with a rich software library. It has less in common with the Commodore machines, meaning it might be more difficult to get working.

## Embedded Design Sketching

My vision is to have some physical device with physical controls and a physical display to run the emulator as firmware. I don't intend on bringing this to market, partly because I don't think there is enough demand and partly because we would have to be careful to avoid copyright issues (e.g. the kernals of the Commodore machines are still protected under copyright). That said, I want it to be inexpensive enough that we could put together a few as a proof-of-concept.

Figuring out the vision for this project requires:

- Choosing a chip
  - Ideally we'd want one with good Rust support, like the RP2040
- Choosing a display
  - This might be the most expensive part of the system
  - We'd want something with color, and a good "middle ground" aspect ratio
- Drawing a schematic
- Laying out a PCB
- Assembly!

## The Nintendo Entertainment System

The NES has a complicated video system with hardware sprites and multiple modes. It will be quite a challenge to implement. It uses the Ricoh 2A03, which is a 6502 clone but doesn't have Binary Coded Decimal support for patent-related reasons.

## Cleaning Up the Desktop Experience

It might be nice to have a user-friendly GUI that allows users to choose their system and ROM before launching. It also might be nice to ship a compiled, signed executable for all platforms.

## Additional Systems

Other potential 6502-bsed systems include:

- _Apple I_, other members of the _Apple II_ family
- _Acorn_'s various Eurocard systems
- _Atari_'s 8-bit family including the _Atari 400_ and _800_

## Support for additional CPUs

In the long term, it might be nice to add support for additional CPUs. Potential candidates include:

**WDC 65C02, WDC 65C816, Ricoh 5A22:** This family was based on the original 6502. The 65C02 removed some undocumented opcodes, added some new opcodes, and fixed some errata from the old silicon. The 65C816

- WDC 65C02: _Apple IIc_, _Enhanced Apple IIe_, _BBC Master_, _Atari Lynx_
- WDC 65C816: _Apple IIGS_
- Ricoh 5A22: _Super Nintendo Entertainment System_

**8080, Z80, "GB-Z80", 8086:** This family of processors was also widely used. The Z80 is an extension of the Intel 8080, and the "GB-Z80" (technically a Sharp LR35902) shares many of the same opcodes. The Intel 8086 has similar opcodes to the 8080.

- Intel 8080: _Altair 8800_, _Sol-20_
- Zilog Z80: _ZX Spectrum_ (and the _ZX 80_ and _ZX 81_), _TRS-80_, _Cambridge Computer Z88_
- "GB-Z80" / Sharp LR35902: _Game Boy_, _Game Boy Color_
- Intel 8086: _IBM PC (model 5150)_, _IBM PS/2_, _Tandy 1000_

**Motorola 68000** This is a 16/32-bit processor with a 32-bit instruction set and a 16-bit data bus. It was used in the _Macintosh_, _Amiga_, _Atari ST_, _Sun-1_, _Apple Lisa_, _Sinclair QL_, and _Sega Genesis_.

## Project name?

So far, I've just been calling the project "noentiendo," as a pun on Nintendo and an allusion to the fact that I didn't know much about Rust or retro computing before starting this project. I've been thinking about calling it "MoxEMU," since I really like Moxie soda. I'd love other suggestions -- maybe one will stick!

# Timeline

My immediate priority is getting the VIC-20 working. I don't have an ETA on when that'll be finish, but my hope is that it'll be done by New Years. After that branch gets merged, I'd love to start working on this with a group of people. Hopefully, once the initial design is frozen, collaboration should be easy due to the modular nature of the system.

If you're interested, get in touch with me, and I can keep you up to date!

[^1]: It's also a big part of what inspired me to start this project!
