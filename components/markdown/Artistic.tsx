import React from "react";
import { MarkdownContext, Paragraph } from "./Core";

function Caption({ children }: { children: React.ReactNode }) {
  if (children && typeof children === "object" && "type" in children) {
    children = children.props.children;
  }

  return (
    <p className="mx-auto mb-8 mt-2 max-w-xl text-balance text-center font-body">
      {children}
    </p>
  );
}

function Poem({
  center,
  children,
}: {
  center?: boolean;
  children: React.ReactNode;
}) {
  return (
    <MarkdownContext.Provider value={{ poem: true, dark: false, mode: "full" }}>
      <section
        className={
          "mx-auto max-w-3xl pl-16 font-body text-lg " +
          (center ? " mx-auto" : "")
        }
        style={{
          textIndent: "-64px",
          maxWidth: "min(max-content, 100%)",
        }}
      >
        {children}
      </section>
    </MarkdownContext.Provider>
  );
}

function Indent({ children }: { children: React.ReactNode }) {
  return <div className="ml-12">{children}</div>;
}

function Half({
  left,
  right,
  children,
}: {
  left?: boolean;
  right?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Paragraph>
      <p
        className={
          "w-2/3 " +
          (left
            ? "mr-auto"
            : right
            ? "ml-auto text-right"
            : "mx-auto text-center")
        }
      >
        {children}
      </p>
    </Paragraph>
  );
}

// Used in "Identity"
function DsmTitle({
  char,
  children,
}: {
  char: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto my-8 max-w-3xl text-center font-display text-2xl">
      <span className="text-7xl">{char}</span>
      <br />
      {children}
    </div>
  );
}

const shortcodes = {
  Caption,
  Poem,
  Indent,
  Half,
  DsmTitle,
};

export default shortcodes;
