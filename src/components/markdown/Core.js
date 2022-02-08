import React from "react";
import { Link } from "gatsby";

export const PoemContext = React.createContext({ poem: false });

export function Paragraph(props) {
  // Detect if we're inside a poem
  const poemContext = React.useContext(PoemContext);

  // Detect if we're wrapping a Gatsby image
  if (props.children?.props?.className?.startsWith?.("gatsby-resp-image")) {
    return <p className="my-4 rounded-2xl overflow-hidden">{props.children}</p>;
  }

  if (poemContext.poem) {
    return <p className="my-1">{props.children}</p>;
  }

  return (
    <p
      className={
        "my-4 text-lg font-body max-w-prose mx-auto " +
        (props.center && "text-center")
      }
    >
      {props.children}
    </p>
  );
}

function A(props) {
  const ExtLinkRegex = new RegExp("^(?:[a-z]+:)?//", "i");

  if (ExtLinkRegex.test(props.href)) {
    return (
      <a
        href={props.href}
        className="text-panblue-dark dark:text-panblue hover:underline outline-none focus:bg-panyellow"
        target="_blank"
        rel="noopener noreferrer"
      >
        {props.children}
      </a>
    );
  } else {
    return (
      <Link
        to={props.href}
        className="text-panblue-dark hover:underline outline-none focus:bg-panyellow"
      >
        {props.children}
      </Link>
    );
  }
}

function BlockQuote(props) {
  return (
    <blockquote
      className="italic max-w-3xl mx-auto"
      style={{ maxWidth: "min(max-content, 100%)" }}
    >
      {props.children}
    </blockquote>
  );
}

function Kbd(props) {
  return (
    <kbd className="bg-gray-200 border-black border-2 rounded p-1">
      {props.children}
    </kbd>
  );
}

function Hr(props) {
  return <div className="border-black border max-w-xl w-full mx-auto my-8" />;
}

function InlineCode(props) {
  return (
    <span className="font-mono bg-gray-200 -my-1 -mx-0.5 p-1 rounded-xl">
      {props.children}
    </span>
  );
}

const shortcodes = {
  p: Paragraph,
  a: A,
  blockquote: BlockQuote,
  kbd: Kbd,
  hr: Hr,
  inlineCode: InlineCode,
};

export default shortcodes;
