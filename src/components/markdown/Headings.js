import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

function HoverLink(props) {
  return (
    <span className="relative">
      <span className="absolute left-0 top-0 bottom-0 -ml-8">
        <a
          href={`#${props.id}`}
          className="text-xl outline-none opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-200"
        >
          <FontAwesomeIcon icon={faLink} />
          <span className="sr-only">Link to this section </span>
        </a>
      </span>
      <span>{props.children}</span>
    </span>
  );
}

function Heading(props) {
  return (
    <h2
      className="max-w-4xl mx-auto text-4xl font-display text-center mt-8 mb-4 group focus-within:text-panblue-dark"
      style={{ scrollMarginTop: "100px" }}
      id={props.id}
    >
      <HoverLink id={props.id}>{props.children}</HoverLink>
    </h2>
  );
}

function SubHeading(props) {
  return (
    <h3
      className="text-3xl font-display text-center mt-8 mb-4 italic group focus-within:text-panblue-dark"
      style={{ scrollMarginTop: "100px" }}
      id={props.id}
    >
      <HoverLink id={props.id}>{props.children}</HoverLink>
    </h3>
  );
}

function SubSubHeading(props) {
  return (
    <h4
      className="text-2xl font-display text-center mt-8 -mb-2 underline group focus-within:text-panblue-dark"
      style={{ scrollMarginTop: "100px" }}
      id={props.id}
    >
      <HoverLink id={props.id}>{props.children}</HoverLink>
    </h4>
  );
}

const shortcodes = {
  h1: Heading,
  h2: SubHeading,
  h3: SubSubHeading,
};

export default shortcodes;
