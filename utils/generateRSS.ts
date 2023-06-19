import RSS from "rss";
import fs from "fs/promises";
import { PostInfo, getDateObject, getURL } from "./posts";
import { BasicMarkdownInfo } from "./api";

export default async function generateRssFeed(
  posts: (PostInfo & BasicMarkdownInfo)[]
) {
  const feedOptions = {
    title: "breq.dev - Brooke Chalmers",
    description: "Posts about tinkering with anything and everything!",
    site_url: "https://breq.dev",
    feed_url: "https://breq.dev/rss.xml",
    image_url: "https://breq.dev/opengraph.jpg",
    pubDate: new Date(),
    copyright: `All rights reserved, Brooke Chalmers ${new Date().getFullYear()}`,
  };

  const feed = new RSS(feedOptions);

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: getURL(post.slug),
      categories: post.tags,
      date: getDateObject(post.slug),
    });
  });

  await fs.writeFile("./public/rss.xml", feed.xml({ indent: true }));
}
