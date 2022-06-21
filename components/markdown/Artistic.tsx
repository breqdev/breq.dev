import React from "react";
import { MarkdownContext, Paragraph } from "./Core";

function Caption(props) {
  return (
    <p className="mx-auto mb-8 max-w-xl text-center font-body">
      {props.children}
    </p>
  );
}

function Poem(props) {
  return (
    <MarkdownContext.Provider value={{ poem: true, dark: false }}>
      <section
        className={
          "mx-auto max-w-3xl pl-16 font-body text-lg " +
          (props.center ? " mx-auto" : "")
        }
        style={{
          textIndent: "-64px",
          maxWidth: "min(max-content, 100%)",
        }}
      >
        {props.children}
      </section>
    </MarkdownContext.Provider>
  );
}

function Indent(props) {
  return <div className="ml-12">{props.children}</div>;
}

function Half(props) {
  return (
    <Paragraph>
      <p
        className={
          "w-2/3 " +
          (props.left
            ? "mr-auto"
            : props.right
            ? "ml-auto text-right"
            : "mx-auto text-center")
        }
      >
        {props.children}
      </p>
    </Paragraph>
  );
}

// Used in "Identity"
function DsmTitle({ char, children }) {
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
