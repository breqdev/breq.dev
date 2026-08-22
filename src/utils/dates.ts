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

  return `${months[parseInt(month) - 1]} ${day}, ${year}`;
}

export function getDateObject(slug: string) {
  const [year, month, day] = parseSlug(slug).date;
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

export function getPostUrl(id: string) {
  const {
    date: [year, month, day],
    slug,
  } = parseSlug(id);
  return `/${year}/${month}/${day}/${slug}`;
}
