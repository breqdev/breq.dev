import React from "react";
import Page from "../../components/Page";
import Link from "next/link";
import Markdown from "../../components/markdown/Markdown";
import SEOHelmet from "../../components/SEOHelmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

export default function Writing({ data }) {
  const [acknowledged, setAcknowledged] = React.useState(
    data.mdx.frontmatter.content === null
  );

  return (
    <Page>
      <SEOHelmet
        title={data.mdx.frontmatter.title + " - breq.dev"}
        description={data.mdx.frontmatter.description}
      />
      <div>
        <section className="relative flex h-screen flex-col items-center justify-center bg-black font-display text-white">
          <h1 className="p-8 text-center text-5xl md:text-7xl">
            {data.mdx.frontmatter.title}
          </h1>
          <h2 className="text-xl">{data.mdx.frontmatter.date}</h2>
          {data.mdx.frontmatter.pdf && (
            <a
              className="absolute bottom-0 right-0 m-4 rounded-full p-4 text-gray-200 outline-none hover:underline focus:bg-panblue focus:text-white focus:underline"
              href={data.mdx.frontmatter.pdf}
              target="_blank"
              rel="noopener noreferrer"
            >
              original pdf edition
              <FontAwesomeIcon className="ml-2" icon={faDownload} />
            </a>
          )}
        </section>
        {acknowledged ? (
          <article className="p-4">
            <Markdown>{data.mdx.body}</Markdown>
          </article>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="flex flex-col gap-4 rounded-xl bg-panblue p-8 text-center font-body text-xl text-black">
              <h2 className="">
                This post has the following content warning
                {data.mdx.frontmatter.content.length > 1 && "s"}:
              </h2>
              <ul className="mx-auto max-w-max list-disc text-left">
                {data.mdx.frontmatter.content.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
              <p className="mt-8 mb-4">Would you like to proceed?</p>
              <div className="flex gap-4">
                <button
                  className="flex-grow rounded-xl border-2 border-black bg-panpink p-4 outline-none focus:border-white"
                  onClick={() => setAcknowledged(true)}
                >
                  Yes
                </button>
                <Link href="/">
                  <a className="flex-grow rounded-xl border-2 border-black p-4 outline-none focus:border-white">
                    No
                  </a>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Page>
  );
}

// export const query = graphql`
//   query ($id: String) {
//     mdx(id: { eq: $id }) {
//       body
//       frontmatter {
//         title
//         pdf
//         date(formatString: "MMMM DD, YYYY")
//         content
//       }
//     }
//   }
// `;
