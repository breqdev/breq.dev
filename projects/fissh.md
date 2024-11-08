---
title: Make a FiSSH
description: An SSH-based fish generator that only works at 11:11.
image: fissh/fish.png
created: "2024"
repo: breqdev/fissh.breq.dev
tags: [go, ssh, networking]
writeup: 2024-09-25
---

![](fissh/fish.png)

fissh.breq.dev ("make a fissh") is a terminal-based fish generator that you access via SSH terminal. At 11:11, try running:

```bash
ssh fissh.breq.dev
```

and you'll see a fish appear in your terminal!

# Fish generators

My friend [Ari](https://adryd.com/) introduced me to the original [makea.fish](http://makea.fish/) site (HTTP only), made by [weepingwitch](https://weepingwitch.github.io/). The site embeds an image rendered with PHP showing either a randomly-generated fish or the phrase "come back at 11:11." Getting the 11:11 fish has become somewhat of a ritual among my friends (we have a Discord channel specifically for posting fish screenshots!)

Over the last few months, we've made a few fun variations on this:

- [A phone number that responds with an SSTV-encoded fish](https://queercomputerclub.ca/projects/quecey-voip/) by [adryd](https://adryd.com/) and [blackle](https://www.blackle-mori.com/)
- ["22:22 Bake a Dish," using random Allrecipes photos](https://tris.fyi/dish/) by [tris](https://tris.fyi/)
- [A rotating Minecraft-style fish](https://fish.lftq.in/) by [AlpacaFur](https://lukefelixtaylor.com/)

"Make a fissh" was written by myself and my girlfriend [Ava](https://avasilver.dev/) based on an idea from my girlfriend [Mia](https://miakizz.quest/). It's our contribution to the weird and wonderful world of fish generators.

# Wish, bubble tea, and lip gloss

I got the idea for an SSH-based application from [terminal.shop](https://terminal.shop/) (an SSH-based coffee beans store). My first idea was to create a user whose login "shell" is just the fish application, similar to how [git-shell](https://git-scm.com/docs/git-shell) only allows running Git commands. However, I couldn't find a way to make OpenSSH require neither a password nor a public key. I suppose there's definitely a good reason for that, but it meant I needed to look elsewhere.

Looking into how terminal.shop implemented their solution, I stumbled upon [Wish](https://github.com/charmbracelet/wish), a Go library designed for "SSH apps." I decided to build this within the [Charm](https://charm.sh/) ecosystem, using Wish, [Bubble Tea](https://github.com/charmbracelet/bubbletea) for layout, and [Lip Gloss](https://github.com/charmbracelet/lipgloss) for "styling" (i.e., ANSI escape codes).

This stack imposed some requirements on the project structure: this was probably my first model-view-controller app since taking Fundamentals of CS 2 and I definitely would not have picked Go first. The MVC architecture works fine for something like this (although I would've preferred something a bit more component-based / React-y). I found the docs for the Charm projects pretty lackluster, and was often faced with undocumented behavior or limitations that I couldn't find reference of online. (I probably should've realized that the number of GitHub stars probably didn't correlate to the amount of actual use that the library gets...)

I won't pretend to have insightful commentary on Go after using it for a tiny toy project, but I honestly struggle to see myself reaching for it in any situation. My first impression is that it's the complexity of Rust without any of the error handling, memory safety, or performance benefits, with more than its fair share of strange syntax or stdlib quirks, coupled with tooling that makes strange decisions at times.

That said, for a toy project, I got a huge amount of learning out of this, so I can't really complain :)

# A fishy dataset

With the stack out of the way, it's time to actually build this thing. The most important part of a fish generator is the fish it generates. I decided to go the easy route and source fish ASCII art from [ascii.co.uk](https://ascii.co.uk/art/fish). One thing I like is that most artists leave their initials somewhere in the drawing. I wish I could link to some of the ASCII artists directly from the fish page, but unfortunately, the site doesn't give any other attribution.

# Finishing touches

![](fissh/about.png)

Getting the user's timezone right is another integral part of fish generation. Web-based generators get this easily from the JavaScript `Date` API, but for other protocols, it can take some creativity. The aforementioned SSTV fish telephone line, for instance, just accepts any time ending in `:11`.

With a terminal, though, we get a bit more information: the user's IP address. The app uses [`ipinfo.io`](https://ipinfo.io/) as a geolocation database since their free tier seemed generous and they helpfully provide a `timezone` key in their output. As such, the server can ensure each user gets the fish in their corresponding timezone (assuming the GeoIP database is accurate).

No app would be complete without a short "about" page, let alone one with so many friends to credit. I took advantage of [OSC 8 escape sequences](https://gist.github.com/egmontkob/eb114294efbcd5adb1944c9f3cb5feda) to embed links to the fish dataset and various folks' websites. These work in many popular terminal emulators, but not all, and there's no method to query if a terminal supports OSC 8 and fall back to including full URLs otherwise.

# Deployment

Deploying something that runs on port 22 on a server that you presumably also need to SSH into is an annoying situation, and I've had enough bad experiences messing up an SSH config and locking myself out of a VPS that I decided to just spin up a new one for this. (Oracle Cloud Free Tier my beloved!) That said, switching OpenSSH to port 2222 and running this on port 22 largely went off without a hitch.

![](fissh/comeback.png)
