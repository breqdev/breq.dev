import React from "react";
import { MarkdownContext, Paragraph } from "./Core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { parseDig } from "../../utils/parseDig";

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

function Review({
  title,
  stars,
  children,
}: {
  title: string;
  stars: number;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto my-4 max-w-prose rounded-2xl bg-gray-200 px-4 py-2 font-body text-lg dark:bg-gray-800">
      <div className="flex flex-col justify-between pt-2 sm:flex-row">
        <h2 className="font-display text-2xl font-bold">{title}</h2>

        <span className="w-36 text-2xl text-yellow-600">
          {Array.from({ length: Math.floor(stars) })
            .fill(null)
            .map((_, i) => (
              <FontAwesomeIcon key={i} icon={faStar} />
            ))}
          {Math.ceil(stars) > Math.floor(stars) ? (
            <FontAwesomeIcon icon={faStarHalf} />
          ) : null}
        </span>
      </div>
      {children}
    </div>
  );
}

function Dig({ children }: { children: React.ReactElement }) {
  const text = children?.props?.children?.props?.children;

  const dig = parseDig(text);

  return (
    <div className="mx-auto my-4 max-w-4xl overflow-clip rounded-2xl border-2 border-black bg-black font-body text-lg text-black">
      <h3 className="mx-4 my-2 font-mono font-bold text-white">
        <span className="text-panpink-light">$ </span>dig @{dig.options.server}{" "}
        {dig.options.flags.join(" ")} {dig.options.queryType}{" "}
        {dig.options.queryName}
      </h3>
      {dig.answerSection.length > 0 ? (
        <>
          <hr className="border border-black" />
          <div className="bg-panyellow-light px-4 py-2">
            <p className="mb-2 text-center font-mono italic">Answer Section</p>
            <table className="w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>TTL</th>
                  <th>Class</th>
                  <th>Type</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {dig.answerSection.map((record, i) => (
                  <tr
                    key={i}
                    className="font-mono *:border-2 *:border-black *:px-2"
                  >
                    <td>{record.name}</td>
                    <td>{record.ttl}</td>
                    <td>{record.class}</td>
                    <td>{record.type}</td>
                    <td>{record.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : null}
      {dig.authoritySection.length > 0 ? (
        <>
          <hr className="border border-black" />
          <div className="bg-panblue-light px-4 py-2">
            <p className="mb-2 text-center font-mono italic">
              Authority Section
            </p>
            <table className="w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>TTL</th>
                  <th>Class</th>
                  <th>Type</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {dig.authoritySection.map((record, i) => (
                  <tr
                    key={i}
                    className="font-mono *:border-2 *:border-black *:px-2"
                  >
                    <td>{record.name}</td>
                    <td>{record.ttl}</td>
                    <td>{record.class}</td>
                    <td>{record.type}</td>
                    <td>{record.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : null}
      {dig.additionalSection.length > 0 ? (
        <>
          <hr className="border border-black" />
          <div className="bg-brookepurple-light px-4 py-2">
            <p className="mb-2 text-center font-mono italic">
              Additional Section
            </p>
            <table className="w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>TTL</th>
                  <th>Class</th>
                  <th>Type</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {dig.additionalSection.map((record, i) => (
                  <tr
                    key={i}
                    className="font-mono *:border-2 *:border-black *:px-2"
                  >
                    <td>{record.name}</td>
                    <td>{record.ttl}</td>
                    <td>{record.class}</td>
                    <td>{record.type}</td>
                    <td>{record.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : null}
    </div>
  );
}

const shortcodes = {
  Caption,
  Poem,
  Indent,
  Half,
  DsmTitle,
  Review,
  Dig,
};

export default shortcodes;
