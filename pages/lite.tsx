import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";
import { GetStaticProps } from "next";
import Link from "next/link";
import { getSortedProjects, ProjectInfo } from "../utils/projects";
import { listContentFiles } from "../utils/api";
import { BasicMarkdownInfo, loadMarkdown } from "../utils/markdown";
import { PostInfo, slugComparator } from "../utils/posts";

export const getStaticProps: GetStaticProps = async () => {
  const posts = await listContentFiles("posts");

  const data = await Promise.all(
    posts.map((post) => loadMarkdown<PostInfo>(post))
  );

  const sorted = data.sort(slugComparator);

  return {
    props: {
      projects: await getSortedProjects(),
      posts: sorted,
    },
  };
};

export default function Lite({
  projects,
  posts,
}: {
  projects: (BasicMarkdownInfo & ProjectInfo)[];
  posts: (PostInfo & BasicMarkdownInfo)[];
}) {
  return (
    <Page>
      <SEOHelmet
        title="Hey, I'm Brooke Chalmers."
        description="welcome to my little patch of internet. view my projects, posts, and experiments here."
      />
      <div className="flex flex-col">
        <section className="mx-auto mt-16 flex w-full max-w-3xl flex-col px-4 font-display">
          <h1 className="text-7xl">
            hey, i'm
            <br />
            <span className="text-panpink">brooke chalmers.</span>
          </h1>
          <p className="text-right text-6xl text-gray-500">(she/her).</p>
          <h2 className="mt-12 text-right text-3xl">
            welcome to my little patch of internet.
          </h2>
        </section>

        <section className="mx-auto mb-8 mt-16 max-w-prose px-4 font-display text-2xl">
          <p>
            i'm passionate about embedded systems, backend engineering, web dev,
            and bodging things together in creative ways.
            <br />
            <br />
            my favorite tools are python, react, rust, and linux. most of my
            work nowadays is completely digital, but i'm still comfortable with
            a soldering iron and a breadboard.
            <br />
            <br />
            i believe that the only way to learn something fully is to be
            creative with it. you can never truly understand something without
            applying it to a problem yourself.
            <br />
            <br />
            i'm a trans woman, and i'm still learning to love myself. i want to
            be myself and leave an impact on the world that i can be proud of.
            <br />
            <br />
            technology should be for everyone. i think it's important to create
            tools and resources that help people express themselves
            creatively—whether that's with code, or something else entirely. (we
            can't all spend our lives making websites with too much javascript.)
            <br />
            <br />
            be excellent to each other.
          </p>
        </section>

        <hr className="mx-auto w-full max-w-3xl" />

        <div className="mx-auto mb-16 mt-8 grid w-full max-w-4xl grid-cols-1 gap-8 px-4 md:grid-cols-2">
          <section className="flex w-full flex-col gap-2">
            <div className="relative flex flex-row justify-center">
              <h2 className="z-10 mb-8 bg-white px-4 font-display text-4xl dark:bg-black">
                projects
              </h2>
              <div className="absolute left-0 right-0 top-6 h-8 rounded-t-2xl border-x-2 border-t-2 border-gray-400" />
            </div>
            {projects.slice(0, 10).map((project) => (
              <Link
                key={project.slug}
                href={"/projects/" + project.slug}
                className="rounded-xl border-2 border-gray-200 transition-colors duration-300 hover:border-panpink-light focus-visible:border-panpink dark:border-gray-600 dark:hover:border-panpink-dark"
              >
                <aside className="px-4 py-2">
                  <h3 className="font-display text-lg">{project.title}</h3>
                  <p className="font-body text-sm">{project.description}</p>
                </aside>
              </Link>
            ))}
            <p className="text-center font-display text-lg">
              <Link href="/projects" className="px-1">
                more →
              </Link>
            </p>
          </section>
          <section className="flex w-full flex-col gap-2">
            <div className="relative flex flex-row justify-center">
              <h2 className="z-10 mb-8 bg-white px-4 font-display text-4xl dark:bg-black">
                blog
              </h2>
              <div className="absolute left-0 right-0 top-6 h-8 rounded-t-2xl border-x-2 border-t-2 border-gray-400" />
            </div>
            {posts.slice(0, 10).map((post) => (
              <Link
                key={post.slug}
                href={post.url}
                className="rounded-xl border-2 border-gray-200 transition-colors duration-300 hover:border-panpink-light focus-visible:border-panpink dark:border-gray-600 dark:hover:border-panpink-dark"
              >
                <aside className="px-4 py-2">
                  <h3 className="font-display text-lg">{post.title}</h3>
                  <p className="font-body text-sm">{post.description}</p>
                </aside>
              </Link>
            ))}
            <p className="text-center font-display text-lg">
              <Link href="/blog" className="px-1">
                more →
              </Link>
            </p>
          </section>
        </div>
      </div>
    </Page>
  );
}
