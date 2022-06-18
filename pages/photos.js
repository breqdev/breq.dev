import Image from "next/image";
import React, { useState } from "react";
import Markdown from "../components/markdown/Markdown";
import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";
import { getPhotoSets } from "../utils/photos";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

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
    <div className="mx-auto mt-12 mb-8 flex max-w-xl flex-col gap-4 rounded-3xl border-2 border-white p-8">
      <h2 className="text-center font-display text-4xl">{set.title}</h2>
      <Markdown content={set.body} dark />
    </div>
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
                  className="group relative aspect-square min-h-0"
                  onClick={() => setOpen(photo.src)}
                >
                  <Image
                    src={photo.src}
                    width={photo.width}
                    height={photo.height}
                    alt={photo.description}
                  />
                </button>
                <Modal
                  isOpen={open === photo.src}
                  className="flex h-full justify-center"
                  overlayClassName="bg-black/25 opacity-100 fixed inset-0 z-50 pt-48 px-16 pb-32"
                  onRequestClose={() => setOpen(null)}
                >
                  <div className="flex max-w-5xl border-2 border-white bg-black text-white">
                    <div className="aspect-square h-full">
                      <Image
                        src={photo.src}
                        width={photo.width}
                        height={photo.height}
                        alt={photo.description}
                        className=""
                      />
                    </div>
                    <div className="flex w-full max-w-md flex-col gap-4 ">
                      <button
                        className="self-end py-4 px-6 text-7xl"
                        onClick={() => setOpen(null)}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                      <p className="p-4">{photo.description}</p>
                    </div>
                  </div>
                </Modal>
              </>
            ))}
          </div>
        </div>
      ))}
    </Page>
  );
}
