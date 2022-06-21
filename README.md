# hey, i'm brooke, and this is my website.

if you're just here to browse, you'll have a much better experience over on [breq.dev](https://breq.dev/).

but i've opened this up to let you peek into the internals if you'd like. look at my use of [nextjs plugins](next.config.js), skim through how i [manage tags](utils/tags.js), glance through how i made that [3D scrolling](src/components/index/Greeting.js) effect, or understand how i theme the [code snippets](src/components/markdown/Code.js). or, you could always spoil the [easter egg](src/components/index/TerminalWrapper.js) for yourself. nobody's gonna know you cheated but you.

## stack details

- react + nextjs (primary framework)
- mdx (content)
- font awesome (icons)
- three.js + react-three-fiber (3d animation)
- katex + remark-math + rehype-katex (math typesetting)
- postcss + tailwind (styling)
- javascript-terminal + react-terminal-component (easter egg)
- lite-youtube-embed + react-twitter-notrack\* (embeds)
- remark-abcjs\* (music typesetting)
- swr (data fetching)
- prismjs + prism-react-renderer (code styling)

\* denotes my own packages

## model attribution

a few 3D models in this page were made by some fine folks on GrabCAD.

- RPi: https://grabcad.com/library/raspberry-pi-4-model-b-5 by Mateusz Zelek
- Arduino: https://grabcad.com/library/arduino-uno-r3-8 by Dũng Phan

## structure

content on the site is structured into the following categories:

- pages (one-offs written in JSX like [/contact](https://breq.dev/contact))
- posts (blog entries, [/blog](https://breq.dev/blog) and [/2022/01/03/unified](https://breq.dev/2022/01/03/unified) etc)
- projects (project writeups, [/projects](https://breq.dev/projects))
- writing (creative writing, [/writing](https://breq.dev/writing))
- photos (taken by me on trips or wherever, [/photos](https://breq.dev/photos))

## license

[mpl 2.0](https://choosealicense.com/licenses/mpl-2.0/) for code, [cc-by-nc-sa 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) for content.

made with <3 by breq.
