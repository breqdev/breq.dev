import React from "react";
import Link from "next/link";

export const MarkdownContext = React.createContext({
  poem: false,
  dark: false,
});

export function Paragraph({
  center,
  children,
}: {
  center?: boolean;
  children: React.ReactNode;
}) {
  // Detect if we're inside a poem
  const context = React.useContext(MarkdownContext);

  if (context.poem) {
    return <p className="my-1">{children}</p>;
  }

  return (
    <p
      className={
        "my-4 mx-auto max-w-prose font-body text-lg " +
        (center ? "text-center" : "")
      }
    >
      {children}
    </p>
  );
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  const ExtLinkRegex = new RegExp("^(?:[a-z]+:)?//", "i");

  const context = React.useContext(MarkdownContext);

  const colors = context.dark
    ? "text-white underline"
    : "text-panblue-dark dark:text-panblue focus:bg-panyellow outline-none";

  if (ExtLinkRegex.test(href)) {
    return (
      <a href={href} className={`hover:underline ${colors}`}>
        {children}
      </a>
    );
  } else {
    return (
      <Link
        href={href}
        className="text-panblue-dark outline-none hover:underline focus:bg-panyellow"
      >
        {children}
      </Link>
    );
  }
}

function BlockQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote
      className="mx-auto max-w-3xl italic"
      style={{ maxWidth: "min(max-content, 100%)" }}
    >
      {children}
    </blockquote>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded border-2 border-black bg-gray-200 p-1">
      {children}
    </kbd>
  );
}

function Hr() {
  return <div className="mx-auto my-8 w-full max-w-xl border border-black" />;
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="-my-1 -mx-0.5 rounded-xl bg-gray-200 p-1 font-mono dark:bg-gray-800">
      {children}
    </code>
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
