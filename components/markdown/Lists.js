import React from "react";

function Ul(props) {
  return (
    <div className="mx-auto max-w-prose text-lg">
      <ul className="ml-8 list-disc">{props.children}</ul>
    </div>
  );
}

function Ol(props) {
  return (
    <div className="mx-auto max-w-prose text-lg">
      <ol className="ml-8 list-decimal">{props.children}</ol>
    </div>
  );
}

function Li(props) {
  return <li className="my-2 pl-2">{props.children}</li>;
}

const shortcodes = {
  ul: Ul,
  ol: Ol,
  li: Li,
};

export default shortcodes;
