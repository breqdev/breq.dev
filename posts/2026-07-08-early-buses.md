---
title: Boston's earliest buses
description: The little-known system of early-morning MBTA routes
tags: [boston, transit]
---

Here in Boston, our subway trains stop running around 1 AM and don't start until after 5 AM the next day. So what do you do if you need to get somewhere early, like catching an early-morning flight or getting downtown in time to watch the sunrise?

Lucky for you, the MBTA operates a network of special early-morning bus routes that converge downtown at Haymarket Station and at Logan Airport. If you weren't aware of this, it might be because the only official indication that they exist at all can be found from tiny footnotes in the schedule pamphlets or the "uncommon destinations" dropdown on each route's webpage.

That said, myself and my friends can vouch for the fact that these mysterious buses are real! We've used them to get downtown in time to watch the sunrise, to catch an early morning flight, as part of a 24-hour scavenger hunt, and for even more adventures.

In an attempt to demystify these routes, I spent some time creating a "subway-style" map of the network, showing intermediate stops and departure times.

![](early-buses/early-bus-network.svg)

To make this map, I included every inbound route that departs before 5 AM, arrives before 5:20 AM, and is useful to get to either downtown or the airport (i.e., excluding routes designed to connect with the first inbound subway trains, or bus routes with an unusually early outbound trip due to the lack of a garage near their outbound terminus).

One thing I tried to emphasize is that there's a surprising amount of opportunity for chaining these routes together. From Mattapan, taking either Route 28 departure lines you up nicely to transfer at Nubian to the corresponding 15/171 departure to the airport. The 89/93 and the 57 both arrive at Haymarket early enough that you can transfer to the 116 to reach the airport. Or, if you're going somewhere other than terminal C and want to skip the walk, you can transfer from the 57 to the first Logan Express Back Bay bus of the day.

The best existing resource I could find before drawing this map is this [report from the Boston Metropolitan Planning Organization](https://www.bostonmpo.org/data/calendar/htmls/2013/MPO_0711_Early_Morning_Transit.html). Although it's an excellent academic resource, it's not directly useful as a bus user as it uses the non-public internal identifiers for each bus route instead of the public ones and it lacks the actual timetable information. My research for making this map came from a mix of that report and some Python scripts I used to extract the earliest routes from the MBTA's GTFS data.

If you're still dubious that these mysterious bus routes even exist, here are some photos from my lovely friend [June](https://june.quest/).

<div class="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-3xl mx-auto">

![](early-buses/89-93-haymarket.jpg)

![](early-buses/116-terminal-c.jpg)

</div>
