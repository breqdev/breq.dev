import React from "react";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

export default function YouTube({
  id,
  title,
  square,
}: {
  id: string;
  title?: string;
  square?: boolean;
}) {
  return (
    <div
      className={`my-4 ${
        square ? "aspect-square" : "aspect-video"
      } overflow-hidden rounded-2xl`}
    >
      <LiteYouTubeEmbed
        id={id}
        title={title || ""}
        aspectHeight={square ? 1 : undefined}
        aspectWidth={square ? 1 : undefined}
      />
    </div>
  );
}
