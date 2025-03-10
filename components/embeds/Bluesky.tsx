import Script from "next/script";

export default function Bluesky({ uri, cid }: { uri: string; cid: string }) {
  return (
    <div className="mx-auto max-w-lg">
      <blockquote
        className="bluesky-embed"
        data-bluesky-uri={uri}
        data-bluesky-cid={cid}
        data-bluesky-embed-color-mode="system"
      />
      <Script src="https://embed.bsky.app/static/embed.js" />
    </div>
  );
}
