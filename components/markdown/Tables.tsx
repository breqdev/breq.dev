import React from "react";

function Table({ children }: { children: React.ReactNode }) {
  return (
    <table className="border-spacing-0 mx-auto border-separate overflow-hidden rounded-xl border-2 border-black dark:border-white">
      {children}
    </table>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="border border-black p-2 dark:border-white">{children}</th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="border border-gray-500 p-2">{children}</td>;
}

const shortcodes = {
  table: Table,
  th: Th,
  td: Td,
};

export default shortcodes;
