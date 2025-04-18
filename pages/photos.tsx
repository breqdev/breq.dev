import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Markdown from "../components/markdown/Markdown";
import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";
import { getPhotoSets, PhotoSetInfo } from "../utils/photos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faCamera,
  faMapMarkerAlt,
  faPencilAlt,
  faTimes,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { BasicMarkdownInfo } from "../utils/markdown";
import { ImageInfo } from "../utils/images";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      sets: await getPhotoSets(),
    },
  };
};

function SetHeading({ set }: { set: PhotoSetInfo & BasicMarkdownInfo }) {
  return (
    <article className="mx-4">
      <div className="mx-auto mb-8 mt-12 flex max-w-xl flex-col gap-4 rounded-3xl border-2 border-white p-4 md:p-8">
        <h2 className="text-center font-display text-4xl">{set.title}</h2>
        <Markdown content={set.body} dark />
      </div>
    </article>
  );
}

function ExifItem({
  icon,
  text,
  link,
}: {
  icon: IconDefinition;
  text: string;
  link?: string;
}) {
  return (
    <div className="flex flex-row items-center font-body text-gray-300">
      <span className="w-4">
        <FontAwesomeIcon icon={icon} />
      </span>
      <span className="ml-2">
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {text}
          </a>
        ) : (
          text
        )}
      </span>
    </div>
  );
}

function PhotoDetail({
  photo,
  onClose,
  open,
}: {
  photo: ImageInfo & { description: string };
  onClose: () => void;
  open: string | null;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open === photo.src) {
      dialog?.showModal();
    } else {
      dialog?.close();
    }
  }, [open, photo.src]);

  return (
    <dialog
      ref={dialogRef}
      className=""
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          onClose();
        }
      }}
    >
      <div className="flex max-w-5xl flex-col border-2 border-white bg-black text-white md:flex-row">
        <div className="relative aspect-square max-h-full">
          <a href={photo.src}>
            <Image
              src={photo.src}
              width={photo.width}
              height={photo.height}
              alt={photo.description}
              className=""
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </a>
          <button
            className="absolute right-0 top-0 px-4 py-2 text-5xl md:hidden"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="flex flex-grow flex-col gap-2 overflow-auto px-4 py-4 md:w-72 md:max-w-md md:flex-shrink-0 md:py-0">
          <button
            className="hidden self-end px-2 py-4 text-7xl outline-none focus-visible:text-panpink md:block"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <p className="font-body">{photo.description}</p>
          {photo.exif && (
            <>
              <ExifItem icon={faCamera} text={photo.exif.camera} />
              <ExifItem icon={faCalendarAlt} text={photo.exif.capturedOn} />
              <ExifItem icon={faPencilAlt} text={photo.exif.editedOn} />
              <ExifItem
                icon={faMapMarkerAlt}
                text={photo.exif.gps}
                link={photo.exif.mapsLink}
              />
            </>
          )}
        </div>
      </div>
    </dialog>
  );
}

export default function Photos({
  sets,
}: {
  sets: (BasicMarkdownInfo & PhotoSetInfo)[];
}) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <Page className="bg-black text-white">
      <SEOHelmet title="Photos by Brooke, taken with <3." />
      <h1 className="mt-16 text-center font-display text-7xl">photos</h1>
      {sets.map((set) => (
        <div key={set.title} className="my-8">
          <SetHeading set={set} />
          <div className="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))]">
            {set.photos.map((photo) => (
              <>
                <button
                  key={photo.src}
                  className="group relative aspect-square min-h-0 outline-none"
                  onClick={() => setOpen(photo.src)}
                >
                  <Image
                    src={photo.src}
                    width={photo.width}
                    height={photo.height}
                    alt={photo.description}
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                    }}
                  />
                  <div className="absolute inset-0 z-20 -m-1 hidden border-8 border-panpink group-focus-visible:block" />
                </button>
                <PhotoDetail
                  photo={photo}
                  open={open}
                  key={photo.src}
                  onClose={() => setOpen(null)}
                />
              </>
            ))}
          </div>
        </div>
      ))}
    </Page>
  );
}
