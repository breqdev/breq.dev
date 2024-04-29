import React from "react";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

import Page from "../../components/Page";
import Markdown from "../../components/markdown/Markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faLaptopCode,
  faTag,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import SEOHelmet from "../../components/SEOHelmet";
import Comments from "../../components/Comments";
import { listContentFiles } from "../../utils/api";
import { BasicMarkdownInfo, loadMarkdown } from "../../utils/markdown";
import { parse } from "path";
import { ProjectInfo } from "../../utils/projects";
import { GetStaticPaths, GetStaticProps } from "next";

type ProjectInfoItemProps = {
  name: string;
  icon: IconDefinition;
  value: string;
  link?: string;
};

function ProjectInfoItem({ name, icon, value, link }: ProjectInfoItemProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="sr-only">{name}</span>
      <FontAwesomeIcon icon={icon} />
      <span>
        {link ? (
          <a
            href={link}
            className="outline-none hover:underline focus:bg-panyellow focus:text-black focus:underline"
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

function TagInfo({ tags }: { tags: string[] }) {
  return (
    <span className="flex items-center gap-2">
      <FontAwesomeIcon icon={faTag} />
      <ul className="flex list-none gap-2">
        {tags?.map((tag) => (
          <li className="inline" key={tag}>
            <Link
              href={`/tags/${tag}`}
              className="rounded-full bg-white px-2 py-0.5 text-black outline-none focus:bg-panblue"
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </span>
  );
}

function ProjectInfo(props: ProjectInfo) {
  const items = [
    {
      name: "created",
      icon: faCalendarAlt,
      value: props.created,
    },
    {
      name: "repo",
      icon: faGithub,
      value: props.repo,
      link: `https://github.com/${props.repo}`,
    },
    {
      name: "demo",
      icon: faLaptopCode,
      value: props.demo,
      link: props.demo,
    },
  ];

  const infoItems = items
    .filter((item) => item.value !== undefined)
    .map((item) => (
      <ProjectInfoItem key={item.name} {...item} value={item.value!} />
    ));

  return (
    <div className="flex flex-wrap justify-center gap-4 text-lg">
      {infoItems}
      <TagInfo tags={props.tags} />
    </div>
  );
}

function ProjectHeader(props: ProjectInfo) {
  return (
    <section className="relative">
      <div className="relative z-10 rounded-xl bg-black p-8 text-center font-display text-white dark:bg-gray-800">
        <SEOHelmet
          title={props.title + " - breq.dev"}
          description={props.description}
          image={props.image?.src}
        />
        <h1 className="text-5xl">
          <Balancer>{props.title}</Balancer>
        </h1>
        <h2 className="mb-4 text-3xl text-gray-300">
          <Balancer>{props.description}</Balancer>
        </h2>
        <ProjectInfo {...props} />
      </div>
      <div className="absolute inset-0 z-0 translate-x-3 translate-y-2 transform rounded-xl bg-panpink" />
    </section>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = await listContentFiles("projects");

  return {
    paths: files.map((file) => ({ params: { slug: parse(file).name } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: await loadMarkdown<ProjectInfo>(`projects/${params?.slug}.md`, {
      loadBody: true,
    }),
  };
};

export default function Project(props: ProjectInfo & BasicMarkdownInfo) {
  return (
    <Page>
      <article className="mx-auto max-w-6xl p-4">
        <ProjectHeader {...props} />
        <Markdown content={props.body} />
      </article>
      <Comments />
    </Page>
  );
}
