import "./src/styles/global.css"

// https://medium.com/@fabianterh/fixing-flashing-huge-font-awesome-icons-on-a-gatsby-static-site-787e1cfb3a18
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

require("prismjs/themes/prism.css")

require("katex/dist/katex.min.css")

require("lite-youtube-embed/src/lite-yt-embed.js")
require("lite-youtube-embed/src/lite-yt-embed.css")
