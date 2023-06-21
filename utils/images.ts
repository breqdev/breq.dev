import imageSize from "image-size";
import { join } from "path";
import { ExifImage } from "exif";
import { ISizeCalculationResult } from "image-size/dist/types/interface";

function formatExifDate(dateString?: string) {
  if (!dateString) {
    return "";
  }

  let [date, time] = dateString.split(" ");
  date = date.replace(/:/g, "-");
  time = time.split(":").slice(0, 2).join(":");
  return `${date} ${time}`;
}

function dmsToDecimal(dms: [number, number, number]) {
  const [degrees, minutes, seconds] = dms;
  return degrees + minutes / 60 + seconds / 3600;
}

function formatExifGPS(
  latDMS?: [number, number, number],
  lonDMS?: [number, number, number]
) {
  if (!latDMS || !lonDMS) {
    return ["", ""];
  }

  let lat = dmsToDecimal(latDMS);
  let lon = dmsToDecimal(lonDMS);

  const mapsLink = `http://www.google.com/maps/place/${lat},${-lon}/@${lat},${-lon},17z/data=!3m1!1e3`;

  let latString: string, lonString: string;

  if (lat < 0) {
    latString = `${-lat.toFixed(5)}°S`;
  } else {
    latString = `${lat.toFixed(5)}°N`;
  }

  if (lon < 0) {
    lonString = `${-lon.toFixed(5)}°E`;
  } else {
    lonString = `${lon.toFixed(5)}°W`;
  }

  return [`${latString}, ${lonString}`, mapsLink];
}

export type ExifInfo = {
  camera: string;
  capturedOn: string;
  editedOn: string;
  gps: string;
  mapsLink: string;
};

export type ImageInfo = {
  width: number;
  height: number;
  src: string;
  exif: ExifInfo | null;
};

export async function loadImage(
  src: string,
  { dir = "images" } = {}
): Promise<ImageInfo | null> {
  if (!src) {
    return null;
  }

  const { width, height } = await new Promise<ISizeCalculationResult>(
    (resolve, reject) => {
      imageSize(join("public", dir, src), (err, dimensions) => {
        if (err || !dimensions) {
          console.log("error loading image", err);
          reject(err);
          return;
        }
        resolve(dimensions);
      });
    }
  );

  const exif: ExifInfo | null = await new Promise((resolve, reject) => {
    if (!src.endsWith(".jpg")) {
      resolve(null);
      return;
    }

    try {
      new ExifImage({ image: join("public", dir, src) }, (err, data) => {
        if (err) {
          console.warn("error loading image exif", err);
          resolve(null);
          return;
        }

        const camera = data.image
          ? `${data.image.Make} ${data.image.Model}`
          : "";

        const capturedOn = formatExifDate(data.exif.DateTimeOriginal);
        const editedOn = formatExifDate(data.image.ModifyDate);

        const [gps, mapsLink] = formatExifGPS(
          data.gps.GPSLatitude as [number, number, number],
          data.gps.GPSLongitude as [number, number, number]
        );

        resolve({
          camera,
          capturedOn,
          editedOn,
          gps,
          mapsLink,
        });
      });
    } catch (err) {
      console.log("error loading image exif", err);
      resolve(null);
    }
  });

  return {
    src: "/" + join(dir, src),
    width: width as number,
    height: height as number,
    exif,
  };
}
