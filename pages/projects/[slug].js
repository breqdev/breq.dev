import React from "react";
import Link from "next/link";

import Page from "../../components/Page";
import Markdown from "../../components/markdown/Markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faLaptopCode,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import SEOHelmet from "../../components/SEOHelmet";
import Comments from "../../components/Comments";
import { getAllFiles, getContent } from "../../lib/api";

function ProjectInfoItem({ name, icon, value, link }) {
  return (
    <div className="flex items-center gap-2">
      <span className="sr-only">{name}</span>
      <FontAwesomeIcon icon={icon} />
      <span>
        {link ? (
          <a
            href={link}
            className="outline-none hover:underline focus:bg-panyellow focus:text-black focus:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {value}
          </a>
        ) : (
          value
        )}
      </span>
    </div>
  );
}

function TagInfo({ tags }) {
  return (
    <span className="flex items-center gap-2">
      <FontAwesomeIcon icon={faTag} />
      <ul className="flex list-none gap-2">
        {tags.map((tag) => (
          <li className="inline" key={tag}>
            <Link href={`/tags/${tag}`}>
              <a className="rounded-full bg-white px-2 py-0.5 text-black outline-none focus:bg-panblue">
                {tag}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </span>
  );
}

function ProjectInfo({ data }) {
  const items = [
    {
      name: "created",
      icon: faCalendarAlt,
      value: data.created,
    },
    {
      name: "repo",
      icon: faGithub,
      value: data.repo,
      link: `https://github.com/${data.repo}`,
    },
    {
      name: "demo",
      icon: faLaptopCode,
      value: data.demo,
      link: data.demo,
    },
  ];

  const infoItems = items
    .filter((item) => item.value)
    .map((item) => <ProjectInfoItem key={item.name} {...item} />);

  return (
    <div className="flex flex-wrap justify-center gap-4 text-lg">
      {infoItems}
      <TagInfo tags={data.tags} />
    </div>
  );
}

function ProjectHeader({ data }) {
  return (
    <section className="rounded-xl bg-black p-8 text-center font-display text-white dark:bg-gray-800">
      <SEOHelmet
        title={data.title + " - breq.dev"}
        description={data.description}
        image={data.image}
      />
      <h1 className="text-5xl">{data.title}</h1>
      <h2 className="mb-4 text-3xl text-gray-300">{data.description}</h2>
      <ProjectInfo data={data} />
    </section>
  );
}

export async function getStaticPaths() {
  const files = await getAllFiles("./projects");

  const paths = files.map((slug) => ({
    params: {
      slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: await getContent("projects", params.slug),
  };
}

export default function Project({ data, content }) {
  return (
    <Page>
      <article className="mx-auto max-w-6xl p-4">
        <ProjectHeader data={data} />
        <Markdown content={content} />
      </article>
      <Comments />
    </Page>
  );
}
