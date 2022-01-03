#!/bin/sh
ffmpeg -i $1 -vf scale=-1:480 -c:v libvpx -crf 10 -b:v 1M -c:a libvorbis $1.480p.webm