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

  const lastItem = data?.querySelector("item") ?? data?.querySelector("entry");

  let timeSince = "";
  let postTitle = "";
  let postLink = "";

  if (lastItem) {
    const itemDate =
      lastItem.querySelector("pubDate")?.textContent ||
      lastItem.querySelector("published")?.textContent ||
      lastItem.querySelector("updated")?.textContent;

    const pubDate = new Date(itemDate ?? "");
    timeSince = pubDate.toLocaleDateString();

    const linkElement = lastItem.querySelector("link");

    postLink =
      linkElement?.getAttribute("href") ?? linkElement?.textContent ?? "";

    if (!postLink.startsWith("http")) {
      postLink = `https://${base}${postLink}`;
    }

    postTitle = lastItem.querySelector("title")?.textContent ?? "";
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
    author = author
      .replace(/https?:\/\/.*\//, "")
      .replace(/.*@.*\..*/, "")
      .trim();
  }

  const [justCopied, setJustCopied] = useState(false);

  return (
    <div className="flex flex-row gap-4 rounded-xl bg-gray-800 p-4">
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
      <div className="flex w-full flex-col gap-2">
        <div className="flex flex-row items-start gap-3 text-2xl">
          <div className="flex flex-grow flex-col gap-2 font-display sm:flex-row sm:items-end">
            <h2 className="text-3xl">
              {data?.querySelector("title")?.textContent || base}
            </h2>
            <p className="text-lg text-gray-200">
              {author ? `by ${author}` : null}
            </p>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(url);
              setJustCopied(true);
              setTimeout(() => setJustCopied(false), 1000);
            }}
            className="hidden sm:block"
          >
            <FontAwesomeIcon
              icon={justCopied ? faCheck : faCopy}
              className="hover:text-brookeorange focus-visible:text-brookeorange"
            />
          </button>
          <a href={siteUrl} className="hidden sm:block">
            <FontAwesomeIcon
              icon={faExternalLink}
              className="hover:text-brookeorange focus-visible:text-brookeorange"
            />
          </a>
        </div>
        <p className="flex-grow font-body italic">
          {data?.querySelector("description")?.textContent}
        </p>

        {postTitle && (
          <div className="group relative">
            <div className="relative z-10 flex flex-row items-center justify-between rounded-lg bg-white px-3 py-2 text-black">
              <a
                className="font-display text-xl hover:underline focus-visible:underline"
                href={postLink}
              >
                {postTitle}
              </a>
              <p className=" hidden font-body sm:block">{timeSince}</p>
            </div>
            <div className="absolute inset-0 translate-x-0 translate-y-0 rounded-lg bg-panpink transition-transform group-hover:translate-x-2 group-hover:translate-y-2 group-focus:translate-x-2 group-focus:translate-y-2" />
          </div>
        )}
      </div>
    </div>
  );
}

const FEEDS = [
  "https://adryd.com/feed.xml",
  "https://breq.dev/rss.xml",
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
];

export default function Feeds() {
  return (
    <Page className="bg-black px-4 py-4 text-white md:py-12">
      <SEOHelmet title="my favorite rss feeds" />
      <div className="mx-auto w-full max-w-xl text-balance px-2 py-8">
        <h1 className="text-center font-display text-6xl">blogroll</h1>
        <p className="mt-8 text-center font-display text-xl">
          my favorite rss feeds from friends and acquaintances of mine, covering
          technology, queer community, and life.
        </p>
      </div>
      <div className="mx-auto flex max-w-2xl flex-col gap-8 sm:p-2 sm:p-8">
        {FEEDS.map((feed) => (
          <Feed key={feed} url={feed} />
        ))}
      </div>
    </Page>
  );
}
