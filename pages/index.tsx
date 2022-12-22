import React, { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import useScroll from "../components/models/useScroll";

import Page from "../components/Page";
import ProjectCard from "../components/ProjectCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";

import SEOHelmet from "../components/SEOHelmet";

import TerminalWrapper from "../components/index/TerminalWrapper";
import LazyWrapper from "../utils/LazyWrapper";
import { getSortedProjects, ProjectInfo } from "../utils/projects";
import { GetStaticProps } from "next";
import { BasicMarkdownInfo } from "../utils/api";
import Link from "next/link";

const Background = React.lazy(() => import("../components/index/IndexCanvas"));

function ScrollDownHint() {
  const iconRef = useRef<HTMLDivElement>(null);

  useScroll((scroll) => {
    if (iconRef.current) {
      if (scroll > 1) {
        iconRef.current.style.opacity = "0";
      } else {
        iconRef.current.style.opacity = "1";
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

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      data: await getSortedProjects(),
    },
  };
};

function Projects({ data }: { data: (BasicMarkdownInfo & ProjectInfo)[] }) {
  const projects = data
    .filter((data) => {
      if (data.video) {
        return true;
      } else if (data.image && !/\/default/.test(data.image.src)) {
        return true;
      } else {
        return false;
      }
    })
    .map((data) => <ProjectCard key={data.filename} {...data} />);

  const isDoubleWide = useMediaQuery({ query: "(min-width: 768px)" });
  const isTripleWide = useMediaQuery({ query: "(min-width: 1024px)" });
  const isExtraRow = useMediaQuery({ query: "(min-width: 1280px)" });

  const numColumns = isTripleWide ? 3 : isDoubleWide ? 2 : 1;
  const numProjects = numColumns * (!isDoubleWide ? 3 : isExtraRow ? 5 : 4);

  return (
    <div
      className="grid grid-cols-1 gap-8 overflow-y-hidden rounded-2xl bg-black md:grid-cols-2 lg:grid-cols-3"
      tabIndex={-1}
    >
      {projects.slice(0, numProjects).map((project, idx) => (
        <div key={idx}>{project}</div>
      ))}
      {!isDoubleWide && (
        (<Link
          href="/projects"
          className="rounded-2xl border-2 border-black bg-white p-8 text-xl text-black focus-visible:border-panpink">
          more<FontAwesomeIcon icon={faArrowRight} />

        </Link>)
      )}
    </div>
  );
}

function usePronouns() {
  const [pronouns] = React.useState(() =>
    Math.random() > 0.95 ? "she/they" : "she/her"
  );

  return pronouns;
}

export default function Index(props: {
  data: (BasicMarkdownInfo & ProjectInfo)[];
}) {
  const pronouns = usePronouns();

  return (
    <Page>
      <SEOHelmet
        title="hey, i'm brooke chalmers."
        description="welcome to my little patch of internet. view my projects, posts, and experiments here."
      />
      <div className="relative z-10 bg-black text-white">
        <div className="mx-auto h-[200vh] max-w-6xl px-8 font-display sm:px-16">
          <div className="relative h-screen">
            <ScrollDownHint />
          </div>

          <div className="flex justify-end">
            <div
              className="flex flex-col"
              style={{ textShadow: "#000 0 0 30px" }}
            >
              <h1 className="text-7xl">
                hey, i'm
                <br />
                <span className="text-panpink">brooke chalmers.</span>
              </h1>
              <p className="text-right text-6xl text-gray-500">({pronouns}).</p>
              <h2 className="mt-12 text-right text-3xl">
                welcome to my little patch of internet.
              </h2>
            </div>
          </div>
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
          <Projects {...props} />
        </div>

        <div
          style={{ height: "200vh" }}
          className="mx-auto max-w-6xl px-8 py-32 text-center font-display"
        >
          <h2 className="sticky top-0 mb-2 py-32 text-6xl">about me</h2>
        </div>

        <div className="mx-auto max-w-prose px-8 pb-16 font-display text-2xl">
          <p>
            hey, i'm brooke, and i'm here to learn, create, and enjoy it.
            <br />
            <br />
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
        </div>

        <TerminalWrapper />

        <LazyWrapper>
          <Background />
        </LazyWrapper>
      </div>
    </Page>
  );
}
