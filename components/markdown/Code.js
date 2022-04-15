import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";

const lightTheme = {
  blue: "#1bb3ff",
  pink: "#ff218c",
  gray: "#9CA3AF",
  purple: "#8B5CF6",
  dark: "#404040",
};

const darkTheme = {
  blue: "#1bb3ff",
  pink: "#ff218c",
  gray: "#9CA3AF",
  purple: "#a37aff",
  dark: "#cccccc",
};

const theme = (colors) => ({
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
});

export default function Code(props) {
  const [dark, setDark] = React.useState(false);

  React.useLayoutEffect(() => {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
    setDark(prefersDarkMode.matches);

    prefersDarkMode.addEventListener("change", (e) => {
      setDark(e.matches);
    });
  }, []);

  if (
    props.children.props.originalType !== "code" ||
    typeof props.children.props.children !== "string"
  ) {
    console.error("Code component must wrap a <code> tag with a string inside");
    return null;
  }

  return (
    <Highlight
      {...defaultProps}
      theme={theme(dark ? darkTheme : lightTheme)}
      code={props.children.props.children.trim()}
      language={props.children.props.className?.replace("language-", "")}
    >
      {({ tokens, getLineProps, getTokenProps }) => (
        <pre className="mx-auto my-2 w-max min-w-[min(100%,42rem)] max-w-full overflow-x-auto rounded-2xl bg-[#fff5fc] py-2 pl-4 pr-8 font-mono text-lg dark:bg-gray-800">
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })} className="" key={i}>
              {line.map((token, key) => (
                <span
                  {...getTokenProps({ token, key })}
                  className=""
                  key={token}
                />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
