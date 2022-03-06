import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import React from "react";

import core, { MarkdownContext } from "./Core";
import artistic from "./Artistic";
import headings from "./Headings";
import lists from "./Lists";
import tables from "./Tables";
import Code from "./Code";
import embeds from "../embeds";

const shortcodes = {
  ...core,
  ...artistic,
  ...headings,
  ...lists,
  ...tables,
  ...embeds,
  code: Code,
};

export default function Markdown(props) {
  return (
    <MarkdownContext.Provider value={{ poem: false, dark: props.dark }}>
      <MDXProvider components={shortcodes}>
        <div className="font-body">
          <MDXRenderer>{props.children}</MDXRenderer>
        </div>
      </MDXProvider>
    </MarkdownContext.Provider>
  );
}
