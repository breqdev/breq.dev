import React from "react";

function Table(props) {
  return (
    <table className="mx-auto border-black dark:border-white border-2 rounded-xl border-separate border-spacing-0 overflow-hidden">
      {props.children}
    </table>
  );
}

function Th(props) {
  return (
    <th className="border-black dark:border-white border p-2">
      {props.children}
    </th>
  );
}

function Td(props) {
  return <td className="border-gray-500 border p-2">{props.children}</td>;
}

const shortcodes = {
  table: Table,
  th: Th,
  td: Td,
};

export default shortcodes;
