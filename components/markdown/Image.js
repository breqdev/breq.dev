import Image from "next/image";

export default function MarkdownImage(props) {
  return (
    <div className="my-4 mx-auto w-full max-w-5xl">
      <Image alt="" {...props} src={"/images/" + props.src} />
    </div>
  );
}
