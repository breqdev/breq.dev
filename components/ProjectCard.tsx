import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { ProjectInfo } from "../utils/projects";
import Balancer from "react-wrap-balancer";

function ProjectVideo({ src }: { src: string }) {
  return (
    <video
      playsInline
      autoPlay
      muted
      loop
      disablePictureInPicture
      className="w-full object-cover"
      tabIndex={-1}
    >
      <source src={"/videos/" + src} type="video/webm" />
    </video>
  );
}

export default function ProjectCard({
  video,
  image,
  title,
  slug,
  description,
  tags,
}: ProjectInfo) {
  let media;

  if (video) {
    media = <ProjectVideo src={video} />;
  } else if (image) {
    media = (
      <Image
        src={image}
        alt={title}
        style={{
          maxWidth: "100%",
          height: "auto",
          objectFit: "cover",
        }}
      />
    );
  }

  return (
    <Link
      href={"/projects/" + slug}
      className="block rounded-2xl border-4 border-black bg-white p-4 text-black focus:border-panpink dark:bg-gray-800 dark:text-white"
    >
      <section>
        <div className="h-32 overflow-hidden font-display">
          <h2 className="text-3xl">
            <Balancer>{title}</Balancer>
          </h2>
          <h3 className="mb-2">
            <Balancer>{description}</Balancer>
          </h3>
        </div>
        <div className="flex h-52 w-full overflow-hidden rounded-lg">
          {media}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <FontAwesomeIcon icon={faTag} className="text-lg" />
          <div className="flex gap-2 overflow-x-auto">
            {tags?.map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-full bg-panblue-light px-3 py-1 text-sm text-black"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
    </Link>
  );
}
