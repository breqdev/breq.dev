import React, { useLayoutEffect, useRef, useState } from "react";
import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAtom,
  faCheck,
  faExternalLink,
  faRssSquare,
} from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import useSWR from "swr";
import { icon } from "@fortawesome/fontawesome-svg-core";

async function fetchRssFeed(url: string) {
  const params = new URLSearchParams({ url });
  const res = await fetch(`https://feeds.breq.workers.dev/?${params}`);
  const text = await res.text();
  const parser = new DOMParser();
  return parser.parseFromString(text, "text/xml");
}

type RssFeed = {
  url: string;
  favicon: HTMLImageElement | SVGElement;
  title: string;
  description?: string;
  author?: string;
  siteUrl: string;
  postTitle: string;
  postLink: string;
  pubDate: Date | null;
  timeSince: string;
};

async function parseRssFeed(url: string, data: Document): Promise<RssFeed> {
  const base = new URL(url).hostname;

  let faviconUrl = `https://${base}/favicon.ico`;
  if (data?.querySelector("image")) {
    faviconUrl =
      data.querySelector("image")?.querySelector("url")?.textContent ??
      faviconUrl;
  } else if (data?.querySelector("logo")) {
    faviconUrl = data.querySelector("logo")?.textContent ?? faviconUrl;
  } else if (data?.querySelector("icon")) {
    faviconUrl = data.querySelector("icon")?.textContent ?? faviconUrl;
  }

  if (!faviconUrl.startsWith("http")) {
    faviconUrl = `https://${base}${faviconUrl}`;
  }

  let favicon: HTMLImageElement | SVGElement = new Image();
  favicon.src = faviconUrl;
  favicon.className = "rounded-2xl w-full h-full";

  await new Promise<void>((resolve, reject) => {
    const switchToPlaceholder = () => {
      favicon = icon(faRssSquare, {
        classes: "text-7xl text-brookeorange",
      }).node[0] as SVGElement;
    };

    (favicon as HTMLImageElement).onload = () => {
      resolve();
    };
    (favicon as HTMLImageElement).onabort = () => {
      switchToPlaceholder();
      resolve();
    };
    setTimeout(() => {
      switchToPlaceholder();
      resolve();
    }, 1000);
  });

  const title = data?.querySelector("title")?.textContent || base;
  const description =
    data?.querySelector("description")?.textContent ??
    data?.querySelector("subtitle")?.textContent;

  const items = [
    ...data?.querySelectorAll("item"),
    ...data?.querySelectorAll("entry"),
  ];

  const itemData = items.map((lastItem) => {
    let timeSince = "";
    let pubDate = null;
    let postTitle = "";
    let postLink = "";

    if (lastItem) {
      const itemDate =
        lastItem.querySelector("pubDate")?.textContent ||
        lastItem.querySelector("published")?.textContent ||
        lastItem.querySelector("updated")?.textContent;

      if (itemDate) {
        pubDate = new Date(itemDate);
        timeSince = pubDate.toLocaleDateString();
      }

      const linkElement = lastItem.querySelector("link");

      postLink =
        linkElement?.getAttribute("href") ?? linkElement?.textContent ?? "";

      if (!postLink.startsWith("http")) {
        postLink = `https://${base}${postLink}`;
      }

      postTitle = lastItem.querySelector("title")?.textContent ?? "";
    }

    return { postTitle, postLink, pubDate, timeSince };
  });

  const { postTitle, postLink, pubDate, timeSince } = itemData.sort((a, b) => {
    return (b.pubDate?.getTime() ?? 0) - (a.pubDate?.getTime() ?? 0);
  })[0];

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

  return {
    url,
    favicon,
    title,
    description: description ?? undefined,
    author: author ?? undefined,
    siteUrl,
    postTitle,
    postLink,
    pubDate,
    timeSince,
  };
}

async function fetchAll(urls: string[]) {
  return Promise.all(
    urls.map((url) => fetchRssFeed(url).then((data) => parseRssFeed(url, data)))
  );
}

function Feed({ feed }: { feed: RssFeed }) {
  const [justCopied, setJustCopied] = useState(false);

  const imageContainer = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const image = feed.favicon;
    const container = imageContainer.current;

    container?.appendChild(image);
    return () => {
      container?.removeChild(image);
    };
  }, [feed.favicon]);

  return (
    <div className="flex flex-row gap-4 rounded-xl bg-gray-800 p-4">
      <div
        className="hidden h-24 w-24 flex-shrink-0 grid-cols-1 place-items-center sm:grid"
        ref={imageContainer}
      ></div>
      <div className="flex w-full flex-col gap-2">
        <div className="flex flex-row items-start gap-3 text-2xl">
          <div className="flex flex-grow flex-col gap-2 font-display sm:flex-row sm:items-end">
            <h2 className="text-3xl">{feed.title}</h2>
            <p className="text-lg text-gray-200">
              {feed.author ? `by ${feed.author}` : null}
            </p>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(feed.url);
              setJustCopied(true);
              setTimeout(() => setJustCopied(false), 1000);
            }}
          >
            <FontAwesomeIcon
              icon={justCopied ? faCheck : faCopy}
              className="hover:text-brookeorange focus-visible:text-brookeorange"
            />
          </button>
          <a href={feed.siteUrl}>
            <FontAwesomeIcon
              icon={faExternalLink}
              className="hover:text-brookeorange focus-visible:text-brookeorange"
            />
          </a>
        </div>
        <p className="flex-grow font-body italic">{feed.description}</p>

        {feed.postTitle && (
          <div className="group relative">
            <div className="relative z-10 flex flex-row items-center justify-between rounded-lg bg-white px-3 py-2 text-black">
              <a
                className="font-display text-xl hover:underline focus-visible:underline"
                href={feed.postLink}
              >
                {feed.postTitle}
              </a>
              <p className=" hidden font-body sm:block">{feed.timeSince}</p>
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
  "https://suricrasia.online/blog/feed.xml",
  "https://alyx.sh/tags/post/index.xml",
  "https://pixilic.com/feed",
];

export default function Feeds() {
  const { data } = useSWR(FEEDS, fetchAll);

  return (
    <Page className="bg-black px-4 py-4 text-white md:py-12">
      <SEOHelmet
        title="my favorite rss feeds - breq.dev"
        description="a collection of rss feeds from my friends about technology, queer community, and life."
      />
      <div className="mx-auto w-full max-w-xl text-balance px-2 py-8">
        <h1 className="text-center font-display text-6xl">blogroll</h1>
        <p className="mt-8 text-center font-display text-xl">
          my favorite rss feeds from friends and acquaintances of mine, covering
          technology, queer community, and life.
        </p>
      </div>
      {data ? (
        <div className="mx-auto flex max-w-2xl flex-col gap-8 sm:p-8">
          {data
            .sort(
              (a, b) =>
                (b.pubDate?.getTime() ?? 0) - (a.pubDate?.getTime() ?? 0)
            )
            .map((feed) => (
              <Feed key={feed.url} feed={feed} />
            ))}
        </div>
      ) : (
        <div className="my-16 text-center text-5xl">
          <FontAwesomeIcon icon={faAtom} className="fa-spin" />
        </div>
      )}
    </Page>
  );
}
