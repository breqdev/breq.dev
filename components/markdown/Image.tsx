import Image from "next/image";
import { ImageInfo } from "../../utils/images";

export default function MarkdownImage(props: ImageInfo) {
  return (
    <div
      className="my-4 mx-auto"
      style={{
        aspectRatio: `${props.width}/${props.height}`,
        maxWidth: "48rem",
        maxHeight: "48rem",
      }}
    >
      <Image
        alt=""
        {...props}
        src={"/images/" + props.src}
        style={{
          maxWidth: "100%",
          height: "auto"
        }} />
    </div>
  );
}
