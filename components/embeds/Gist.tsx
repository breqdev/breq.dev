import React from "react";

export default function Gist({ id }: { id: string }) {
  return (
    <div className="hidden h-screen w-full px-16 md:block">
      <iframe
        className="h-full w-full"
        src={`https://gist.github.com/breqdev/${id}.pibb?scroll=true`}
      />
    </div>
  );
}
