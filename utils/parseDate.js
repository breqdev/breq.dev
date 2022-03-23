export default function parseDate(url) {
  const [year, month, day] = url.split("-");

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
