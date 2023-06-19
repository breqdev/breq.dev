import { BasicMarkdownInfo } from "./api";

export type PostInfo = {
  title: string;
  description: string;
  tags?: string[];
};

export function parseSlug(slug: string) {
  const [year, month, day, ...rest] = slug.split("-");
  return {
    date: [year, month, day],
    slug: rest.join("-"),
  };
}

export function getDateLabel(slug: string) {
  const [year, month, day] = parseSlug(slug).date;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = `${months[parseInt(month) - 1]} ${day}, ${year}`;

  return date;
}

export function getDateObject(slug: string) {
  const [year, month, day] = parseSlug(slug).date;
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

export function getURL(fullSlug: string) {
  const {
    date: [year, month, day],
    slug,
  } = parseSlug(fullSlug);
  return `/${year}/${month}/${day}/${slug}`;
}

export function slugComparator(
  a: BasicMarkdownInfo & PostInfo,
  b: BasicMarkdownInfo & PostInfo
) {
  const dateA = getDateObject(a.slug);
  const dateB = getDateObject(b.slug);

  return dateB.getTime() - dateA.getTime();
}
