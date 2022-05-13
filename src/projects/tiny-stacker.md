---
title: ATtiny85 Stacker Game
description: A simple stacking game running on a low-power Atmel chip.
image: "../images/tiny-stacker.jpg"
video: /videos/tiny-stacker.480p.webm
created: "2020"
repo: Breq16/tiny-stacker
tags: [arduino, hardware, power]
---

<YouTube id="dYO6Px-RuYo" />

<Caption>A quick demonstration of the game.</Caption>

# Overview

This is a standalone game device. The game is a simple stacking game, requiring the user to press the button at the specific time to align each layer. The button is implemented by sensing skin conductivity.

# Motivation

I wanted to try my hand at a low-power embedded project. In the past, I had done projects which ran off of battery power, but I wanted to try to make something that could be left with the batteries in for years and still function. This required working with the sleep mode on my microcontroller of choice, which was something I hadn't used before.

# Technical Description

The microcontroller is an [ATtiny85](https://www.sparkfun.com/products/9378), and it's connected to an [I2C LED matrix](https://www.adafruit.com/product/1052) with an HT16K33 chip.

The techniques for putting the microcontroller in sleep mode are based on this [tutorial](https://learn.adafruit.com/trinket-slash-gemma-space-invader-pendant/source-code) from Adafruit.

The code uses functions from `<avr/sleep.h>` and `<avr/power.h>`, documented on the avr-libc site: [sleep.h](https://www.nongnu.org/avr-libc/user-manual/group__avr__sleep.html), [power.h](https://www.nongnu.org/avr-libc/user-manual/group__avr__power.html). (Documentation for the `set_sleep_mode` macro is notably absent, but the source is [here](https://www.nongnu.org/avr-libc/user-manual/sleep_8h_source.html).) The Wandering Engineer also published a more detailed [description](https://thewanderingengineer.com/2014/08/11/pin-change-interrupts-on-attiny85/) of the registers used (`PCMSK` and `GIMSK`). The `MCUCR` (MCU Control Register) is documented [here](https://web.ics.purdue.edu/~jricha14/Interrupts/MCUCR.htm).

Here's the meat of the implementation:

```cpp
void setup() {
  // ...

  // Disable unused peripherals (Timer1 and ADC)
  power_timer1_disable();
  power_adc_disable();

  // Enable interrupt on PB4 pin change
  // (Set the Pin Change Interrupt 4 bit in the Pin Change Mask register)
  PCMSK |= _BV(PCINT4);

  // ...
}

void awaitButton() {
  // Send command 0x20 to the I2C display
  // (system setup / turn off system oscillator / standby mode)
  TinyWireM.beginTransmission(0x70);
  TinyWireM.write(0x20);
  TinyWireM.endTransmission();

  // Enable Pin Change Interrupts
  // (Set the Pin Change Interrupt Enable bit in the General Interrupt Mask register)
  GIMSK = _BV(PCIE);


  // Disable all modules
  power_all_disable();
  // Enter power down mode
  // Set the sleep mode 1 bit (SM1) in the MCU control register (MCUCR)
  set_sleep_mode(SLEEP_MODE_PWR_DOWN);

  // Enable sleep mode
  // Set the sleep enable bit (SE) in the MCU control register (MCUCR)
  sleep_enable();

  // Enable interrupts globally
  // (Set the global interrupt flag, I, in the status register, SREG)
  sei();

  // Enter sleep mode
  sleep_mode();

  // Clear the General Interrupt Mask register
  GIMSK = 0;

  // Enable Timer 0 and the USI (Serial) peripherals
  power_timer0_enable();
  power_usi_enable();

  // Re-initialize the display
  TinyWireM.begin();
  initDisplay(0);
}
```

# Results

I've left it with the batteries in for more than a year by now, and I haven't noticed a drop in the display brightness. I'd consider it a success, although the rationale behind some of the hardware decisions has definitely been lost to time... Why didn't I just use an actual button? Regardless, this project certainly helped me get closer to understanding AVRs at a low level.
