import React from "react";

export default function Gist({ id }: { id: string }) {
  return (
    // eslint-disable-next-line @next/next/no-sync-scripts
    <iframe
      className="mx-16 h-screen w-full"
      src={`https://gist.github.com/breqdev/${id}.pibb?scroll=true`}
    />
  );
}
