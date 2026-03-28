import React from "react";

function Table({ children }: { children: React.ReactNode }) {
  return (
    <table className="mx-auto border-separate border-spacing-0 overflow-hidden rounded-xl border-2 border-black bg-white dark:border-white dark:bg-gray-800">
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
