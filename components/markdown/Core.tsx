import React from "react";
import Link from "next/link";

export const MarkdownContext = React.createContext({
  poem: false,
  dark: false,
});

export function Paragraph(props) {
  // Detect if we're inside a poem
  const context = React.useContext(MarkdownContext);

  if (context.poem) {
    return <p className="my-1">{props.children}</p>;
  }

  return (
    <p
      className={
        "my-4 mx-auto max-w-prose font-body text-lg " +
        (props.center ? "text-center" : "")
      }
    >
      {props.children}
    </p>
  );
}

function A(props) {
  const ExtLinkRegex = new RegExp("^(?:[a-z]+:)?//", "i");

  const context = React.useContext(MarkdownContext);

  const colors = context.dark
    ? "text-white underline"
    : "text-panblue-dark dark:text-panblue focus:bg-panyellow outline-none";

  if (ExtLinkRegex.test(props.href)) {
    return (
      <a
        href={props.href}
        className={`hover:underline ${colors}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {props.children}
      </a>
    );
  } else {
    return (
      <Link href={props.href}>
        <a className="text-panblue-dark outline-none hover:underline focus:bg-panyellow">
          {props.children}
        </a>
      </Link>
    );
  }
}

function BlockQuote(props) {
  return (
    <blockquote
      className="mx-auto max-w-3xl italic"
      style={{ maxWidth: "min(max-content, 100%)" }}
    >
      {props.children}
    </blockquote>
  );
}

function Kbd(props) {
  return (
    <kbd className="rounded border-2 border-black bg-gray-200 p-1">
      {props.children}
    </kbd>
  );
}

function Hr(props) {
  return <div className="mx-auto my-8 w-full max-w-xl border border-black" />;
}

function InlineCode(props) {
  return (
    <span className="-my-1 -mx-0.5 rounded-xl bg-gray-200 p-1 font-mono dark:bg-gray-800">
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
  code: InlineCode,
};

export default shortcodes;
