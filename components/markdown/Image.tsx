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
        <Image
          {...props}
          alt={props.alt}
          src={"/images/" + props.src}
          style={{
            maxWidth: "min(48rem, 100%)",
            maxHeight: "40rem",
            margin: "2rem auto",
            objectFit: "contain",
          }}
        />
    );
  }
}
