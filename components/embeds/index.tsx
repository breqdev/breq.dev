import Desmos from "./Desmos";
import Tweet from "./Twitter";
import YouTube from "./YouTube";
import Giphy from "./Giphy";
import SoundCloud from "./SoundCloud";
import dynamic from "next/dynamic";
import Bluesky from "./Bluesky";

const Gist = dynamic(() => import("./Gist"), { ssr: false });

const embeds = {
  Desmos,
  Tweet,
  YouTube,
  Giphy,
  SoundCloud,
  Gist,
  Bluesky,
};

export default embeds;
