import RSS from "rss";
import fs from "fs/promises";
import { PostInfo, getDateObject } from "./posts";
import { listContentFiles } from "./api";
import { loadMarkdown } from "./markdown";
import { getSortedProjects } from "./projects";
import Markdown from "../components/markdown/Markdown";
import ReactDOMServer from "react-dom/server";

export default async function generateRssFeed() {
  const posts = await listContentFiles("posts");

  const postdata = await Promise.all(
    posts.map((post) =>
      loadMarkdown<PostInfo>(post, { loadBody: true, mode: "minimal" })
    )
  );

  const datedPosts = postdata.map((post) => ({
    ...post,
    date: getDateObject(post.slug),
  }));

  const projects = await getSortedProjects({ loadBody: true, mode: "minimal" });

  const datedProjects = projects.map((project) => ({
    ...project,
    date: new Date(project.writeup),
  }));

  const sorted = [...datedPosts, ...datedProjects].sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  const feedOptions = {
    title: "breq.dev",
    description:
      "hey, i'm brooke. this feed tracks blog posts and project writeups.",
    generator: "node-rss",
    site_url: "https://breq.dev",
    feed_url: "https://breq.dev/rss.xml",
    image_url: "https://breq.dev/rss.png",
    managingEditor: "Brooke Chalmers <breq@breq.dev>",
    webMaster: "Brooke Chalmers <breq@breq.dev>",
    pubDate: new Date(),
    copyright: `All rights reserved, Brooke Chalmers ${new Date().getFullYear()}`,
    language: "en",
  };

  const feed = new RSS(feedOptions);

  sorted.forEach((post) => {
    feed.item({
      title: post.title,
      description: ReactDOMServer.renderToStaticMarkup(
        <Markdown content={post.body} mode="minimal" />
      ),
      url: post.url,
      categories: post.tags,
      date: post.date,
    });
  });

  await fs.writeFile("./public/rss.xml", feed.xml({ indent: true }));
}
