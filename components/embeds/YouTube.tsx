import React from "react";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

export default function YouTube({ id, title = null }) {
  return (
    <div className="aspect-w-16 aspect-h-9 my-4 overflow-hidden rounded-2xl">
      <LiteYouTubeEmbed id={id} title={title || ""} />
    </div>
  );
}
