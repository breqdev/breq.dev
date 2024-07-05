export type Badge = {
  // Online handle
  tag?: string;

  // Commonly-used name
  name: string;

  // URL to their site
  url: string;

  // Primary 88x31 badge image
  image?: string;

  // Alternate 88x31 badge image
  alt?: string;

  // Placeholder text if no image is present
  placeholder?: string;

  // Short bio
  bio: string;

  // Amateur radio callsign, if publicized
  callsign?: string;

  // Badge image background color
  color: string;

  // Exclude from the directory page
  exclude?: boolean;
};

export const BADGES: Badge[] = [
  {
    tag: "breq",
    name: "brooke chalmers",
    image: "/badges/breq.png",
    alt: "/badges/breqalt.png",
    url: "https://breq.dev/",
    bio: "",
    callsign: "K9BRQ",
    color: "#1BB3FF",
    exclude: true,
  },
  {
    name: "ava silver",
    image: "/badges/ava.png",
    url: "https://avasilver.dev/",
    bio: "SWE @ DataDog, catgirl, celeste speedrunner",
    color: "#9C15E2",
  },
  {
    tag: "miakizz",
    name: "mia kiesman",
    image: "/badges/miakizz.png",
    url: "https://miakizz.quest/",
    bio: "electrical engineer, retro computing",
    color: "#A80C30",
  },
  {
    tag: "adryd",
    name: "ariana [redacted]",
    image: "/badges/adryd.png",
    alt: "/badges/adrydalt.png",
    url: "https://adryd.com/",
    bio: "technology witch, designer, software dev",
    color: "#793A80",
  },
  {
    tag: "prismaticwolf",
    name: "maxine vollertsen",
    image: "/badges/max.png",
    url: "https://prsmaticwolf.itch.io/",
    bio: "game design, wolf",
    color: "#1735DE",
  },
  {
    name: "juniper hafener",
    image: "/badges/vivi.png",
    url: "https://www.vhafener.com/",
    bio: "photographer, anarchist, good puppy",
    callsign: "K9VIV",
    color: "#A876BD",
  },
  {
    tag: "FlamingSpork",
    name: "philomena",
    image: "/badges/philo.png",
    url: "https://philo.gay/",
    bio: "network engineering witch, photographer, transit nerd",
    callsign: "KC1TGK",
    color: "#E20000",
  },
  {
    name: "tris emmy wilson",
    image: "/badges/tris.png",
    url: "https://tris.fyi/",
    bio: "infrastructure enjoyer, OSM fan, photo taker",
    color: "#282828",
  },
  {
    tag: "notnite",
    name: "julian",
    image: "/badges/notnite.png",
    url: "https://notnite.com/",
    bio: "programmer, game modder, shitposter",
    color: "#282828",
  },
  {
    tag: "MusicalArtist12",
    name: "julia violet",
    image: "/badges/julia.png",
    url: "https://juliaviolet.dev/",
    bio: "robotics, graphics, trumpet",
    color: "#fc6fc4",
    callsign: "KK7TTO",
  },
  {
    tag: "eggy",
    name: "ezgi bas",
    image: "/badges/eggy.png",
    url: "https://twitter.com/ezgiburglar69",
    bio: "CS, math major, turkish",
    color: "#F0D75D",
  },
  {
    name: "kel weaver",
    image: "/badges/kel.png",
    url: "https://keleats.rocks/",
    bio: "CS + environmental sustainability, rocks, fiddle, radio",
    color: "#ADC9A5",
  },
  {
    tag: "nyashidos",
    name: "ula bit",
    image: "/badges/ula.png",
    url: "https://www.ulabit.dev/",
    bio: "CS + media arts, web dev, game dev, VR",
    color: "#FFE2B1",
  },
  {
    name: "luke felix taylor",
    image: "/badges/luke.png",
    url: "https://lukefelixtaylor.com/",
    bio: "design, CS, web development",
    color: "#EB43A3",
  },
  {
    name: "maeve andersen",
    image: "/badges/maeve.png",
    url: "https://ndr.sn/",
    bio: "politics, CS, bicycles, chonkpad",
    color: "#E61E26",
  },
  {
    tag: "dillydally",
    name: "dillon scott",
    image: "/badges/dillydally.png",
    url: "https://dillydally414.github.io/",
    bio: "CS + biology, lana del rey, boba tea",
    color: "#004A00",
  },
  {
    name: "eightyeightthirty.one",
    image: "/badges/eightyeightthirtyone.png",
    url: "https://eightyeightthirty.one/",
    bio: "graph of the 88x31 network",
    color: "#000000",
    exclude: true,
  },
];
