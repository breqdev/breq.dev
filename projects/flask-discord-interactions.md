---
layout: project
title: Flask Discord Interactions
description: A Python library for making HTTP-based Discord bots with Flask.
image: breqbot-lite.png
created: "2021"
repo: breqdev/flask-discord-interactions
demo: https://breqbot-lite.breq.dev/
tags: [python, flask, discord]
---

![](breqbot-lite.png)

<Caption>
Some commands for Breqbot Lite, a bot I made with this library.
</Caption>

# Overview

Recently, Discord introduced a new Slash Commands feature that allows bots to integrate using webhooks. This is a library that handles registering the commands, receiving interactions, sending responses, sending followup messages, and including message components like clickable buttons in your message. It's written as a Flask extension, so you can add other pages to the app and handle scaling/serving like any other Flask app.

# Motivation

Most Discord bots and libraries use a Bot user to connect to the Discord API. Bot users interact with Discord in a similar way to actual Discord users: they connect over a WebSocket and then send and receive events such as messages. This approach works well for basic bots, but it makes it difficult to scale. Alternatively, webhook-based bots can be deployed behind a load balancer and scaled up or down as needed without worrying about overloading the websocket or allocating different servers to different processes.

That said, the webhook approach is significantly more limited. Webhook bots can't manage channels, reactions, direct messages, roles, or most of the other features in Discord. However, for basic bots that don't need these features, webhook bots can be easier to develop and deploy.

# Technical Description

The library is designed to be similar to the popular [Discord.py](https://github.com/Rapptz/discord.py) library. It's probably better to show than to tell:

```python
import os
from flask import Flask
from flask_discord_interactions import DiscordInteractions

app = Flask(__name__)
discord = DiscordInteractions(app)
app.config["DISCORD_CLIENT_ID"] = os.environ["DISCORD_CLIENT_ID"]
app.config["DISCORD_PUBLIC_KEY"] = os.environ["DISCORD_PUBLIC_KEY"]
app.config["DISCORD_CLIENT_SECRET"] = os.environ["DISCORD_CLIENT_SECRET"]


@discord.command()
def ping(ctx):
    "Respond with a friendly 'pong'!"
    return "Pong!"


discord.set_route("/interactions")
discord.update_slash_commands(guild_id=os.environ["TESTING_GUILD"])

if __name__ == '__main__':
    app.run()
```

The `discord.command()` decorator creates a `SlashCommand` and adds it to the application, and the `discord.set_route()` function adds an HTTP route that handles interaction events. The library will automatically register the commands and remove old ones on launch. When it receives an interaction from Discord, it will verify the signature, parse the command options, run the command, and return the result.

# Results

This was one of the first OAuth2 projects I made, which was cool. It works well enough for my basic testing bot. Overall, I'm pretty proud of this one: I saw a gap where a library didn't exist, and I developed something to fill it.

I'm also really glad to see that a small community has sprung up around this library. I listed it in the official Discord Developer Documentation, among the numerous other Slash Command libraries. So far, four other people have contributed code to the project through pull requests, and 22 issues have been filed in the issue tracker. It's been an interesting experience to receive a bug report or feature request from a community member and then figure out how to prioritize it and how best to patch it.
