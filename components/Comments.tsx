import Giscus from "@giscus/react";

export default function Comments() {
  return (
    <div className="mx-auto mb-8 max-w-3xl px-4">
      <Giscus
        id="comments"
        repo="breqdev/breq.dev"
        repoId="MDEwOlJlcG9zaXRvcnkzOTQxMjU0ODQ="
        category="Comments"
        categoryId="DIC_kwDOF33grM4ClvXO-hVS"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="light"
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
