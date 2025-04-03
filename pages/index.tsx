import React, { useEffect, useRef, useState } from "react";
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
import { BasicMarkdownInfo } from "../utils/markdown";
import Link from "next/link";
import generateRssFeed from "../utils/generateRSS";
import HCard from "../components/HCard";
import { AboutContent } from "./about";

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
  await generateRssFeed();

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

  const [displayedProjects, setDisplayedProjects] = React.useState(4);

  useEffect(() => {
    const handleResize = () => {
      const isDoubleWide = window.innerWidth >= 768;
      const isTripleWide = window.innerWidth >= 1024;
      const isExtraRow = window.innerWidth >= 1280;

      const numColumns = isTripleWide ? 3 : isDoubleWide ? 2 : 1;
      const numProjects = numColumns * (!isDoubleWide ? 3 : isExtraRow ? 5 : 4);

      setDisplayedProjects(numProjects);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <div
      className="grid grid-cols-1 gap-8 rounded-2xl bg-black md:grid-cols-2 lg:grid-cols-3"
      tabIndex={-1}
    >
      {projects.slice(0, displayedProjects)}
      {displayedProjects < 6 && (
        <Link
          href="/projects"
          className="flex items-center justify-center gap-2 rounded-2xl border-2 border-black bg-white p-8 text-xl text-black focus-visible:border-panpink"
        >
          more projects
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      )}
    </div>
  );
}

function usePronouns() {
  const [pronouns, setPronouns] = React.useState("she/her");

  useEffect(() => {
    setPronouns(Math.random() > 0.85 ? "she/they" : "she/her");
  }, []);

  return pronouns;
}

function Greeting({
  position,
}: {
  position: "justify-center" | "justify-end";
}) {
  const pronouns = usePronouns();

  return (
    <div className={"flex " + position}>
      <div className="flex flex-col" style={{ textShadow: "#000 0 0 30px" }}>
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
  );
}

export default function Index(props: {
  data: (BasicMarkdownInfo & ProjectInfo)[];
}) {
  const [fancy, setFancy] = useState(true);

  useEffect(() => {
    // check for fancy query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const fancyParam = urlParams.get("fancy");
    if (fancyParam !== null) {
      setFancy(fancyParam === "true");
      return;
    }

    // otherwise, turn off fancy mode if any of the following:
    // - prefers-reduced-motion is set
    // - computer does not support webgl

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.WebGLRenderingContext
    ) {
      setFancy(false);
    } else {
      setFancy(true);
    }
  }, []);

  return (
    <Page>
      <SEOHelmet
        title="Hey, I'm Brooke Chalmers."
        description="Welcome to my little patch of internet. View my projects, posts, and experiments here."
      />
      <div className="relative z-10 bg-black text-white">
        <div
          className={
            "mx-auto max-w-6xl px-8 font-display sm:px-16 " +
            (fancy ? "h-[200vh]" : "h-screen")
          }
        >
          <div className="relative h-screen pt-64">
            {!fancy && <Greeting position="justify-center" />}
            <ScrollDownHint />
          </div>

          {fancy && <Greeting position="justify-end" />}
        </div>

        {fancy && (
          <div className="relative mx-auto h-[200vh] max-w-6xl px-8 py-32 text-center font-display">
            <h2 className="sticky top-0 mb-2 py-32 text-6xl">projects</h2>
          </div>
        )}

        <div
          className={
            "relative z-10 mx-auto max-w-6xl px-8 py-32 text-center font-display " +
            (fancy ? "h-[200vh]" : "")
          }
        >
          {!fancy && <h2 className="top-0 mb-2 py-32 text-6xl">projects</h2>}
          <Projects {...props} />
        </div>

        {fancy && (
          <div className="mx-auto h-[200vh] max-w-6xl px-8 py-32 text-center font-display">
            <h2 className="sticky top-0 mb-2 py-32 text-6xl">about me</h2>
          </div>
        )}

        <div className="mx-auto max-w-prose px-8 pb-16 font-display text-2xl">
          {!fancy && (
            <h2 className="top-0 mb-16 text-center font-display text-6xl">
              about me
            </h2>
          )}

          <AboutContent />
        </div>

        <HCard />

        <TerminalWrapper />

        {fancy && (
          <LazyWrapper>
            <Background />
          </LazyWrapper>
        )}
      </div>
    </Page>
  );
}
