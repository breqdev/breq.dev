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
    <MarkdownContext.Provider value={{ poem: true }}>
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

const shortcodes = {
  Caption,
  Poem,
  Indent,
  Half,
};

export default shortcodes;
