import React from "react";

export default function Desmos({ id }) {
  return (
    <div className="aspect-w-3 aspect-h-3 md:aspect-h-2 max-w-6xl">
      <iframe
        title="Desmos Graph"
        className="h-full w-full"
        src={`https://www.desmos.com/calculator/${id}?embed`}
        frameBorder="0"
      />
    </div>
  );
}
