import Image from "next/image";
import { ImageInfo } from "../../utils/images";

export default function MarkdownImage(props: ImageInfo) {
  return (
    <div className="my-4 mx-auto flex w-full max-w-5xl justify-center overflow-hidden rounded-2xl">
      <Image alt="" {...props} src={"/images/" + props.src} />
    </div>
  );
}
