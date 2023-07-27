---
title: In Defense of Really Long Merge Requests
description: Massive diffs aren't anything to fear.
tags: [ci, software]
---

> Disclaimer: This article may or may not be an application of [Cunningham's Law](https://meta.wikimedia.org/wiki/Cunningham%27s_Law). I'd love to hear about how other teams work and why people like (or dislike!) their current way of doing things.

I've maintained an (albeit small) [open-source library](https://github.com/breqdev/flask-discord-interactions/pulls?q=is%3Apr+is%3Aclosed), led software development on a [robotics team of >40 people](https://www.northeasternrover.com/), and worked on a professional software team at co-op. Through this, I've gotten to experience a range of code review styles and merge request etiquette. A common piece of wisdom I've seen tends to be: "keep your merge requests small, so they are easily reviewable." Conventional wisdom states that longer merge requests are more difficult to review -- obviously this is true, since there are more changes to look through. I'd like to argue, however, that _in the long run_, writing longer merge requests can save time and effort for a team.

# Breaking features down is burning developer effort

Suppose you've set out to implement a feature, and you've ended up with a much larger implementation than you expected. Should you split that implementation into smaller merge requests to make life easier for your reviewers?

What makes breaking up merge requests tricky is that **you'll need to verify that the state of the repository in between your two merge requests is valid.** You need to create an intermediate version, then test that intermediate version. Semantically, this "in-between" version might make no sense, since it contains a partially-completed feature.

If you're using a tool like Rust's [clippy](https://doc.rust-lang.org/nightly/clippy/) to analyze your code, the intermediate version might need to be littered with `#[allow(dead_code)]` or your language's equivalent in order to pass CI. This clutters the commit history and provides no real value. And what if you accidentally leave in one of those `#[allow(dead_code)]` functions later?

Splitting a merge request into more than two parts makes this even more complicated. In many cases, it just isn't practical to break a single feature into multiple semantically reasonable and CI-passing intermediate steps.

# More frequent code reviews means more "round trips" and greatly reduced speed

When you submit a merge request, you're essentially handing things off to your reviewer. A good reviewer will get back to you in 24 hours, but someone who's busy with other work might take even longer. In this intermediate time, what do you do? In most cases, you'll end up switching to another project, losing steam on the feature you were working on. Only when they get back to you can you resume work on the feature. The more of these "round trips" you have to deal with, the longer it will take you to implement useful features.

The good news is that there are ways to gather feedback from others in the middle of implementing a feature that don't slow you down! You can set up a 1-on-1 to talk through design decisions, exchange UML drawings, pair program, or just Slack your teammate a link to your branch. They can then respond at their own pace, without blocking you from doing your work.

# If merge requests queue up, addressing concerns becomes nontrivial

If you're impatient, you might not wait for one of your merge requests to be approved before starting work on the next. After all, they're all part of one feature, so it makes sense to tackle them sequentially. So you start your `feature-2` branch before your `feature-1` branch is merged in.

In order to pull this off, however, you'll need to branch `feature-2` _off of_ `feature-1`, since the changes in `feature-1` aren't in `main` yet. This works fine for now. And if your code is good, it's not a problem, since you'll just merge `feature-1` into `main` first, then merge `feature-2` in after.

This falls apart as soon as your reviewer points out an issue with `feature-1`. You switch to that branch and commit your fixes. Then, while waiting to hear back from your reviewer, you go back to developing on `feature-2`. But `feature-2` doesn't have those changes, meaning you'll have to either rebase it onto `feature-1` (which is annoying if any teammates also checked out that branch) or merge `feature-1`'s most recent commit into it (which clutters up history). Then your reviewer requests more changes, and you need to do the song and dance once again. You probably can't just merge in all of your changes into `feature-2` once `feature-1` gets merged, since they're so tightly coupled.

This gets quadratically worse if you have a longer chain of merge requests. I've seen situations like this up to four layers deep, where each change to the oldest MR require rebasing every other MR in sequence. This is an awful experience for everyone involved, and it leads to comments on merge requests like "Fixed this in [later merge request], please approve this one now," which is definitely not the way things should work.

# Reviewers need to consider a certain amount of context regardless

When you're reviewing code changes, you aren't just thinking about the code itself. You need to consider everything else in the system that the code interacts with.

Suppose you're incrementally replacing a control stack for a device written in ROS. Conceptually, the new and old implementations will be quite different.

You could go about this by rewriting each node in turn, each as its own merge request. You'll need to plan an order to migrate nodes in that allows you to reach the "target" system architecture, but you'll also need to not break the existing system along the way, since the system should be functional at each point in between the merge requests. If you want to rename certain topics shared between nodes, or change the message type passed between nodes, you'll need to carefully plan when you do that as well.

Then, your reviewers will need to consider each change in the context of both the existing system and the future/new system. Again, you can't break things in between merge requests, but you also want to make sure you're architecting things properly for the final system.

Or, you can just replace the old system with a new system in a single, atomic merge request, allowing your reviewers to focus exclusively on reviewing the new system.

For a different example: consider implementing a program that bridges a serial, I2C, or SPI connection and a Redis pub/sub channel, for instance forwarding messages from serial into Redis and vice versa. Suppose you want your program to handle several data types and have a consistent interface on each hardware interface.

You could break this feature into separate merge requests for each interface. Then, when your reviewers went to review _each_ merge request, they would need to understand the management of the Redis connection, the datatype system used throughout the codebase, the differences in protocol between each of the planned hardware interfaces, and the handling of the specific hardware interface actually implemented in the MR.

This isn't too bad if these merge requests are reviewed one after the other, but what if a week or more goes by between each of them? Your reviewer will need to remember each of these things, every time, ultimately leading to spending more time on review compared to just reviewing everything all at once.

# Long diffs _should_ take longer to review

There's a common refrain that "you can't possibly catch everything in a patch of more than X lines."

Consider this: would you rather read one chapter of a book every week or two, or spend a few days reading as much as you can? Which would allow you to better follow the story? Keep track of the characters? Understand the book at a deeper level?

I see no fundamental reason why a reviewer would have a lower success rate at spotting issues per line of code for a larger diff as opposed to a smaller one. It will require more time to read and understand, and it will require a reviewer to potentially be more deliberate in their review, but it ultimately leads to the same quality assurance with substantially reduced effort for the development team.
