#!/bin/sh
ffmpeg -i $1 -c copy -t 15 $1.trunc.webm
