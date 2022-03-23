# Motivation

I wanted to be able to embed Tweets on my website, so I looked into React-based Twitter embed libraries. The two that I found, [`react-twitter-widgets`](https://github.com/andrewsuzuki/react-twitter-widgets) and [`react-twitter-embed`](https://github.com/saurabhnemade/react-twitter-embed) operated similarly: they both used the Twitter widgets.

Twitter has a [system of widgets](https://developer.twitter.com/en/docs/twitter-for-websites/javascript-api/guides/set-up-twitter-for-websites) that can be embedded on a website. They work by using a JavaScript library to dynamically include iFrames onto the page. I'm not a huge fan of this approach, for a couple reasons:

- The iFrames tend to load in after everything else on the page, leading to a huge layout jump.
- Embedding iFrames uses more resources.
- Users who use tracker-blockers, like Firefox Enhanced Tracking Protection, might not see the Tweet at all.
- Allowing Twitter to execute JavaScript on my webpage exposes my users to tracking without their consent.

I decided to try making my own Twitter embed, built as a pure React component without any imperative DOM manipulation.
