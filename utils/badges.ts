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

  // Badge image background color -- for showing the background around the badge
  color: string;

  // Badge image text color -- for showing text on a dark background near the badge
  textColor: string;

  // Exclude from the directory page
  exclude?: boolean;

  // Font override for the directory page
  font?: string;
};

export const BADGES: Badge[] = [
  {
    tag: "breq",
    name: "Brooke Chalmers",
    image: "/badges/breq.png",
    alt: "/badges/breqalt.png",
    url: "https://breq.dev/",
    bio: "that's me, silly!",
    color: "#1BB3FF",
    textColor: "#1BB3FF",
  },
  {
    name: "Ava Silver",
    image: "/badges/ava.png",
    url: "https://avasilver.dev/",
    bio: "SWE @ datadog, celeste speedrunner",
    color: "#9C15E2",
    textColor: "#B44BDF",
    font: "Comfortaa",
  },
  {
    tag: "miakizz",
    name: "Mia Kiesman",
    image: "/badges/miakizz.png",
    url: "https://miakizz.quest/",
    bio: "electrical engineer, retro computing",
    color: "#A80C30",
    textColor: "#FFFFFF",
    font: "Source Sans Pro",
  },
  {
    tag: "adryd",
    name: "Ari",
    image: "/badges/adryd.png",
    alt: "/badges/adrydalt.png",
    url: "https://adryd.com/",
    bio: "technology witch, designer, software dev",
    color: "#793A80",
    textColor: "#EFBF2D",
    font: "Pretendard",
  },
  {
    tag: "prismaticwolf",
    name: "Maxine Vollertsen",
    image: "/badges/max.png",
    url: "https://prsmaticwolf.itch.io/",
    bio: "game design, wolf",
    color: "#1735DE",
    textColor: "#FF8400",
    font: "Josefin Sans",
  },
  {
    name: "Juniper",
    placeholder: "juni",
    url: "https://substack.com/@juniperbush",
    bio: "photographer, anarchist, good puppy",
    color: "#A876BD",
    textColor: "#A876BD",
  },
  {
    tag: "FlamingSpork",
    name: "Philomena",
    image: "/badges/philo.png",
    url: "https://philo.gay/",
    bio: "network engineering witch, photographer",
    color: "#E20000",
    textColor: "#E20000",
    font: "Helvetica",
  },
  {
    name: "Tris Emmy Wilson",
    image: "/badges/tris.png",
    url: "https://tris.fyi/",
    bio: "infrastructure enjoyer, OSM fan, photo taker",
    color: "#282828",
    textColor: "#458588",
    font: "Atkinson Hyperlegible",
  },
  {
    tag: "electricbrooke",
    name: "Brooke",
    image: "/badges/electricbrooke.png",
    url: "https://electricbrooke.com/",
    bio: "green line operator, hockey fan",
    color: "#000000",
    textColor: "#FFFFFF",
    font: "DM Mono",
  },
  {
    tag: "notnite",
    name: "Julian",
    image: "/badges/notnite.png",
    url: "https://notnite.com/",
    bio: "programmer, game modder, shitposter",
    color: "#282828",
    textColor: "#FB4934",
    font: "Inconsolata",
  },
  {
    tag: "musicalartist12",
    name: "Julia Violet",
    image: "/badges/julia.png",
    url: "https://juliaviolet.dev/",
    bio: "robotics, graphics, trumpet",
    color: "#fc6fc4",
    textColor: "#fc6fc4",
    font: "Futura",
  },
  {
    tag: "eggy",
    name: "Ezgi Bas",
    image: "/badges/eggy.png",
    url: "https://twitter.com/ezgiburglar69",
    bio: "CS, math major, turkish",
    color: "#F0D75D",
    textColor: "#F0D75D",
  },
  {
    name: "Kel Weaver",
    image: "/badges/kel.png",
    url: "https://keleats.rocks/",
    bio: "CS + environment, rocks, fiddle, radio",
    color: "#ADC9A5",
    textColor: "#ADC9A5",
    font: "Times New Roman",
  },
  {
    tag: "nyashidos",
    name: "Ula Bitinaitis",
    image: "/badges/ula.png",
    url: "https://www.ulabit.dev/",
    bio: "CS + media arts, web dev, game dev, VR",
    color: "#FFE2B1",
    textColor: "#FFE2B1",
  },
  {
    tag: "alpacafur",
    name: "Luke Felix Taylor",
    image: "/badges/luke.png",
    url: "https://lukefelixtaylor.com/",
    bio: "design, CS, web development",
    color: "#EB43A3",
    textColor: "#EB43A3",
    font: "Source Sans 3",
  },
  {
    name: "Maeve Andersen",
    image: "/badges/maeve.png",
    url: "https://ndr.sn/",
    bio: "politics, CS, bicycles, chonkpad",
    color: "#E61E26",
    textColor: "#E61E26",
    font: "IBM Plex Sans",
  },
  {
    tag: "dillydally",
    name: "Dillon Scott",
    image: "/badges/dillydally.png",
    url: "https://dillydally414.github.io/",
    bio: "CS + biology, lana del rey, boba tea",
    color: "#004A00",
    textColor: "#FFFFFF",
    font: "DM Sans",
  },
  {
    name: "oomfieland",
    image: "/badges/oomfieland.png",
    url: "#",
    bio: "oomfieland",
    color: "#000000",
    textColor: "#FFFFFF",
    exclude: true,
  },
  {
    name: "eightyeightthirty.one",
    image: "/badges/eightyeightthirtyone.png",
    url: "https://eightyeightthirty.one/",
    bio: "graph of the 88x31 network",
    color: "#000000",
    textColor: "#FFFFFF",
    exclude: true,
  },
];
