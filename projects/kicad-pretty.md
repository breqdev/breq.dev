---
title: KiCAD SVG Prettifier
description: A web app to make realistic-looking SVGs of KiCAD boards
image: kicad-pretty/kicad-pretty.png
created: 2025
repo: breqdev/kicad-pretty
demo: https://kicad-pretty.breq.dev/
tags: [web, hardware]
writeup: 2025-04-03
---

![](kicad-pretty/kicad-pretty.png)

This project recolors SVG exports of KiCAD circuit board designs to appear in realistic colors.

# Motivation

I faced an annoying problem with KiCAD the other day. I wanted to export a realistic-looking image of a PCB design to use for an upcoming project. However, the existing options for doing this didn't fit my needs.

The 3D viewer, while very cool, isn't great for this use case. I would prefer a vector image to a raster one. Plus, with the way the lighting is set up, an "exactly head-on view" of a board can look very blown out. Here's a board with light-colored silkscreen as viewed head-on in the 3D viewer:

![](kicad-pretty/too-bright.png)

KiCAD also has the ability to export an SVG natively, but the result looks like what you would see in the editor: the colors match the editing layers, not the actual realistic colors of the board, and the soldermask layer is inverted. Plus, I wanted a way to generate separate front and back views, with the back view mirrored to how it would appear in real life.

![](kicad-pretty/kicad-svg.svg)

# Implementation

So, I built a tool to recolor the output from the KiCAD format to look more realistic. Annoyingly, KiCAD-generated SVGs do not put each layer into a separate SVG group or layer, so my code queries for nodes based on their existing color to apply the new colors. This would break if KiCAD exports things in an unexpected color, but since these colors are [seemingly not configurable by the user](https://forum.kicad.info/t/colors-in-svg-export/43668), this should be fine.

I chose to write this app in JavaScript since the language already provides good utilities for parsing, querying, and manipulating XML documents like SVG files. The UI is pretty utilitarian, but hey, it works and loads quickly! I wrote this without using a framework for styling or JavaScript -- it was nice to take a break from the complex tooling of my usual React/Tailwind setup and go back to basics for a bit.

The whole app is based around some _gnarly_ CSS selectors, especially since the format changes substantially between KiCAD versions and I was trying to target versions 7 through 9.

Here are some example outputs for a board I'm working on:

![](kicad-pretty/front.svg) <br /> ![](kicad-pretty/back.svg)

# Try it yourself

If you want to try it out yourself, you can! First, in KiCAD, export an SVG with the relevant layers. In older versions, this is straightforward:

![](kicad-pretty/kicad-export.png)

However, in the new version, they've replaced the "Export SVG" dialog with the "Plot" window, which exports a separate SVG file for each layer (which is not what we want!) The easiest way to get a single SVG image is with the KiCAD CLI (replace `MyBoard.kicad_pcb` with the filename of your board file):

```bash
kicad-cli pcb export svg --mode-single --layers F.Cu,B.Cu,F.Silkscreen,B.Silkscreen,F.Mask,B.Mask,Edge.Cuts MyBoard.kicad_pcb
```

Then, go to [**kicad-pretty.breq.dev**](https://kicad-pretty.breq.dev/) and:

1. Upload your SVG
2. Change the colors as desired (e.g. if you use a different soldermask color)
3. Click "Make Pretty!"
4. View each preview with the "Show Front" and "Show Back" buttons
5. Export each side with the "Export" button

If you're having issues with the export format, feel free to reach out to me and I'll do my best to investigate! I've only been able to try a handful of SVG viewers and KiCAD boards so far.
