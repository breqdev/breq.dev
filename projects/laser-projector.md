---
title: Laser Vector Projector
description: TODO
# image: TODO
created: 2026
repo: breqdev/galvo
# demo: https://kicad-pretty.breq.dev/
tags: [lasers, esp32]
writeup: 2026-03-28
---

<div className="mx-auto my-4 max-w-prose rounded-2xl bg-amber-200 px-4 py-2 font-body text-lg dark:bg-yellow-800">

<h2 className="font-bold text-2xl mt-4">Sponsored by PCBWay</h2>

This article is sponsored by [PCBWay](https://www.PCBWay.com/), who generously provided PCB fabrication services for this project. PCBWay provides high-quality boards with fast turnaround at low cost, and are a great option for both hobbyists and professionals. They are also a platinum-level sponsor of the KiCAD project.

</div>

<div className="mx-auto my-4 max-w-prose rounded-2xl bg-red-200 px-4 py-2 font-body text-lg dark:bg-red-800">

<h2 className="font-bold text-2xl mt-4">Safety: Don't do this at home</h2>

Lasers are dangerous tools, and this isn't the type of project you should attempt without a clear understanding of the risks. But since I know that might not stop you, here's the _very basics_ of what you need to know to mess around with this stuff safely.

Lasers are divided into classes, where a higher class number means higher risks. Here's a table summarizing the classes for _visible light_ lasers -- infrared or ultraviolet lasers bring additional risks of unintentional long-duration exposure as the beam can't be seen.

| Class | Power | Risks | Examples |
| --- | --- | --- | --- |
| I | &lt;0.39 mW | Viewing through optical instruments | CD players |
| II | &lt;1 mW | Staring directly into beam | Barcode readers |
| IIIa | &lt;5 mW | Momentarily looking into beam | Laser pointers |
| IIIb | &lt;500mW | Eye or skin exposure to beam | Laser shows, industrial/research |
| IV | &gt;500mW | Eye or skin exposure to beam or diffuse reflections | Laser shows, industrial/research, medical |

<Caption>

sources: [lasersafetyfacts.com](https://www.lasersafetyfacts.com/) and [fda.gov](https://www.fda.gov/radiation-emitting-products/home-business-and-entertainment-products/laser-products-and-instruments)

</Caption>

Note that lasers bought from sketchy vendors are often mislabeled! This especially applies to laser pointers, which are required to be at most class IIIa. Several laser pointers I have purchased had "&lt;5mW" printed on the outside but measured closer to 50 mW, well into class IIIb territory.

Most laser safety regulations for visible lasers are based around a 0.25 second exposure time, with the rationale being that the human blink reflex would protect you from exposures longer than that time. Therefore, if a laser is categorized as dangerous for eye exposure, it means that _it can cause permanent damage faster than you can blink_.

I live in Massachusetts, where Class IIIb and IV lasers generally are legally required to be registered with the state for use and all use must be overseen by an accredited laser safety officer. However, courses are expensive and time consuming, the fine for noncompliance is at most $500, and the state would generally have a difficult time knowing about the existence of a laser anyway. This is not legal advice. But if you're going to skip this part, you better know your stuff.

I work with very high power lasers at my day job and thus am familiar with the controls that a professional lab uses to ensure laser safety. I would not have had the confidence to attempt this project without that experience.

A lot of the aspects of this project revolved around buying parts as cheaply as possible to demonstrate how accessible experimenting with lasers is. Do not attempt to apply this mentality to safety equipment. By far the most expensive part of this project was purchasing laser safety goggles from a reputable, CE certified, ANSI-compliant vendor.

</div>

# Concepts

## Galvanometers

How do you project an image with light?

One way (simpler in theory, harder in practice) is to use a digital micromirror device (DMD) -- a MEMS device made up of a grid of tiny mirrors that flip between two states. DMDs are effectively synonymous with DLP (Digital Light Processing), the Texas Instruments product line which holds a monopoly on this category of device. DMDs are generally difficult and expensive to acquire for hobbyist use, except through buying and disassembling commercially available video projectors -- but these integrated systems limit a tinkerer's level of control over the DMD chip. DMDs are also difficult to illuminate and inefficient at displaying "sparse" images.

Another way is to quickly steer the beam to trace out the ideal shape. While moving the laser diode itself is tricky, moving mirrors to steer the beam can be done extremely fast. Laser projectors use a pair of mirrors mounted on _galvanometers_ (or "galvos" for short). Unlike conventional types of motors, these use the same mechanism as you'd find in an analog voltmeter to deflect the mirror in response to a current. They can't move much mass, but they can respond very quickly to changes in input, making them perfect for this type of beam steering application.

While a DMD allows you to draw raster images, galvos draw vector images -- enabling a lot of fun applications that aren't possible on typical consumer displays.

![](laser-projector/galvo-listing.png)

The [X/Y galvo setup I bought](https://www.aliexpress.us/item/3256809659931894.html) came with two galvos, the X/Y bracket which connects them, a driver board, and a split-rail power supply. It takes in +/-10V differential analog signals for X and Y position (likely corresponding to a [standard](https://www.ilda.com/resources/StandardsDocs/ILDA_ISP99_rev002.pdf) set by ILDA, the International Laser Display Association).

Galvos for laser applications are often rated in "Kpps", or "kilo-points per second," which refers to the rate at which the galvos can display the ILDA standard test pattern at 8 degrees of deflection. My galvos are rated for 20 Kpps, which is on the slower side. Note that some manufacturers often lie about this measurement given its imprecise nature.

## RGB laser projectors

![](laser-projector/laser-listing.png)

Lasers come in a variety of wavelengths dependent on the lasing medium. Some wavelengths are dramatically easier to make than others. Thankfully, lasers in the red, green, and blue ranges are pretty straightforward. Modules like [the one I purchased](https://www.aliexpress.us/item/3256810125144918.html) combine three wavelengths with _dichroic mirrors_ -- filters that act like a mirror to some wavelengths, but transmit others through -- to form a single beam.

This is one of the perks of working in perceptual color -- you only ever need three wavelengths to create any arbitrary color.

Red lasers are commonly found at the 638nm wavelength, so that one's easy. There are lot of available blue wavelengths between about 440 and 460nm to choose from. Green is where it gets difficult.

By far the most common green light wavelength is 532nm -- it can be created easily by taking an infrared laser at 1064nm and passing its light through a frequency-doubling crystal to produce 532nm. However, this process is imperfect and cheap green lasers often lack the filtering required at the infrared wavelengths, creating a potential hazard if the user is not expecting to need protection against 1064nm light. For lower-power applications like this project, 520nm diodes have started to become available which directly produce light at the desired wavelength. And as another benefit, 520nm diodes help give you a larger color gamut! By mixing various amounts of red, green, and blue at those selected wavelengths, you can create any color in the triangle below.

![](laser-projector/chromaticity.svg)

<Caption>

Original source: [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:CIExy1931_fixed.svg)

</Caption>

On the note of goggles: Laser safety goggles have the difficult job of letting through enough light for you to work while only letting through a tiny fraction of the light at specific wavelengths. You must choose goggles which match the wavelengths you are using. I got the [F42.P5L13.5000](https://lasersafety.com/product/f42-p5l13-5000/) from Laservision as they are rated for about OD 3 (i.e., allowing through only $\frac{1}{10^3}$ of light) at each of the wavelengths in my laser module while still allowing 20% of visible light (the Visible Light Transmission, or VLT).

![](laser-projector/goggles-rating.png)

## ESP32

To paint vector art, two things are essential: precise control over the beam position, and precise control of the beam brightness/color.

### DAC

I chose the ESP32-S2 for this project because it has a dual-channel DAC output. Driving galvos at such high speeds requires fast control of a DAC, and having one integrated into the microcontroller is a good starting point to ensure adequate throughput. (If the galvos are rated for 20 Kpps, then the DAC should have at least a 20 kHz output rate!)

Although DACs are relatively common in industry, they are unfortunately absent from many hobbyist boards. The ATSAMD line common in MicroPython-focused boards has only a single DAC output. STM32s often have two DACs, but aren't nearly as common in hobbyist boards.

Two variants of the ESP32 chip, however, do support DACs: the original ESP32 and the ESP32-S2 both have two 8-bit DAC outputs. 8 bit outputs essentially give a 256x256 grid for outputs, which is quite small by professional standards but still pretty good for this project. Additionally, the galvos themselves have some inertia, which has a smoothing effect on diagonal lines and hides the "stair step" phenomena in the output.

I chose the ESP32-S2 as it was the newer chip, although it does not support Bluetooth.

### PWM

PWM on the ESP32 is quite strange compared to other microcontrollers.

There are two peripherals that can generate PWM signals: the "LED Controller" and the "Motor Control Pulse Width Modulator."

The LED Controller is designed primarily to drive LEDs with PWM signals. As such, it lacks a lot of the controls one would typically get (the output frequency is fixed, for instance), but gains other abilities: the peripheral can automatically ramp between colors smoothly without involvement from the CPU. This is the peripheral I'm using for this project.

The MCPWM gives additional options for timers, interrupts, and synchronizing with external systems -- features that aren't needed for this project.

### Rust

The ESP32 is notable for its highly developed Rust support. I am a big fan of the Rust language, but haven't had a chance to use it in a `#[no_std]` environment for firmware development yet. The ESP32 is the only chip for which the hardware abstraction layers are maintained by the vendor itself (Espressif) instead of by the community.

For an RTOS, I'm using [Embassy](https://embassy.dev/), which gives async/await support. I am not used to programming in an environment where I have full async/await, but lack most of the standard library! That said, the async approach seems to be a very good fit for embedded code, especially with things like networking involved.

# Circuit Design

This was my first time attempting a schematic of this complexity! Overall I'm quite happy with how much worked right away.

### Power Regulation

![](laser-projector/schematic/PowerRegulation.svg)

This project needs a few different voltage rails to function:

- +12V for the laser diodes
- +/-15V for the galvo driver board
- +3.3V for the ESP32

I managed to get away with not having a 5V rail for this project which was nice, and the galvos I bought came with a power supply to step down 120/240V AC to the +/-15V rails. I decided to have line voltage enter the system through an IEC connector on the PCB so that it can be routed internally to both this off-board +/-15V supply and regulated down to 12V on the board. This was my first time routing AC voltage on a board, and I'm sure the trace spacing, etc. is far higher than it needs to be, but it seems to work great! The one important thing I learned was to avoid having the ground plane get too close to the AC traces to reduce interference. That, and the habit of grabbing a board by the connectors while it's on is not advisable when said connectors have 120V present.

To step down to +12V, I wanted an on-board solution to reduce the number of components in the project. We made use of an [Mean Well IRM series module](https://www.digikey.com/en/products/detail/mean-well-usa-inc/IRM-05-12/7704648), which has a simple 4-pin footprint and completely solved the 12V rail problem. While it takes up some space on the board, it's still more compact than most off-board options would be and requires no additional wiring.

Finally, we needed to step 12V down to 3.3V. Most examples of this in schematics I found online use the AMS1117 linear regulator or its clones, but I also found countless Reddit comments arguing that the AMS1117 is a bad choice for one reason or another. I ended up using [TI Webench Power Designer](https://webench.ti.com/power-designer/) to come up with a design and directly copied the schematic into my board. The design uses the [TPS561201](https://www.ti.com/lit/ds/symlink/tps561201.pdf), which is a switching regulator large enough to hand-solder, not too many external components, and reasonably good efficiency.

One thing to note about switching regulators is that the layout of passive components around them on the PCB is important to improve output quality. I was able to copy the example given in the chip datasheet and achieve good results.

### Microcontroller

![](laser-projector/schematic/Microcontroller.svg)

The project is built around an ESP32 module, since I did not want to have to design my own antenna around the chip and we had enough space to spare.

The ESP32 has a native USB port which I wanted to potentially use to control the device from a computer. While it is possible to upload code over the native USB port, the development experience is far from optimal as logging and panic handlers in Rust only output to the chip's UART pins, and uploading code requires performing a particular sequence to the BOOT and RESET pins which can't be done over the native USB. Thus, I tried to copy the schematic found in many ESP32 devboards: adding a CP2102N chip for USB to UART and using two transistors to implement BOOT and RESET pins via the serial DTR and RTS signals.

The CP2102N chip was quite difficult to hand-solder, especially because the ground pin is only provided by the pad below the chip. As a backup, I added a header to manually hook up UART signals and physical buttons for the BOOT and RESET signals.

### Galvo Signal Handling

![](laser-projector/schematic/Galvo.svg)

The galvos take a pair of analog signals (one for X and one for Y) as their input. The board we made supports three possible sources for these:

- The ESP32's two DAC output pins (8-bit)
- An external SPI-based [MCP4922](https://ww1.microchip.com/downloads/en/devicedoc/22250a.pdf) DAC (12-bit)
- A 3.5mm audio input source, so you can (for instance) play oscilloscope music from a laptop

I included a footprint for the external DAC in case it seemed like we were overly limited by the resolution of the ESP32 DAC, but so far that hasn't been the case yet! The "smoothing" effect created by the inertia of each galvo definitely helps reduce the stair-stepping that would otherwise occur with 8-bit output.

Selection between the active DAC and the external audio input is handled using the presence detection pins of the 3.5mm input jack. We found a part that has two separate pins for detection, allowing us to easily swap in the DAC signal when no cable is present without any other components.

The harder part is amplifying the galvo signal. We needed to take a 0-3.3V input and convert it to a differential signal of +/-10V. Op-amps confuse me, so I made Mia do all the hard work of this part :)

The tricky part of the op-amp circuit is that we need to first scale the DAC output signals to be centered on 0V (removing the 1.65V DC offset), then scale everything up to +/- 10V. I found several designs online that use three op-amps per channel -- one to remove the offset, one to scale the input to 0-5V, and another to flip the input and scale it to 0 to -5V, thus generating the required -10V to +10V differential signal. We chose to take a shortcut by generating a single signal ranging from -10V to +10V and hooking the other end of the differential input up to ground, allowing us to use only two op-amps per channel and thus a single [TL084](https://www.ti.com/lit/ds/symlink/tl084.pdf) chip. After some prototyping in [Falstad Circuit Simulator](https://www.falstad.com/circuit/), we went straight to PCB design -- it was definitely a risk to skip the breadboard prototyping stage, but everything worked on the first try!

### Laser Control

![](laser-projector/schematic/Laser.svg)

Laser diodes, like LEDs, are best driven using a constant-current power supply. The laser driver board that came with the diodes I bought uses an [OC5211](https://datasheet4u.com/pdf-down/O/C/5/OC5211-OCX.pdf) driver for each channel. Each channel provides a digital input signal that allows for dimming of the laser using PWM. While the datasheet specifies that the input pin needs to be a 5V signal (and doesn't provide a range of acceptable values), I found that I can drive it from a 3.3V GPIO pin without any difficulties.

Unfortunately, this design presents a major safety issue: if the digital input signal is in a high-impedance state, the OC5211 has an internal pull-up to 5V. While I had hoped this was a pull-up resistor on the board I could manually remove, it seems like this pull-up resistor is actually contained within the chip itself?

![](laser-projector/OC5211.png)

As a workaround, I decided to add switching to the 12V power supply going to the laser driver. The laser driver board requires high-side switching with a P-channel MOSFET, since the ground pin of the power input is shared with the reference ground for the modulation signals. However, as I can't output +12V from a GPIO, I added a pull-up resistor from the gate to +12V and an NPN transistor such that the GPIO can pull the gate low.

While this is extremely far from a professional product, I wanted to try out some of the steps that would be required for this type of design. Most lasers of this output power have an E-stop interlock and/or keyswitch that must be turned before the laser can be operated, so I replicated this design here. I also added a voltage divider such that the status of the interlock can be read by the ESP32.

### I2C and Wii Accessories

![](laser-projector/schematic/I2C.svg)

I knew early on that I wanted to use Wii Nunchucks as a controller for this project, as they're [uniquely well-suited for homemade projects](/2026/03/15/wii-accessories). All Nunchucks share the same I2C address, so I had to put the two ports on the two different I2C peripherals. I wanted to add additional room for extensibility to the project (such as for a small indicator display?), but since anything else would likely have a different I2C address to the Nunchuck, I chained those connectors off of the same I2C buses as the Nunchuck inputs. I used [Qwiic](https://www.sparkfun.com/qwiic) connectors for easy wiring -- they're quite compact but still possible to hand-solder.

### Enclosure

![](laser-projector/schematic/Enclosure.svg)

I wanted this project to be fully enclosed so that I could easily move it to different locations -- one of the cool things about projectors generally is the variety of spaces they can be used in to create large-scale images. However, the galvos themselves and the galvo driver board get quite hot when running, so I figured that a fan would be essential for keeping things from burning up.

### Manufacturing

After designing the board in KiCAD, I sent it to [PCBWay](https://www.PCBWay.com/) to be manufactured. PCBWay provides a [KiCAD plugin](https://github.com/PCBWay/PCBWay-Plug-in-for-Kicad) which automates the process of sending your board layout from KiCAD into their service. Gone are the days of fussing around with Gerber file export settings or realizing you forgot to attach a drill file! At time of writing, part of the cost of your order will be donated to the KiCAD project to support future development.

The boards for this project arrived quickly, well-packaged with no defects and high-quality silkscreen printing. While I chose a standard thickness and silkscreen color for this project, PCBWay offers many more customization options often at minimal additional cost.

# Physical Construction

TODO: info about the design and construction of the enclosure

I chose to 3D print the enclosure for this project. At slightly over 200 by 200 mm, it's definitely on the larger end of what I'm capable of producing on a consumer-grade FDM printer, and failed prototypes were a little more expensive than I was hoping with each print costing about $5 in filament. In the past, I've used [wood and FDM parts together](/projects/itx-case) to make cases of this size, but my apartment lacks woodworking tools and I didn't want to have to drive to my parents' garage to build this thing.

During this project, I upgraded from my trusty Creality Ender 3 Pro to a [Bambu Lab A1](https://bambulab.com/en-us/a1) printer, which brought a definite boost in the speed and quality of prints.

# Software

One of the things that makes galvo-based laser projectors so unique is that they "natively" display vector images. Vector displays are a medium that largely faded from relevance as raster displays became more practical.

Vector displays excel at creating sharp, smooth lines and polygons at any angle.

Ahoy's [A Brief History of Graphics](https://youtu.be/QyjyWUrHsFc?t=188&si=QlK1Vf2i6stZdbR7) has a section on vector graphics with renderings and examples which showcase this excellently.

### OpenStreetMap

Another source of vector information is maps. OpenStreetMap provides a nice interface to download map data for vector display.

The most powerful way to extract data from OpenStreetMap is through the Overpass API. To formulate a request, I started using the [Overpass Turbo](https://overpass-turbo.eu/) interface to tune my query to return the types of features I wanted -- I wanted to show enough recognizable neighborhood features without too many driveways, parking lots, or sidewalks causing the galvos to spend excessive time drawing the image.

![](laser-projector/overpass-turbo.png)

Once I had the query nailed down, I could just paste the payload into a Python script that could take the latitude, longitude, and map size as arguments. Making a query programmatically is as simple as `POST`-ing it to `https://overpass-api.de/api/interpreter` and receiving back some JSON:

```json
{
  "version": 0.6,
  "generator": "Overpass API 0.7.62.10 2d4cfc48",
  "osm3s": {
    "timestamp_osm_base": "2026-01-29T01:45:29Z",
    "copyright": "The data included in this document is from www.openstreetmap.org. The data is made available under ODbL."
  },
  "elements": [
    {
      "type": "way",
      "id": 8604814,
      "bounds": {
        "minlat": 42.3955979,
        "minlon": -71.1204748,
        "maxlat": 42.3956969,
        "maxlon": -71.12024
      },
      "nodes": [4257815907, 1092759648, 61170350],
      "geometry": [
        { "lat": 42.3955979, "lon": -71.12024 },
        { "lat": 42.3956344, "lon": -71.1203257 },
        { "lat": 42.3956969, "lon": -71.1204748 }
      ],
      "tags": {
        "attribution": "Office of Geographic and Environmental Information (MassGIS)",
        "condition": "fair",
        "cycleway:left": "no",
        "cycleway:right": "lane",
        "cycleway:width": "6'",
        "highway": "secondary",
        "lanes": "2",
        "massgis:way_id": "167315",
        "maxspeed": "20 mph",
        "name": "Highland Avenue",
        "oneway": "yes",
        "sidewalk:both": "separate",
        "source": "massgis_import_v0.1_20071008141127",
        "surface": "asphalt",
        "width": "18.3"
      }
    }
    // ...
  ]
}
```

There's a lot of interesting info here about the road on here that could be useful! For our purposes, though, we only care about drawing the paths.

TODO: distinguish types of roads?

TODO: scaling and cropping to fit

### Video Games

TODO

## Bibliography

- The [ILDAWaveX16](https://stanleyprojects.com/projects/ildawavex16) by StanleyProjects is an open-source device for controlling ILDA-compliant laser projectors. While it also uses an ESP32, it takes a much more serious approach to clean signal generation, including using a dedicated DAC chip for 16-bit resolution (compared to the 8-bit resolution of my setup).
- [Bitluni's laser projector setup](https://www.youtube.com/watch?v=bdo3djJrw9o) uses a phosphor (TODO: double check) to simulate a CRT-style screen, and adapts a smartphone telephoto lens to increase the deflection of the galvo output without pushing the galvos to higher angles and burning them up.
- [Atomic14's projector](https://github.com/atomic14/esp-asteroids) has only a single color but seems to be the first example I can find of Asteroids running on a laser galvo setup. I found the discussion on the difficulty of rendering Hershey fonts very informative.
- [BenMakesEverything's raster projector](https://www.youtube.com/watch?v=fEPicBSYeNQ) is an interesting take on this approach which uses a polygon scanner for the X-axis and a galvo for the Y-axis to draw scan lines in a similar manner to a CRT. It excels at displaying existing raster-based content such as animated GIFs.
- [limpkin's XY scanner](https://www.limpkin.fr/index.php?post/2008/11/03/XY-Laser-Scanner) was made back in 2007.
