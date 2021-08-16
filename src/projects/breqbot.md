---
layout: project
title: Breqbot
subtitle: A Discord bot with minigames and utilities.
image: "../images/breqbot/website.png"
created: "2020"
repo: Breq16/breqbot
demo: https://bot.breq.dev/
---

![](/assets/images/breqbot/8ball.png){: .actual-size}

One of the many "just for fun" commands that Breqbot has.
{: .caption}

## Overview

Breqbot is a Discord bot that manages a virtual economy, provides several fun minigames, gives access to comics, and has a variety of other features. Users can add Breqbot to a Discord server with their friends, giving their community access to these features.

## Motivation

A couple things came together to make this project happen. First, one of my friends invited me to a Discord server where they were using a variety of other popular Discord bots. I wasn't a fan of how some of these bots ran their economy or other features, and I wanted to see if I could implement something better. Second, my work on [McStatus.js]({% link _hacks/mcstatus.md %}){:target="_blank"}'s backend using Heroku gave me experience working with microservice architectures, and I wanted to work on a more complex microservices project.

## Technical Description

A running Breqbot instance consists of three containerized processes: the web process, the Discord worker process, and the [Redis](https://redis.io/) instance.

### The Discord Worker

The discord worker is written using [discord.py](https://github.com/Rapptz/discord.py/){:target="_blank"} using its [bot commands framework](https://discordpy.readthedocs.io/en/latest/ext/commands/index.html){:target="_blank"}. This process listens for Discord events over the Discord Gateway, selects an appropriate command, and executes it. Here are some examples of these commands:

![](/assets/images/breqbot/2048.png){: .actual-size}
By adding reactions to the message (the arrow emojis), members of the Discord server can work together to play the famous browser game "2048." Breqbot will listen for these reactions, modify the internal game state, and update the game board displayed.

![](/assets/images/breqbot/profile.png){: .actual-size}
Breqbot allows a user to configure their profile, which can then be displayed on request by other users. These profiles are images drawn using [Pillow](https://pillow.readthedocs.io/en/stable/), a Python library for image manipulation.

![](/assets/images/breqbot/vex.png){: .actual-size}
Breqbot can pull Vex Robotics Competition data from [VexDB](https://vexdb.io/){:target="_blank"} and create a summary of a team's performance. Here's my team from 2019-2020.

![](/assets/images/breqbot/xkcd.png){: .actual-size}
Breqbot can share comics from a few series including the famous [xkcd](https://xkcd.com/){:target="_blank"}. Additionally, a worker task will continuously monitor these comics for updates, and it can be configured to automatically post them to certain channels.

![](/assets/images/breqbot/soundboard.png){: .actual-size}
The Soundboard app lets server members add sounds (in the form of YouTube links) and corresponding emoji. Then, if someone reacts to the soundboard using that emoji, the corresponding sound will play in the server's voice channel.

![](/assets/images/breqbot/roles.png){: .actual-size}
Discord has a powerful "Roles" feature to help identify members of a server, but it does not have a way for users to assign themselves roles. Breqbot provides a "reaction roles" menu system - by reacting to this message, a user can select which roles they would like to receive, and Breqbot will automatically modify their roles as necessary.

### The Redis Instance

Most of Breqbot's features rely on [Redis](https://redis.io/){:target="_blank"} to store user data. For example, the role menu will store the set of messages it needs to watch reactions for, and the profile feature will store a user's configuration in Redis. This allows the Discord worker to be restarted at any time with minimal disruption.

![](/assets/images/breqbot/reddit.png){: .actual-size}

One notable use of Redis is to cache Reddit posts. Breqbot uses [PRAW](https://praw.readthedocs.io/en/latest/){:target="_blank"} to automatically retrieve popular posts from Reddit to display. However, the Reddit API is slow, and it does not provide a method to choose a random popular post. Because of this, Breqbot uses a background task to periodically retrieve the 100 most popular posts from a variety of subreddits and store them in Redis. Then, when a user requests a post from one of these subreddits, Breqbot can simply retrieve it from its cache.

### The Web Process

![](/assets/images/breqbot/website.png)

The web process runs Breqbot's accompanying website. If a Discord server chooses to enable it, Breqbot can publish information about that server's economy and its members to a website URL. The web process will use Redis to get this information - it does not communicate directly with the Discord worker.

![](/assets/images/breqbot/portal.png){: .actual-size}
The Portal API allows other programs to connect to a Breqbot instance to provide additional functionality. In this example, the Portal (which was hosted on my laptop) will echo back any input it receives. A more practical use of this would be to build functionality that interacts with the real world, such as a remote-control robot that communicates over Discord.

Portal clients connect to Breqbot using WebSockets, which are handled by the web process. Requests and responses are sent between the Discord and Web processes through a Redis pub/sub channel. Management of Portal clients, including distribution of API keys, is handled by the Discord worker: if a user wants to register a new portal, they will receive their API keys through a direct message on Discord.

## Results

This was my first project that ended up being used by such a wide audience: many of my friends added it to their communities on Discord, and people were constantly requesting functionality or finding bugs. I really enjoyed the experience of developing this and using it with my friends, though, and it was rewarding to see other people enjoying my work.
