import { MDXRemote } from "next-mdx-remote";
import React from "react";

import core, { MarkdownContext } from "./Core";
import artistic from "./Artistic";
import headings from "./Headings";
import lists from "./Lists";
import tables from "./Tables";
import Code from "./Code";
import embeds from "../embeds";
import MarkdownImage from "./Image";

const shortcodes = {
  ...core,
  ...artistic,
  ...headings,
  ...lists,
  ...tables,
  ...embeds,
  pre: Code,
  img: MarkdownImage,
};

export default function Markdown({
  content,
  dark,
  mode = "full",
}: {
  content: any;
  dark?: boolean;
  mode?: "minimal" | "full";
}) {
  return (
    <MarkdownContext.Provider
      value={{ poem: false, dark: dark || false, mode }}
    >
      <div className="e-content font-body">
        <MDXRemote components={shortcodes} {...content} />
      </div>
    </MarkdownContext.Provider>
  );
}
