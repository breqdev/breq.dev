import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";

function ProjectVideo(props) {
  return (
    <video
      playsInline
      autoPlay
      muted
      loop
      disablePictureInPicture
      className="w-full object-cover"
      tabIndex="-1"
    >
      <source src={props.src} type="video/webm" />
    </video>
  );
}

export default function Project(props) {
  let media;

  if (props.frontmatter.video) {
    media = <ProjectVideo src={props.frontmatter.video} />;
  } else if (props.frontmatter.image) {
    const image = getImage(props.frontmatter.image);

    media = (
      <GatsbyImage
        image={image}
        alt={props.frontmatter.title}
        objectFit="cover"
      />
    );
  }

  return (
    <Link
      to={"/projects/" + props.slug}
      className="block rounded-2xl border-4 border-black bg-white p-4 text-black focus:border-panpink dark:bg-gray-800 dark:text-white"
    >
      <section>
        <div className="h-32 overflow-hidden font-display">
          <h2 className="text-3xl">{props.frontmatter.title}</h2>
          <h3 className="mb-2">{props.frontmatter.description}</h3>
        </div>
        <div className="flex h-52 w-full overflow-hidden rounded-lg">
          {media}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <FontAwesomeIcon icon={faTag} className="text-lg" />
          <div className="flex gap-2 overflow-x-auto">
            {props.frontmatter.tags?.map((tag) => (
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
