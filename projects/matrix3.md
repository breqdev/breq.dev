---
title: Wall Matrix 3
description: A pair of
# image: matrix2/bikes.jpg
created: 2025
# repo: breqdev/matrix2
tags: [python, hardware]
# writeup: 2025-09-24
---

I've built several projects based on LED matrices: my first one in [2021](/projects/wallmatrix), and a redesign earlier in [2025](/projects/matrix2) with a larger panel and slimmer design. I've also gotten to spend lots of time fine-tuning the display UI as I learn more about icon design, balancing readability and "glanceability" with information density, and dealing with the unique constraints of a display with a 3mm pixel pitch.

# Motivation

While the hardware was a dramatic step up from my first iteration, I still thought there was room for improvement: more robust mounting of the encoder I added and the DC power jack, a slimmer construction that could fit closer to the wall, and simpler internal wiring. The obvious next step was a custom PCB. This project came at a time when I was hoping to get back into PCB design, so this seemed like the perfect opportunity!

At the same time, I had relatively recently started full-time work and wanted to add some decorations to my desk area. Since my previous builds had proven extremely useful at indicating bus times and bike availability, I figured that one on my work desk would be similarly useful!

# PCB Design

The schematic of the board is very similar to that of the previous build, with a few changes:

- The [Adafruit LED Matrix Bonnet](https://www.adafruit.com/product/3211) was removed and its level shifting chips were placed directly onto the board
- An ADC and photoresistor were added to enable automatic brightness dimming (a substantial pain point on the previous version!)
- A USB-C port was added to the side of the board as an alternate power option, since the DC jack on the bottom prevents standing the display up on a table

The layout followed pretty naturally. I kept the board at 192mm wide to match either a 64-column 3mm-pitch display or a 32-column 6mm-pitch display, gave it rounded bottom corners to match the style of the previous build, and mounted the encoder at the center on one side.

While I like the enclosed build in my apartment, I wanted to leave the option of doing a build with an exposed PCB. The components are all mounted towards the back, and the routing was mostly done only on the back side, leaving the front part of the board mostly empty on both the silkscreen and copper layers. I thought about putting some artwork or text on the silkscreen but couldn't think of a good way to make it look professional -- the usable space on the board is asymmetrical and interrupted by through-hole components.

In the end, I decided to put a repeating pattern in the copper layer of the board, then order it with [OSHPark](https://oshpark.com/)'s [After Dark](https://docs.oshpark.com/services/afterdark/) colorway, which uses transparent soldermask to let the copper design shine through. I wanted an angular style to match the vibes of the rigid exposed pixel grid, but worried an actual grid pattern could clash or appear misaligned. Thus, I used a hexagonal pattern that was built into GIMP.

Building an importing this pattern turned into more of an adventure than I had predicted! The process I found is convoluted and by no means ideal. If this were something I was doing more often I would definitely design an automated tool for it, but as it stands, the best way I know to accomplish this is:

1. Make your board.
2. Draw a shape representing your edge cuts in KiCAD. Make sure the units match up!
3. Under "Fill", choose a pattern you like and set the scaling appropriately.
4. Import your KiCAD drawing so you can use it as a reference. Plot -> SVG, plot F.Cu, check to have Edge.Cuts plotted on all layers.
5. Import your plotted SVG into Inkscape and line it up using your Edge.Cuts layer as a reference.
6. Manually draw shapes to mask off all of the areas you do _not_ want to have your copper pattern. It is easiest to put these in a group. These can be as convoluted or basic as you like.
7. Select all of your mask shapes and your shape with the pattern and open the "Shape Builder" tool. Select the area(s) where you want the pattern to show (i.e., the areas without parts). You should be left with a shape matching your intended board.
8. Next you need to turn the pattern into a basic SVG path. The easiest way to do this is to export it as a PNG (make sure your DPI is 500ish), then re-import it and Path -> Trace Bitmap. "Update Preview", if it looks good then "Apply."
9. Export as yet another SVG.
10. In KiCAD, File -> Import -> Graphics, select layer, manually line it up with your board!

# PCB Assembly

This was my first time doing surface-mount soldering! I kept the components manageable (SOIC chips and 0805 passives).

# Software

# Conclusion
