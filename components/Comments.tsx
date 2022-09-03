import React, { useRef, useEffect } from "react";

/*
<script src="https://utteranc.es/client.js"
        repo="breqdev/breq.dev"
        issue-term="pathname"
        label="Utterances"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>
*/

export default function Comments() {
  const commentBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = commentBox.current;

    if (!box) {
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://utteranc.es/client.js";
    script.crossOrigin = "anonymous";

    script.setAttribute("repo", "breqdev/breq.dev");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("label", "Utterances");
    script.setAttribute("theme", "preferred-color-scheme");

    box.appendChild(script);

    return () => {
      if (box.contains(script)) {
        box.removeChild(script);
      }
    };
  }, []);

  return <div className="mb-12" ref={commentBox} />;
}
