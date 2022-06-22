import React from "react";

function Ul({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-prose text-lg">
      <ul className="ml-8 list-disc">{children}</ul>
    </div>
  );
}

function Ol({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-prose text-lg">
      <ol className="ml-8 list-decimal">{children}</ol>
    </div>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return <li className="my-2 pl-2">{children}</li>;
}

const shortcodes = {
  ul: Ul,
  ol: Ol,
  li: Li,
};

export default shortcodes;
