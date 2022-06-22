import React from "react";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

export default function YouTube({ id, title }: { id: string; title?: string }) {
  return (
    <div className="my-4 aspect-video overflow-hidden rounded-2xl">
      <LiteYouTubeEmbed id={id} title={title || ""} />
    </div>
  );
}
