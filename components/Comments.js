import React, { useRef, useEffect } from "react";

/*
<script src="https://utteranc.es/client.js"
        repo="Breq16/breq.dev"
        issue-term="pathname"
        label="Utterances"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>
*/

export default function Comments(props) {
  const commentBox = useRef(null);

  useEffect(() => {
    const box = commentBox.current;
    const script = document.createElement("script");

    script.async = true;
    script.src = "https://utteranc.es/client.js";
    script.crossOrigin = "anonymous";

    script.setAttribute("repo", "Breq16/breq.dev");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("label", "Utterances");
    script.setAttribute("theme", "preferred-color-scheme");

    box.appendChild(script);

    return () => {
      box.removeChild(script);
    };
  }, []);

  return <div className="mb-12" ref={commentBox} />;
}