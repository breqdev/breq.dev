import React from "react";
import { PoemContext, Paragraph } from "./Core";

function Caption(props) {
  return (
    <p className="text-center font-body mx-auto max-w-xl mb-8">
      {props.children}
    </p>
  );
}

function Poem(props) {
  return (
    <PoemContext.Provider value={{ poem: true }}>
      <section
        className={
          "mx-auto max-w-3xl pl-16 text-lg font-body " +
          (props.center ? " mx-auto" : "")
        }
        style={{
          textIndent: "-64px",
          maxWidth: "min(max-content, 100%)",
        }}
      >
        {props.children}
      </section>
    </PoemContext.Provider>
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
