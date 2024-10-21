import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";

export default function Colophon() {
  return (
    <Page className="flex flex-col gap-6 px-4 py-8">
      <SEOHelmet title="Colophon - breq.dev" />
      <h1 className="text-center font-display text-5xl">Colophon</h1>

      <div className="mx-auto flex w-full max-w-xl flex-col gap-4 font-body">
        <p>
          This site is made with TypeScript, React, Next, and Tailwind, and is
          hosted on Vercel. The intro page is made with ThreeJS. Icons are by
          FontAwesome. Most content is written in MDX.
        </p>
        <p>
          The cat in the bottom left was implemented by my friend{" "}
          <a
            href="https://adryd.com"
            className="font-mono text-panblue-dark hover:underline focus:underline dark:text-panblue-light"
          >
            adryd
          </a>
          . The computer at the bottom is a link to{" "}
          <a
            href="https://home.breq.dev/"
            className="font-mono text-panblue-dark hover:underline focus:underline dark:text-panblue-light"
          >
            home.breq.dev
          </a>
          , a site hosted on my home desktop (when it's online). That site is
          written by hand in raw HTML. The icon is an SVG drawing I made myself
          (with lots of help from Ari).
        </p>
        <p>
          A few "glue scripts" (mostly to grab GitHub Sponsors and RSS feeds
          without CORS) are hosted on Cloudflare Workers.
        </p>
        <p>
          Many parts of this website are directly inspired by my friends. Thank
          you!
        </p>
        <p>
          A version of this site has been running since 2019 (albeit under a
          different name back then), with projects dating back to 2014. Project
          writeups have been carried forward since the beginning.
        </p>
      </div>
    </Page>
  );
}
