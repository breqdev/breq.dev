import React, { Fragment, ReactNode } from "react";
import Link from "next/link";

import Page from "../../components/Page";
import Markdown from "../../components/markdown/Markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faGlobe,
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
import HCard from "../../components/HCard";
import { useRouter } from "next/router";

type ProjectInfoItemProps = {
  name: string;
  icon: IconDefinition;
  value: string;
  link?: string;
  custom?: (v: string) => ReactNode;
};

function ProjectInfoItem({
  name,
  icon,
  value,
  link,
  custom,
}: ProjectInfoItemProps) {
  return (
    <tr className="flex items-center gap-2">
      <td>
        <span className="sr-only">{name}</span>
        <FontAwesomeIcon icon={icon} />
      </td>
      <td>
        {custom ? (
          custom(value)
        ) : link ? (
          <a
            href={link}
            className="outline-none hover:underline focus:bg-panyellow focus:text-black focus:underline"
          >
            {value}
          </a>
        ) : (
          value
        )}
      </td>
    </tr>
  );
}

function TagInfo({ tags }: { tags: string[] }) {
  return (
    <span className="flex items-center gap-2">
      <FontAwesomeIcon icon={faTag} />
      <ul className="flex list-none gap-2 print:gap-0">
        {tags?.map((tag, i) => (
          <Fragment key={tag}>
            <li className="p-category inline rounded-full bg-white px-2 py-0.5 text-black outline-none focus:bg-panblue print:bg-transparent print:p-0">
              {tag}
            </li>
            {i < tags.length - 1 && (
              <span className="mr-1 hidden print:block">,</span>
            )}
          </Fragment>
        ))}
      </ul>
    </span>
  );
}

function ProjectInfoCard(props: ProjectInfo) {
  const items = [
    {
      name: "created",
      icon: faCalendarAlt,
      value: props.created,
      custom: (value: string) => (
        <time className="dt-published" dateTime={props.writeup}>
          {value}
        </time>
      ),
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
    <div className="flex flex-wrap justify-center gap-4 text-lg print:text-black">
      <table className="contents">
        <tbody className="contents">{infoItems}</tbody>
      </table>
      <TagInfo tags={props.tags} />
      <span className="hidden print:inline">
        <FontAwesomeIcon icon={faGlobe} /> breq.dev
      </span>
    </div>
  );
}

function ProjectHeader(props: ProjectInfo) {
  const { asPath } = useRouter();

  return (
    <section className="relative mb-8">
      <div className="relative z-10 rounded-xl bg-black p-8 text-center font-display text-white dark:bg-gray-800 print:bg-transparent print:p-0 print:text-panpink-dark">
        <SEOHelmet
          title={props.title + " - breq.dev"}
          description={props.description}
          image={props.image?.src}
        />
        <h1 className="p-name text-balance text-5xl">{props.title}</h1>
        <h2 className="p-summary mb-4 text-balance text-3xl text-gray-300 print:mb-1">
          {props.description}
        </h2>
        <a
          className="u-url hidden"
          href={`https://breq.dev${asPath.split("?")[0]}`}
        />
        <ProjectInfoCard {...props} />
        <HCard />
      </div>
      <div className="absolute inset-0 z-0 translate-x-3 translate-y-2 transform rounded-xl bg-panpink print:hidden" />
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
      <article className="h-entry mx-auto max-w-6xl p-4">
        <ProjectHeader {...props} />
        <Markdown content={props.body} />
      </article>
      <Comments />
    </Page>
  );
}
