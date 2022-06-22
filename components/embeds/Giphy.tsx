import React from "react";

export default function Giphy({ id }: { id: string }) {
  return (
    <iframe
      title="gif from giphy"
      src={"https://giphy.com/embed/" + id}
      width="270"
      height="480"
      frameBorder="0"
      allowFullScreen
      className="mx-auto my-4"
    ></iframe>
  );
}
