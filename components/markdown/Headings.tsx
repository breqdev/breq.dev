import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import Balancer from "react-wrap-balancer";
import { MarkdownContext } from "./Core";

function HoverLink({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { mode } = useContext(MarkdownContext);

  if (mode === "minimal") {
    return children as JSX.Element;
  }

  return (
    <span className="relative">
      <span className="absolute bottom-0 left-0 top-0 -ml-8">
        <a
          href={`#${id}`}
          className="text-xl opacity-0 outline-none transition-opacity duration-200 focus:opacity-100 group-hover:opacity-100"
        >
          <FontAwesomeIcon icon={faLink} />
          <span className="sr-only">Link to this section </span>
        </a>
      </span>
      {children}
    </span>
  );
}

function Heading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      className="group mx-auto mb-4 mt-8 max-w-4xl text-center font-display text-4xl focus-within:text-panblue-dark"
      style={{ scrollMarginTop: "100px" }}
      id={id}
    >
      <HoverLink id={id}>
        <Balancer>{children}</Balancer>
      </HoverLink>
    </h2>
  );
}

function SubHeading({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <h3
      className="group mb-4 mt-8 text-center font-display text-3xl italic focus-within:text-panblue-dark"
      style={{ scrollMarginTop: "100px" }}
      id={id}
    >
      <HoverLink id={id}>
        <Balancer>{children}</Balancer>
      </HoverLink>
    </h3>
  );
}

function SubSubHeading({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <h4
      className="group -mb-2 mt-8 text-center font-display text-2xl underline focus-within:text-panblue-dark"
      style={{ scrollMarginTop: "100px" }}
      id={id}
    >
      <HoverLink id={id}>
        <Balancer>{children}</Balancer>
      </HoverLink>
    </h4>
  );
}

const shortcodes = {
  h1: Heading,
  h2: SubHeading,
  h3: SubSubHeading,
};

export default shortcodes;
