import React from "react";

export default function Desmos({ id }: { id: string }) {
  return (
    <div className="aspect-square max-w-6xl md:aspect-video">
      <iframe
        title="Desmos Graph"
        className="h-full w-full"
        src={`https://www.desmos.com/calculator/${id}?embed`}
        frameBorder="0"
      />
    </div>
  );
}
