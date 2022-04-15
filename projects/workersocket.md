---
title: WorkerSocket
description: A JavaScript library to run a WebSocket inside of a Web Worker.
image: default.png
created: "2022"
repo: Breq16/workersocket
tags: [javascript, networking]
---

```bash
npm i workersocket
```

# Overview

This is a library I made to run a WebSocket inside of a Web Worker in the browser. It exports a `WorkerSocket` object which behaves as closely as possible to a browser WebSocket.

# Motivation

I wrote this while implementing my [fork of roslib](https://github.com/Breq16/roslib/), a library for communicating with a [`ros`](https://www.ros.org/) server through the [`rosbridge`](http://wiki.ros.org/rosbridge_suite) protocol. `roslib` is typically used to build a web-based monitoring UI for some type of robot.

The original `roslib` hijacked a browserify library called [`webworkify`](https://github.com/browserify/webworkify) to run a WebSocket through a Web Worker, but `webworkify` doesn't bundle with Vite or Webpack 5.

The reason `roslib` defaults to putting a WebSocket inside of a Web Worker is to make sure that data is pulled away from the server as quickly as possible, even if it ends up building up in the web worker. Due to an oversight in the `rosbridge` server, if a client can't pull information quickly enough, then the server will use excessive resources caching data. This [pull request](https://github.com/RobotWebTools/roslibjs/pull/317) for the original `roslib` describes the issue in more detail. Generally, the software on the robot is more important than the monitoring UI, so offloading the queueing to a background thread in the UI client makes sense.

# Technical Description

The library consists of two parts: the web worker itself, and the `WorkerSocket` implementation.

The `WorkerSocket` class mimics the API of a `WebSocket`, but forwards messages to the web worker. The web worker then handles the actual socket. The `WorkerSocket` class maintains an array of listeners for each event and calls each one as necessary. It also generates a unique ID for each `WorkerSocket` class instantiated, which is then sent along with all messages to the web worker. The worker maintains a mapping from IDs to socket instances.

The web worker is constructed using an object URL. This technique allows the worker to be bundled with any bundler without any special handling. It is somewhat unintuitive, though, using `Function.toString()` to turn the worker implementation into a string, then placing it into an [immediately-invoked function expression](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) using string manipulation. This is then turned into an object URL from which the worker is loaded.

```js
const workerURL = URL.createObjectURL(
  new Blob(["(" + workerImpl.toString() + ")();"], {
    type: "text/javascript",
  })
);

const worker = new Worker(workerURL);
```

Testing is performed using Chai in the browser (and using Puppeteer to run headlessly).

# Results

It seems to work well. That said, there are so many edge cases with the behavior of WebSockets in the browser that I'm a bit hesitant to use it. I've written plenty of tests to cover common use cases, and I don't know what I would add, but I also don't feel like the test suite is entirely complete.

I've published the result to `npm` though, in case others want to make use of this.
