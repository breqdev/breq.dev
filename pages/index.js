import React, { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import useScroll from "../components/models/useScroll";

import Page from "../components/Page";
import ProjectCard from "../components/ProjectCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import SEOHelmet from "../components/SEOHelmet";

import TerminalWrapper from "../components/index/TerminalWrapper";
import LazyWrapper from "../utils/LazyWrapper";

const Background = React.lazy(() => import("../components/index/IndexCanvas"));

function ScrollDownHint() {
  const iconRef = useRef();

  useScroll((scroll) => {
    if (iconRef.current) {
      if (scroll > 1) {
        iconRef.current.style.opacity = 0;
      } else {
        iconRef.current.style.opacity = 1;
      }
    }
  });

  const handleScroll = () => window.scrollBy({ top: 200, behavior: "smooth" });

  return (
    <div
      className="absolute bottom-0 left-0 right-0 mb-32 text-center text-8xl transition-opacity duration-300"
      ref={iconRef}
    >
      <button
        className="outline-none transition-colors duration-300 focus:text-panyellow"
        onClick={handleScroll}
      >
        <FontAwesomeIcon icon={faChevronDown} />
        <span className="sr-only">scroll down</span>
      </button>
    </div>
  );
}

function Projects({ data }) {
  const projects = data.allMdx.edges
    .filter(({ node }) => {
      if (node.frontmatter.video) {
        return true;
      } else if (
        node.frontmatter.image &&
        !/\/default/.test(node.frontmatter.image.absolutePath)
      ) {
        return true;
      } else {
        return false;
      }
    })
    .map(({ node }) => <ProjectCard key={node.id} {...node} />);

  const isDoubleWide = useMediaQuery({ query: "(min-width: 768px)" });
  const isTripleWide = useMediaQuery({ query: "(min-width: 1024px)" });
  const isExtraRow = useMediaQuery({ query: "(min-width: 1280px)" });

  const numColumns = isTripleWide ? 3 : isDoubleWide ? 2 : 1;
  const numProjects = numColumns * (isExtraRow ? 5 : 4);

  return (
    <div
      className="grid grid-cols-1 gap-8 overflow-y-hidden rounded-2xl bg-black md:grid-cols-2 lg:grid-cols-3"
      tabIndex="-1"
    >
      {projects.slice(0, numProjects).map((project, idx) => (
        <div key={idx}>{project}</div>
      ))}
    </div>
  );
}

export default function Index({ data }) {
  return (
    <Page>
      <SEOHelmet
        title="breq.dev. hey, i'm brooke."
        description="welcome to my little patch of internet. view my projects, posts, and miscellaneous experiments here."
      />
      <div className="relative z-10 bg-black text-white">
        <div
          style={{ height: "200vh" }}
          className="mx-auto max-w-6xl px-16 text-right font-display"
        >
          <div className="relative h-screen">
            <ScrollDownHint />
          </div>

          <h1 className="mb-2 text-7xl">
            hey, i'm brooke.
            <br />
            <span className="text-gray-500">she/her.</span>
          </h1>
          <h2 className="text-4xl">welcome to my little patch of internet.</h2>
        </div>

        <div
          style={{ height: "200vh" }}
          className="relative mx-auto max-w-6xl px-8 py-32 text-center font-display"
        >
          <h2 className="sticky top-0 mb-2 py-32 text-6xl">projects</h2>
        </div>

        <div
          style={{ height: "200vh" }}
          className="relative z-10 mx-auto max-w-6xl px-8 py-32 text-center font-display"
        >
          {/* <Projects data={data} /> */}
        </div>

        <div
          style={{ height: "200vh" }}
          className="mx-auto max-w-6xl px-8 py-32 text-center font-display"
        >
          <h2 className="sticky top-0 mb-2 py-32 text-6xl">about me</h2>
        </div>

        <div
          style={{ height: "200vh" }}
          className="mx-auto max-w-prose px-8 font-display text-2xl"
        >
          <p>
            hey, i'm brooke, and i'm here to learn, create, and enjoy it.
            <br />
            <br />
            i'm passionate about embedded systems, backend engineering, and web
            dev.
            <br />
            <br />
            my favorite tools are python, react, redis, and linux. someday i
            want to learn rust.
            <br />
            <br />
            i believe that the only way to learn something fully is to be
            creative with it. you can never truly understand something without
            applying it to a problem yourself.
            <br />
            <br />
            i'm a transgender woman, and i'm still learning to love myself. i
            want to be myself and leave an impact on the world that i can be
            proud of.
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
        </div>

        <TerminalWrapper />

        <LazyWrapper>
          <Background />
        </LazyWrapper>
      </div>
    </Page>
  );
}

// export const query = graphql`
//   query {
//     allMdx(
//       filter: { fileAbsolutePath: { regex: "/projects/" } }
//       sort: { fields: [frontmatter___created], order: DESC }
//     ) {
//       edges {
//         node {
//           id
//           slug
//           frontmatter {
//             title
//             description
//             tags
//             image {
//               absolutePath
//               childImageSharp {
//                 gatsbyImageData(
//                   width: 1000
//                   placeholder: BLURRED
//                   formats: [AUTO, WEBP, AVIF]
//                 )
//               }
//             }
//             video
//           }
//         }
//       }
//     }
//   }
// `;
