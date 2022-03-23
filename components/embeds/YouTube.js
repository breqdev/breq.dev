import React from "react";

export default function YouTube(props) {
  return (
    <div className="my-4 aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden">
      <lite-youtube videoid={props.id} class="max-w-full" params="rel=0">
        <button className="lty-playbtn">
          <span className="sr-only">Play</span>
        </button>
      </lite-youtube>
    </div>
  );
}
