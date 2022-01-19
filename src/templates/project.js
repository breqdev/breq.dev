import React from "react";
import { Link, graphql } from "gatsby";

import Page from "../components/Page";
import Markdown from "../components/markdown/Markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faLaptopCode,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import SEOHelmet from "../components/SEOHelmet";
import Comments from "../components/Comments";

function ProjectInfoItem({ name, icon, value, link }) {
  return (
    <div className="flex gap-2 items-center">
      <span className="sr-only">{name}</span>
      <FontAwesomeIcon icon={icon} />
      <span>
        {link ? (
          <a
            href={link}
            className="hover:underline focus:underline outline-none focus:bg-panyellow focus:text-black"
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
    <span className="flex gap-2 items-center">
      <FontAwesomeIcon icon={faTag} />
      <ul className="list-none flex gap-2">
        {tags.map((tag) => (
          <li className="inline" key={tag}>
            <Link
              className="bg-white text-black rounded-full px-2 py-0.5 focus:bg-panblue outline-none"
              to={`/tags/${tag}`}
            >
              {tag}
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
      value: data.mdx.frontmatter.created,
    },
    {
      name: "repo",
      icon: faGithub,
      value: data.mdx.frontmatter.repo,
      link: `https://github.com/${data.mdx.frontmatter.repo}`,
    },
    {
      name: "demo",
      icon: faLaptopCode,
      value: data.mdx.frontmatter.demo,
      link: data.mdx.frontmatter.demo,
    },
  ];

  const infoItems = items
    .filter((item) => item.value)
    .map((item) => <ProjectInfoItem key={item.name} {...item} />);

  return (
    <div className="flex justify-center text-lg gap-4 flex-wrap">
      {infoItems}
      <TagInfo tags={data.mdx.frontmatter.tags} />
    </div>
  );
}

function ProjectHeader({ data }) {
  return (
    <section className="font-display text-center bg-black dark:bg-gray-800 text-white rounded-xl p-8">
      <SEOHelmet
        title={data.mdx.frontmatter.title + " - breq.dev"}
        description={data.mdx.frontmatter.subtitle}
        image={data.mdx.frontmatter.image.childImageSharp.fixed.src}
      />
      <h1 className="text-5xl">{data.mdx.frontmatter.title}</h1>
      <h2 className="text-3xl text-gray-300 mb-4">
        {data.mdx.frontmatter.subtitle}
      </h2>
      <ProjectInfo data={data} />
    </section>
  );
}

export default function Project({ data }) {
  return (
    <Page>
      <article className="max-w-6xl mx-auto p-4">
        <ProjectHeader data={data} />
        <Markdown>{data.mdx.body}</Markdown>
      </article>
      <Comments />
    </Page>
  );
}

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
        subtitle
        created
        repo
        demo
        image {
          childImageSharp {
            fixed {
              src
            }
          }
        }
        tags
      }
    }
  }
`;
