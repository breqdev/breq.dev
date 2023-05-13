import fs from "fs/promises";
import { join } from "path";
import { BasicMarkdownInfo, loadMarkdown } from "./api";
import { ImageInfo, loadImage } from "./images";

const PHOTOS_PATH = "public/photos";

type PhotoSetMetadata = {
  title: string;
  descriptions: string[];
};

export type PhotoSetInfo = {
  title: string;
  photos: (ImageInfo & { description: string })[];
};

export async function getPhotoSets(): Promise<
  (PhotoSetInfo & BasicMarkdownInfo)[]
> {
  const folders = (await fs.readdir(PHOTOS_PATH, { withFileTypes: true }))
    .filter((f) => f.isDirectory())
    .reverse();

  const sets = await Promise.all(
    folders.map(async (folder) => {
      const files = await fs.readdir(join(PHOTOS_PATH, folder.name), {
        withFileTypes: true,
      });

      const photos = files
        .filter((f) => f.isFile())
        .filter(
          (f) =>
            f.name.endsWith(".jpg") ||
            f.name.endsWith(".png") ||
            f.name.endsWith(".JPG")
        );

      const metadata = files
        .filter((f) => f.isFile())
        .filter((f) => f.name.endsWith(".md"))[0];

      const { title, body, descriptions } =
        await loadMarkdown<PhotoSetMetadata>(
          join(PHOTOS_PATH, folder.name, metadata.name),
          {
            loadBody: true,
          }
        );

      const photosWithSizes = await Promise.all(
        photos.map((photo) =>
          loadImage(photo.name, { dir: join("photos", folder.name) })
        )
      );

      return {
        title,
        body,
        photos: photosWithSizes.map((photo, i) => ({
          ...photo,
          description: descriptions[i],
        })),
      } as PhotoSetInfo & BasicMarkdownInfo;
    })
  );

  return sets;
}
