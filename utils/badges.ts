export type Badge = {
  tag?: string;
  name: string;
  url: string;
  image?: string;
  placeholder?: string;
  bio: string;
  callsign?: string;
  color: string;
};

export const BADGES: Badge[] = [
  {
    tag: "breq",
    name: "brooke chalmers",
    image: "/badges/breq.png",
    url: "https://breq.dev/",
    bio: "",
    callsign: "K9BRQ",
    color: "#1BB3FF",
  },
  {
    name: "ava silver",
    image: "/badges/ava.png",
    url: "https://avasilver.dev/",
    bio: "SWE @ DataDog, catgirl, celeste speedrunner, music enjoyer",
    color: "#9C15E2",
  },
  {
    name: "vivian hafener",
    image: "/badges/vivi.png",
    url: "https://www.vhafener.com/",
    bio: "photographer, HPC researcher, good puppy",
    callsign: "K9VIV",
    color: "#A876BD",
  },
  {
    tag: "flaming_spork",
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
    tag: "nkizz",
    name: "nathan kiesman",
    image: "/badges/nkizz.png",
    url: "https://nkizz.com/",
    bio: "electrical engineer, retro computing",
    color: "#FFFFFF",
  },
  {
    tag: "adryd",
    name: "ariana [redacted]",
    image: "/badges/adryd.png",
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
];
