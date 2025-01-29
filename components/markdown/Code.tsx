import React from "react";
import { Highlight, PrismTheme } from "prism-react-renderer";
import Prism from "prism-react-renderer/prism";

// https://github.com/FormidableLabs/prism-react-renderer#faq
(() => {
  ((typeof global !== "undefined" ? global : window) as any).Prism = Prism;

  require("prismjs/components/prism-rust");
  require("prismjs/components/prism-asm6502");
  require("prismjs/components/prism-java");
  require("prismjs/components/prism-smali");
  require("prismjs/components/prism-http");
})();

type Colors = {
  blue: string;
  pink: string;
  gray: string;
  purple: string;
  dark: string;
};

const lightTheme: Colors = {
  blue: "#1bb3ff",
  pink: "#ff218c",
  gray: "#9CA3AF",
  purple: "#8B5CF6",
  dark: "#404040",
};

const darkTheme: Colors = {
  blue: "#1bb3ff",
  pink: "#ff218c",
  gray: "#9CA3AF",
  purple: "#a37aff",
  dark: "#cccccc",
};

function theme(colors: Colors): PrismTheme {
  return {
    plain: {
      color: colors.dark,
    },
    styles: [
      {
        types: ["changed"],
        style: {
          color: colors.purple,
          fontStyle: "italic",
        },
      },
      {
        types: ["deleted"],
        style: {
          color: colors.pink,
          fontStyle: "italic",
        },
      },
      {
        types: ["inserted", "attr-name"],
        style: {
          color: colors.blue,
          fontStyle: "italic",
        },
      },
      {
        types: ["comment"],
        style: {
          color: colors.gray,
          fontStyle: "italic",
        },
      },
      {
        types: ["string", "builtin", "char", "constant", "url"],
        style: {
          color: colors.blue,
        },
      },
      {
        types: ["variable"],
        style: {
          color: colors.pink,
        },
      },
      {
        types: ["number"],
        style: {
          color: colors.purple,
        },
      },
      {
        types: ["punctuation"],
        style: {
          color: colors.pink,
        },
      },
      {
        types: ["function", "selector", "doctype"],
        style: {
          color: colors.pink,
          fontStyle: "italic",
        },
      },
      {
        types: ["class-name"],
        style: {
          color: colors.dark,
        },
      },
      {
        types: ["tag"],
        style: {
          color: colors.pink,
        },
      },
      {
        types: ["operator", "property", "keyword", "namespace"],
        style: {
          color: colors.purple,
        },
      },
      {
        types: ["boolean"],
        style: {
          color: colors.purple,
        },
      },
    ],
  };
}

export default function Code({
  children,
  ...props
}: {
  children: React.ReactElement<any>;
  file?: string;
}) {
  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
    setDark(prefersDarkMode.matches);

    prefersDarkMode.addEventListener("change", (e) => {
      setDark(e.matches);
    });
  }, []);

  if (typeof children.props.children !== "string") {
    console.error("Code component must wrap a <code> tag with a string inside");
    return null;
  }

  return (
    <div className="mx-auto my-2 w-max min-w-[min(100%,42rem)] max-w-full overflow-x-auto rounded-2xl bg-[#fff5fc] py-2 pl-4 pr-8 font-mono text-lg dark:bg-gray-800 flex flex-col border-2 border-black">
      {props.file && (
        <>
          <span className="font-bold">{props.file}</span>
          <div className="-ml-4 -mr-8 my-2 border-b-2 border-black" />
        </>
      )}
      <Highlight
        theme={theme(dark ? darkTheme : lightTheme)}
        code={children.props.children.trim()}
        language={children.props.className?.replace("language-", "")}
      >
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })} className="" key={i}>
                {line.map((token, key) => (
                  <span
                    {...getTokenProps({ token, key })}
                    className=""
                    key={key}
                  />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
