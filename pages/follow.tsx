import Link from "next/link";
import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";

export default function Follow() {
  return (
    <Page className="flex flex-col gap-6 px-4 py-8">
      <SEOHelmet title="Feeds - breq.dev" />
      <h1 className="text-center font-display text-5xl">Feeds</h1>

      <div className="mx-auto flex w-full max-w-xl flex-col gap-4 font-body">
        <p>
          This site (both posts and projects) are available over RSS, with full
          post contents included. Copy and paste this feed into your reader of
          choice!
        </p>
        <pre className="bg-gray-200 px-2 py-1 dark:bg-gray-800">
          https://breq.dev/rss.xml
        </pre>
        <p>
          If you have any comments about the format of the feed not cooperating
          with your reader software, please{" "}
          <Link
            className="text-panblue-dark hover:underline focus:underline dark:text-panblue-light"
            href="/contact"
          >
            let me know
          </Link>
          .
        </p>
      </div>
    </Page>
  );
}
