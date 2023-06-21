import Image from "next/image";
import { ImageInfo } from "../../utils/images";

export default function MarkdownImage(props: ImageInfo & { alt: string }) {
  if (props.src.endsWith(".svg")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className="mx-auto"
        {...props}
        alt={props.alt}
        src={"/images/" + props.src}
      />
    );
  } else {
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
          {...props}
          alt={props.alt}
          src={"/images/" + props.src}
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </div>
    );
  }
}
