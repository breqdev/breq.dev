import { GetStaticProps } from "next";
import Link from "next/link";
import { getSortedProjects, ProjectInfo } from "../utils/projects";
import { listContentFiles } from "../utils/api";
import { BasicMarkdownInfo, loadMarkdown } from "../utils/markdown";
import { PostInfo, slugComparator } from "../utils/posts";
import { BADGES } from "../utils/badges";

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

export default function Adryd({
  projects,
  posts,
}: {
  projects: (BasicMarkdownInfo & ProjectInfo)[];
  posts: (PostInfo & BasicMarkdownInfo)[];
}) {
  return (
    <>
      <link rel="stylesheet" href="/alternate-styles/adryd.css" />
      <main className="inner-main bg-white">
        <div className="page-view">
          <h1>hi, i'm brooke!</h1>
          <p style={{ fontWeight: 700, fontSize: "1.25rem", lineHeight: 1 }}>
            (a.k.a breq, Brooklyn)
          </p>
          <p className="mt-2" style={{ fontWeight: 500, fontSize: "1.125rem" }}>
            i'm a software developer, server administrator, radio dork, designer
            (sometimes), and overall technology obsessed witch from boston
            (boston is an independent city state now).
          </p>
          <section>
            <h2>
              <Link className="subtle-link" href="/projects">
                pages →
              </Link>
            </h2>
            <p className="subtitle pb-2">reference and some projects</p>
            <ul>
              {projects.slice(0, 10).map((project) => (
                <li key={project.slug}>
                  <Link
                    href={"/projects/" + project.slug}
                    className="fancy-link"
                  >
                    {project.title} →
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2>
              <Link className="subtle-link" href="/blog">
                updates →
              </Link>
            </h2>
            <p className="subtitle pb-2">blog posts and more projects</p>
            <ul>
              {posts.slice(0, 5).map((post) => (
                <li key={post.slug}>
                  <Link href={"/projects/" + post.url} className="fancy-link">
                    {post.title} →
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2>contact me</h2>
            <ul>
              <li>
                <a
                  className="fancy-link"
                  rel="me"
                  href="https://tacobelllabs.net/@breq"
                >
                  the fediverse →
                </a>
              </li>
              <li>
                <a
                  className="fancy-link"
                  rel="me"
                  href="https://github.com/breqdev"
                >
                  github →
                </a>
              </li>
              <li>
                <a
                  className="fancy-link"
                  rel="me"
                  href="https://gitlab.com/breq"
                >
                  gitlab →
                </a>
              </li>
              <li>
                <a
                  className="fancy-link"
                  style={{ cursor: "pointer" }}
                  href="mailto:breq@breq.dev"
                >
                  email →
                </a>
              </li>
            </ul>
          </section>
          <section>
            <h2>my friends</h2>
            <span className="buttons flex flex-wrap gap-1">
              {BADGES.filter((badge) => badge.image).map((badge) => (
                <a key={badge.name} href={badge.url}>
                  <img
                    src={badge.image}
                    alt={badge.name}
                    width={88}
                    height={31}
                    loading="lazy"
                    decoding="async"
                  />
                </a>
              ))}
            </span>
          </section>
        </div>
      </main>
      <footer>
        <div className="page-view">
          <div className="logo">
            <a href="//adryd.com/">
              <svg
                width="64"
                height="74"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>adryd logo</title>
                <g fill="currentColor">
                  <path d="m9.92688 53.512c-0.12195 0-0.243904 0.04879-0.341465 0.121966-0.073171 0.09755-0.12195 0.219515-0.12195 0.34148v0.68293c-0.804884-0.926861-2.00001-1.48784-3.63417-1.48784-3.19514 0-5.8293 2.80489-5.8293 6.43906 0 3.63416 2.63416 6.43906 5.8293 6.43906 1.63415 0 2.82928-0.560977 3.63416-1.48781v0.70732c0 0.243892 0.195122 0.439026 0.439026 0.439026h2.7805c0.243904 0 0.439025-0.195137 0.439025-0.439026v-11.3171c0-0.121965-0.04878-0.219515-0.12195-0.317064-0.09756-0.07317-0.195121-0.121966-0.317076-0.121966zm-3.36587 9.07322c-1.68294 0-2.90245-1.14635-2.90245-2.97562 0-1.82928 1.21952-2.97563 2.90245-2.97563s2.90245 1.14635 2.90245 2.97563c0 1.82928-1.21952 2.97562-2.90245 2.97562z"></path>
                  <path d="m1.3844 42.4378c-0.250666 0-0.479214-0.137612-0.604546-0.358791a0.737252 0.737252 0 0 1 0-0.720358c1.49386-2.66793 5.32449-9.50902 6.48014-11.5745a0.462625 0.462625 0 0 1 0.375999-0.23898c0.156665-0.0094 0.306882 0.06297 0.400881 0.192303 3.02242 3.06512 12.0206-4.81272 14.401-0.553863l-7.08468 12.6549c-0.20981 0.371377-0.591953 0.599018-1.0085 0.599018z"></path>
                  <path d="m24.3659 48.634c-0.243904 0-0.439026 0.195137-0.439026 0.439026v5.5854c-0.804882-0.926835-2.00001-1.48782-3.63417-1.48782-3.19514 0-5.8293 2.80489-5.8293 6.43906 0 3.63416 2.63416 6.43906 5.8293 6.43906 1.63416 0 2.82928-0.560977 3.63417-1.48781v0.70732c0 0.243892 0.195122 0.439026 0.439026 0.439026h2.7805c0.12195 0 0.219515-0.04879 0.317076-0.121966 0.07317-0.09755 0.12195-0.195137 0.12195-0.317064v-16.1952c0-0.121965-0.04877-0.219515-0.12195-0.317065-0.09756-0.07317-0.195122-0.121965-0.317076-0.121965zm-3.34148 13.9513c-1.68293 0-2.90245-1.14635-2.90245-2.97562 0-1.82928 1.21952-2.97563 2.90245-2.97563 1.68294 0 2.90246 1.14635 2.90246 2.97563 0 1.82928-1.21952 2.97562-2.90246 2.97562z"></path>
                  <path d="m44.0983 41.3712a0.71882 0.71882 0 0 1 0 0.710835 0.684415 0.684415 0 0 1-0.595026 0.355124h-12.9729c-0.416853 0-0.801761-0.229152-1.01188-0.600861l-14.166-25.3065a4.37866 2.25783 0 0 1 0-1.19988l6.47368-11.5681a0.701311 0.701311 0 0 1 0.610997-0.361852c0.25036 0 0.482286 0.13886 0.607618 0.361852z"></path>
                  <path d="m33.3171 55.6828v-1.73172c0-0.121965-0.04878-0.219515-0.12195-0.317064-0.09756-0.07317-0.195122-0.121966-0.317076-0.121966h-2.7805c-0.12195 0-0.219511 0.04879-0.317072 0.121966-0.07317 0.09755-0.121954 0.195136-0.121954 0.317064v11.3171c0 0.121965 0.04877 0.219515 0.121954 0.317065 0.09756 0.07317 0.195122 0.121964 0.317072 0.121964h2.7805c0.243904 0 0.439026-0.195137 0.439026-0.439026v-5.0732c0-2.17074 1.73172-2.87806 3.19514-2.82928 0.121965 0 0.243893-0.02457 0.317064-0.121966 0.09755-0.07317 0.146344-0.195137 0.146344-0.317064v-3.19514c0-0.121965-0.04879-0.243892-0.146344-0.317065-0.09755-0.09755-0.219514-0.146343-0.34148-0.121964-1.36586 0.146343-2.73172 0.926833-3.17075 2.39026z"></path>
                  <path d="m47.2928 53.512c-0.195137 0-0.365858 0.121966-0.414636 0.317065-0.439026 1.41464-2.19513 7.14638-2.19513 7.14638s-2.09757-5.80491-2.60977-7.17077c-0.04879-0.170722-0.219516-0.292687-0.414637-0.292687h-3.0488c-0.146344 0-0.292687 0.07317-0.365858 0.195137-0.07317 0.121965-0.09755 0.268308-0.04879 0.414632 1 2.39026 4.60978 11.0245 4.60978 11.0245-0.487805 1.36586-1.21952 1.92684-2.63416 2.0244-0.243894 0-0.414638 0.195137-0.414638 0.414638v2.58538c0 0.243893 0.195137 0.43903 0.439026 0.43903 3.17075 0 5.19515-1.56099 6.51223-5.26832 0 0 3.12197-8.8537 3.97563-11.244 0.02457-0.121966 0.02457-0.292687-0.07317-0.390244-0.07317-0.121966-0.219516-0.195137-0.365858-0.195137z"></path>
                  <path d="m60.7805 48.634c-0.243892 0-0.439029 0.195137-0.439029 0.439026v5.5854c-0.804881-0.926835-2.00001-1.48782-3.63416-1.48782-3.19514 0-5.8293 2.80489-5.8293 6.43906 0 3.63416 2.63416 6.43906 5.8293 6.43906 1.63416 0 2.82928-0.560977 3.63416-1.48781v0.70732c0 0.243892 0.195137 0.439026 0.439029 0.439026h2.7805c0.121965 0 0.219514-0.04879 0.317064-0.121966 0.07317-0.097546 0.121965-0.195137 0.121965-0.317064v-16.1952c0-0.121965-0.04879-0.219515-0.121965-0.317065-0.09755-0.07317-0.195137-0.121965-0.317064-0.121965zm-3.34148 13.9513c-1.68293 0-2.90245-1.14635-2.90245-2.97562 0-1.82928 1.21952-2.97563 2.90245-2.97563 1.68294 0 2.90246 1.14635 2.90246 2.97563 0 1.82928-1.21952 2.97562-2.90246 2.97562z"></path>
                </g>
              </svg>
            </a>
          </div>
          <small>
            copyright &copy; 2025 Ariana "adryd" redacted. this website is dual
            licensed under the MIT license and{" "}
            <a href="http://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>{" "}
            license. not all images, vector graphics, scripts and other assets
            fall under this license. visit{" "}
            <a href="//adryd.com/licenses">licenses</a> for detailed copyright
            information. this footer is mostly here to look cool.
            <b>
              appreciate my work?{" "}
              <a href="//github.com/sponsors/adryd325">consider donating.</a>
            </b>
            <br /> <span>⭐ ✨ 🐈‍⬛ 🌙</span>
          </small>
        </div>
      </footer>
    </>
  );
}
