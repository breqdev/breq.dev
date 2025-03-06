---
layout: project
title: BlockChat
description: A simple Blockchain-based chat app.
image: blockchat.png
created: 2018
repo: breqdev/blockchat
status: old
tags: [blockchain, python]
writeup: 2020-10-09
---

![](blockchat.png)

# Description

BlockChat is a simple decentralized chatroom application that uses a blockchain to store the message data.

# Motivation

This project was something I quickly threw together in order to better understand blockchain while the Bitcoin boom was taking place. I couldn't find a resource that explained proof-of-work, consensus, and other blockchain-related topics well enough for me to understand them, so I decided to try making my own blockchain application, loosely based around a couple of examples I saw around the Internet.

# Technical Description

At its core, a blockchain is a distributed, public ledger, so I decided that the easiest blockchain application to write would be a chatroom. At the time, it seemed much easier than a digital token or currency system.

I started by implementing the blockchain data structure. As the name implies, this is a chain of blocks, where each new block contains the cryptographic hash of the previous block, so that old data cannot be modified without also re-writing all of the new data.

Then, I moved on to the proof-of-work algorithm. This algorithm is designed to be computationally expensive so that new blocks take a significant amount of time to "mine". Because of this, if somebody wanted to re-write a previous part of the blockchain, it would take a prohibitively large amount of computing power to then re-write all of the blocks that follow.

For my proof-of-work algorithm, I decided to require finding an integer with a hash that starts with a certain number. Solutions to this are difficult to find (as miners have to blindly guess at what the number is) but easy to verify (just hash the potential number and see if the first digits match). To make sure no miner tries to re-use the same solution multiple times, I required each new solution to be a larger number than the previous one.

I didn't put too much effort into optimizing my miner implementation - it only uses a single CPU thread, sequentially searching numbers. In an actual blockchain scenario, this isn't a good choice, as anyone who could write a better miner (by using multiple CPU cores, GPUs, or even FPGAs) would then have much more computational power compared to the rest of the network. I also didn't make the difficulty of the proof-of-work change in response to miner availability. This also isn't a good idea for a real blockchain, as periods of low miner activity may not be able to mine new blocks quickly. Worse, if many more miners decided to mine my blockchain, a too-easy proof-of-work would make it easier for malicious miners to modify the blockchain.

Next, I worked on the consensus algorithm. For a node to accept new blocks, it first needs to verify the proof-of-work values and hashes to ensure the chain it receives is valid. Assuming it is, the node needs to choose which version of the chain it should prefer. In my implementation, the node will simply choose the longest version.

Finally, I needed to devise the protocol which would allow nodes to add messages to the blockchain and compare versions with other nodes. I decided to use a REST API, because it was the easiest solution.

# Results

In the end, the program did work. However, there were a few corners I cut that made the end result kind of impractical.

The first issue was that I did not include distinction between nodes and miners. In actual blockchains, nodes that want to put data on the blockchain will send that data to many different miners, so that their data would likely be included in the next block, regardless of which miner mined it. In my demo, in order for anybody to send a message to the chatroom, they have to be the one to mine the next block. If the blockchain is scaled beyond just a few miners, the chances of this happening would be nearly zero, so actually using the chatroom would be almost impossible.

The second issue is the lack of reward for miners. Initially, this was one of the things I didn't intend to include, because I wanted to keep things simple. But because the miners have no incentive to mine blocks, it would be difficult to get benevolent miners to participate in the blockchain, and it would be easy for "evil" miners to gain enough of a share of the computing power to undermine the stability provided by proof-of-work.

While the end result wasn't something practical to deploy, working on this project definitely helped me understand the underlying design of blockchain platforms. It also answered many questions I had about the technology, such as "Why do non-currency applications like [Namecoin](https://en.wikipedia.org/wiki/Namecoin) still have tradeable tokens?" and "How exactly does proof-of-work ensure the stability of the blockchain system?", so I would definitely consider it a success.
