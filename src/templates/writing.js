import React from "react";
import Page from "../components/Page";
import { graphql, Link } from "gatsby";
import Markdown from "../components/markdown/Markdown";
import SEOHelmet from "../components/SEOHelmet";
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
        <section className="h-screen flex flex-col items-center justify-center font-display bg-black text-white relative">
          <h1 className="text-5xl md:text-7xl text-center p-8">
            {data.mdx.frontmatter.title}
          </h1>
          <h2 className="text-xl">{data.mdx.frontmatter.date}</h2>
          {data.mdx.frontmatter.pdf && (
            <a
              className="absolute bottom-0 right-0 m-4 p-4 text-gray-200 hover:underline focus:underline focus:bg-panblue focus:text-white rounded-full outline-none"
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
          <div className="py-16 flex flex-col items-center justify-center">
            <div className="bg-panblue text-black rounded-xl p-8 flex flex-col gap-4 text-center text-xl font-body">
              <h2 className="">
                This post has the following content warning
                {data.mdx.frontmatter.content.length > 1 && "s"}:
              </h2>
              <ul className="text-left list-disc max-w-max mx-auto">
                {data.mdx.frontmatter.content.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
              <p className="mt-8 mb-4">Would you like to proceed?</p>
              <div className="flex gap-4">
                <button
                  className="flex-grow bg-panpink p-4 rounded-xl border-2 border-black focus:border-white outline-none"
                  onClick={() => setAcknowledged(true)}
                >
                  Yes
                </button>
                <Link
                  className="flex-grow p-4 rounded-xl border-2 border-black focus:border-white outline-none"
                  to="/"
                >
                  No
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Page>
  );
}

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
        pdf
        date(formatString: "MMMM DD, YYYY")
        content
      }
    }
  }
`;
