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
    <div className="flex flex-wrap justify-center gap-4 text-lg">
      {infoItems}
      <TagInfo tags={data.mdx.frontmatter.tags} />
    </div>
  );
}

function ProjectHeader({ data }) {
  return (
    <section className="rounded-xl bg-black p-8 text-center font-display text-white dark:bg-gray-800">
      <SEOHelmet
        title={data.mdx.frontmatter.title + " - breq.dev"}
        description={data.mdx.frontmatter.description}
        image={data.mdx.frontmatter.image.childImageSharp.fixed.src}
      />
      <h1 className="text-5xl">{data.mdx.frontmatter.title}</h1>
      <h2 className="mb-4 text-3xl text-gray-300">
        {data.mdx.frontmatter.description}
      </h2>
      <ProjectInfo data={data} />
    </section>
  );
}

export default function Project({ data }) {
  return (
    <Page>
      <article className="mx-auto max-w-6xl p-4">
        <ProjectHeader data={data} />
        <Markdown>{data.mdx.body}</Markdown>
      </article>
      <Comments />
    </Page>
  );
}

// export const query = graphql`
//   query ($id: String) {
//     mdx(id: { eq: $id }) {
//       body
//       frontmatter {
//         title
//         description
//         created
//         repo
//         demo
//         image {
//           childImageSharp {
//             fixed {
//               src
//             }
//           }
//         }
//         tags
//       }
//     }
//   }
// `;
