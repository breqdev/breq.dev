import React from "react";
import Image from "next/image";
import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faSpotify } from "@fortawesome/free-brands-svg-icons";
import Markdown from "../components/markdown/Markdown";
import fs from "fs/promises";
import matter from "gray-matter";
import imageSize from "image-size";
import { serialize } from "next-mdx-remote/serialize";

const ICONS = {
  url: faLink,
  spotify: faSpotify,
  instagram: faInstagram,
};

export async function getStaticProps() {
  const files = (await fs.readdir("./friends", { withFileTypes: true }))
    .filter((file) => file.isFile())
    .map((file) => file.name);

  const friends = await Promise.all(
    files.map(async (file) => {
      const filedata = await fs.readFile(`./friends/${file}`, "utf8");

      const { data: frontmatter, content: body } = matter(filedata);

      const { width, height } = await new Promise((resolve, reject) => {
        if (frontmatter.image) {
          imageSize(`public${frontmatter.image}`, (err, dimensions) => {
            if (err) reject(err);
            resolve(dimensions);
          });
        } else {
          resolve({});
        }
      });

      return {
        ...frontmatter,
        body: await serialize(body),
        image: frontmatter.image
          ? {
              src: frontmatter.image,
              width,
              height,
            }
          : null,
      };
    })
  );

  console.log(friends);

  return {
    props: {
      friends,
    },
  };
}

export default function Friends({ friends }) {
  return (
    <Page className="bg-black">
      <SEOHelmet title="cool people i know!" />
      <div className="mx-auto my-8 max-w-xl text-white">
        <h1 className="text-center font-display text-5xl">friends</h1>
        <h2 className="mt-2 text-center font-display text-3xl">
          cool people that i know!
        </h2>
      </div>
      <div className="mx-auto flex max-w-2xl flex-col px-4 py-8">
        {friends.map(({ name, pronouns, image, links, body }) => (
          <div className="flex w-full flex-col overflow-hidden rounded-2xl bg-gray-800 text-white md:flex-row">
            {image && <Image className="w-full" {...image} />}
            <div className="flex w-full flex-col p-8">
              <h2 className="font-display text-3xl">{name}</h2>
              {pronouns && (
                <h3 className="font-display italic text-gray-200">
                  {pronouns}
                </h3>
              )}
              {body && <Markdown content={body} dark />}
              <div className="flex-grow" />
              <div className="flex flex-row gap-4 text-lg">
                {links?.map(({ icon, link }) => (
                  <a
                    href={link}
                    className="text-2xl text-gray-300 transition-colors duration-300 hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={ICONS[icon]} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
}

// export const query = graphql`
//   query MyQuery {
//     allMdx(filter: { fileAbsolutePath: { regex: "/src/friends/" } }) {
//       nodes {
//         frontmatter {
//           name
//           pronouns
//           image {
//             childImageSharp {
//               gatsbyImageData(
//                 width: 1000
//                 placeholder: BLURRED
//                 formats: [AUTO, WEBP, AVIF]
//               )
//             }
//           }
//           links {
//             icon
//             link
//           }
//         }
//         body
//       }
//     }
//   }
// `;
