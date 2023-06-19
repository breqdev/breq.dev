import RSS from "rss";
import fs from "fs/promises";
import { PostInfo, getDateObject, getURL, slugComparator } from "./posts";
import { listContentFiles, loadMarkdown } from "./api";

export default async function generateRssFeed() {
  const posts = await listContentFiles("posts");

  const data = await Promise.all(
    posts.map((post) => loadMarkdown<PostInfo>(post))
  );

  const sorted = data.sort(slugComparator);

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

  sorted.forEach((post) => {
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
