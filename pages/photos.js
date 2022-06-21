import Image from "next/image";
import React, { useRef, useState } from "react";
import Markdown from "../components/markdown/Markdown";
import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";
import { getPhotoSets } from "../utils/photos";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faCamera,
  faMapMarkerAlt,
  faPencilAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement("#__next");

export async function getStaticProps() {
  return {
    props: {
      sets: await getPhotoSets(),
    },
  };
}

function SetHeading({ set }) {
  return (
    <article className="mx-4">
      <div className="mx-auto mt-12 mb-8 flex max-w-xl flex-col gap-4 rounded-3xl border-2 border-white p-4 md:p-8">
        <h2 className="text-center font-display text-4xl">{set.title}</h2>
        <Markdown content={set.body} dark />
      </div>
    </article>
  );
}

function ExifItem({ icon, text, link }) {
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

function PhotoDetail({ photo, onClose, open }) {
  const closeButton = useRef(null);

  return (
    <Modal
      isOpen={open === photo.src}
      className="flex max-h-full justify-center"
      overlayClassName="bg-black/25 opacity-100 fixed inset-0 z-50 pt-32 md:pt-48 px-8 sm:px-16 pb-32"
      onRequestClose={onClose}
      onAfterOpen={() => {
        closeButton.current.focus();
      }}
    >
      <div className="flex max-w-5xl flex-col border-2 border-white bg-black text-white md:flex-row">
        <div className="relative -mb-2 aspect-square max-h-full">
          <Image
            src={photo.src}
            width={photo.width}
            height={photo.height}
            alt={photo.description}
            className=""
          />
          <button
            className="absolute top-0 right-0 px-4 py-2 text-5xl md:hidden"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="flex flex-grow flex-col gap-2 overflow-auto px-4 py-4 md:w-72 md:max-w-md md:flex-shrink-0 md:py-0">
          <button
            className="hidden self-end py-4 px-2 text-7xl outline-none focus-visible:text-panpink md:block"
            onClick={onClose}
            ref={closeButton}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <p className="font-body">{photo.description}</p>
          <ExifItem icon={faCamera} text={photo.exif.camera} />
          <ExifItem icon={faCalendarAlt} text={photo.exif.capturedOn} />
          <ExifItem icon={faPencilAlt} text={photo.exif.editedOn} />
          <ExifItem
            icon={faMapMarkerAlt}
            text={photo.exif.gps}
            link={photo.exif.mapsLink}
          />
        </div>
      </div>
    </Modal>
  );
}

export default function Photos({ sets }) {
  const [open, setOpen] = useState(null);

  return (
    <Page className="bg-black text-white">
      <SEOHelmet title="photos by breq with <3" />
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
                  />
                  <div className="absolute inset-0 z-20 -m-1 hidden border-8 border-panpink group-focus-visible:block" />
                </button>
                <PhotoDetail
                  photo={photo}
                  open={open}
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
