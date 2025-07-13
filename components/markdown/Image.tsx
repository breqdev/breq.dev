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
      // Wrapper div avoids page breaks in print mode
      <div className="contents break-inside-avoid print:block">
        <Image
          {...props}
          alt={props.alt}
          src={"/images/" + props.src}
          className="max-w-[min(48rem,100%)] print:max-w-sm"
          style={{
            // maxWidth: "min(48rem, 100%)",
            maxHeight: "40rem",
            margin: "0 auto",
            objectFit: "contain",
          }}
        />
      </div>
    );
  }
}
