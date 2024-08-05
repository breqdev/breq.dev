import React, { useState } from "react";
import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faExternalLink,
  faRssSquare,
} from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import useSWR from "swr";

const xmlFetcher = async (url: string) => {
  const params = new URLSearchParams({ url });
  const res = await fetch(`https://feeds.breq.workers.dev/?${params}`);
  const text = await res.text();
  const parser = new DOMParser();
  return parser.parseFromString(text, "text/xml");
};

function Feed({ url }: { url: string }) {
  const { data } = useSWR(url, xmlFetcher);
  const base = new URL(url).hostname;

  let favicon = `https://${base}/favicon.ico`;
  if (data?.querySelector("image")) {
    favicon =
      data.querySelector("image")?.querySelector("url")?.textContent ?? favicon;
  }

  let timeSince = "";
  const itemDate =
    data?.querySelector("item")?.querySelector("pubDate")?.textContent ||
    data?.querySelector("entry")?.querySelector("published")?.textContent;

  if (itemDate) {
    const pubDate = new Date(itemDate);
    const now = new Date();
    const diff = now.getTime() - pubDate.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    timeSince = `last post ${days} days ago`;
  }

  let siteUrl = url;
  const links = data?.querySelectorAll("link");
  if (links) {
    for (const link of Array.from(links)) {
      if (link.textContent) {
        siteUrl = link.textContent;
        break;
      }

      if (link.getAttribute("type") === "text/html") {
        siteUrl = link.getAttribute("href") ?? siteUrl;
        break;
      }

      if (link.getAttribute("rel") !== "self") {
        siteUrl = link.getAttribute("href") ?? siteUrl;
        break;
      }
    }
  }

  let author = data?.querySelector("author")?.textContent;
  if (author) {
    // remove URLs from author names
    // (hi mia!)
    author = author.replace(/https?:\/\/.*\//, "").trim();
  }

  const [justCopied, setJustCopied] = useState(false);

  return (
    <div className="flex gap-4 overflow-clip rounded-xl border-2 border-black p-4 dark:border-white">
      <object
        data={favicon}
        type="image/x-icon"
        className="hidden h-24 w-24 overflow-clip rounded-xl sm:block"
      >
        <div className="grid h-24 w-24 place-content-center">
          <FontAwesomeIcon
            icon={faRssSquare}
            className="text-7xl text-brookeorange"
          />
        </div>
      </object>
      <div className="flex w-full flex-col">
        <div className="flex flex-row items-start gap-3 text-2xl">
          <h2 className="flex-grow font-display text-3xl">
            {data?.querySelector("title")?.textContent || base}
          </h2>
          <button
            onClick={() => {
              navigator.clipboard.writeText(url);
              setJustCopied(true);
              setTimeout(() => setJustCopied(false), 1000);
            }}
          >
            <FontAwesomeIcon
              icon={justCopied ? faCheck : faCopy}
              className="hover:text-brookeorange focus-visible:text-brookeorange"
            />
          </button>
          <a href={siteUrl}>
            <FontAwesomeIcon
              icon={faExternalLink}
              className="hover:text-brookeorange focus-visible:text-brookeorange"
            />
          </a>
        </div>
        <p className="flex-grow italic">
          {data?.querySelector("description")?.textContent}
        </p>
        <div className="flex w-full flex-row justify-between text-lg text-gray-600 dark:text-gray-200">
          <p>{author ? `by ${author}` : null}</p>
          <p>{timeSince}</p>
        </div>
      </div>
    </div>
  );
}

const FEEDS = [
  "https://adryd.com/feed.xml",
  "https://breq.dev/rss.xml",
  "https://char.lt/blog.rss",
  "https://chowderless.com/feed.xml",
  "https://philo.gay/feed.xml",
  "https://gettinghome.substack.com/feed",
  "https://maia.crimew.gay/feed.xml",
  "https://www.mayank.co/blog/rss.xml",
  "https://miakizz.quest/feed.xml",
  "https://notnite.com/blog/rss.xml",
  "https://rosenzweig.io/feed.xml",
  "https://www.noblemushtak.com/blog/feed.rss",
  "https://tris.fyi/blog/rss.xml",
  "https://jacqueline.id.au/rss.xml",
];

export default function Feeds() {
  return (
    <Page>
      <SEOHelmet title="my favorite rss feeds" />
      <div className="mx-auto w-full max-w-xl text-balance px-2 py-8">
        <h1 className="text-center font-display text-6xl">my feeds</h1>
        <p className="mt-8 text-center font-body text-xl">
          my favorite rss feeds from friends and acquaintances of mine, covering
          technology, queer community, and life.
        </p>
      </div>
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-2 p-8">
        {FEEDS.map((feed) => (
          <Feed key={feed} url={feed} />
        ))}
      </div>
    </Page>
  );
}
