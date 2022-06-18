import imageSize from "image-size";
import { join } from "path";
import { ExifImage } from "exif";

function formatExifDate(dateString) {
  let [date, time] = dateString.split(" ");
  date = date.replace(/:/g, "-");
  time = time.split(":").slice(0, 2).join(":");
  return `${date} ${time}`;
}

function dmsToDecimal(dms) {
  const [degrees, minutes, seconds] = dms;
  return degrees + minutes / 60 + seconds / 3600;
}

function formatExifGPS(lat, lon) {
  lat = dmsToDecimal(lat);
  lon = dmsToDecimal(lon);

  const mapsLink = `http://www.google.com/maps/place/${lat},${-lon}/@${lat},${-lon},17z/data=!3m1!1e3`;

  if (lat < 0) {
    lat = `${-lat.toFixed(5)}°S`;
  } else {
    lat = `${lat.toFixed(5)}°N`;
  }

  if (lon < 0) {
    lon = `${-lon.toFixed(5)}°E`;
  } else {
    lon = `${lon.toFixed(5)}°W`;
  }

  return [`${lat}, ${lon}`, mapsLink];
}

export async function loadImage(src, { dir = "images" } = {}) {
  if (!src) {
    return {};
  }

  const { width, height } = await new Promise((resolve, reject) => {
    imageSize(join("public", dir, src), (err, dimensions) => {
      if (err) {
        console.log("error loading image", err);
        reject(err);
      }
      resolve(dimensions);
    });
  });

  const exif = await new Promise((resolve, reject) => {
    if (!src.endsWith(".jpg")) {
      resolve(null);
    }

    try {
      new ExifImage({ image: join("public", dir, src) }, (err, data) => {
        if (err) {
          console.log("error loading image exif", err);
          reject(err);
        }

        const camera = `${data.image.Make} ${data.image.Model}`;

        const capturedOn = formatExifDate(data.exif.DateTimeOriginal);
        const editedOn = formatExifDate(data.image.ModifyDate);

        const [gps, mapsLink] = formatExifGPS(
          data.gps.GPSLatitude,
          data.gps.GPSLongitude
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
      reject(err);
    }
  });

  return {
    src: "/" + join(dir, src),
    width,
    height,
    exif,
  };
}
