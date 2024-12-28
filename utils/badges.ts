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

  // Badge image border color -- for showing a border around the badge, visually distinct from a black bg
  borderIsTextColor?: boolean;

  // Exclude from the directory page
  exclude?: boolean;

  // Font override for the directory page
  font?: string;

  // "rel" property value, see http://www.gmpg.org/xfn/intro
  rel: string;
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
    rel: "me",
  },
  {
    name: "Ava Silver",
    image: "/badges/ava.png",
    url: "https://avasilver.dev/",
    bio: "SWE @ datadog, celeste speedrunner",
    color: "#9C15E2",
    textColor: "#B44BDF",
    font: "Comfortaa",
    rel: "sweetheart date met",
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
    rel: "sweetheart date met",
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
    rel: "friend met",
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
    rel: "friend met",
  },
  {
    name: "Juniper",
    placeholder: "juni",
    url: "https://substack.com/@juniperbush",
    bio: "photographer, anarchist, good puppy",
    color: "#A876BD",
    textColor: "#A876BD",
    rel: "friend met",
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
    rel: "friend met",
  },
  {
    name: "Tris Emmy Wilson",
    image: "/badges/tris.png",
    url: "https://tris.fyi/",
    bio: "infrastructure enjoyer, OSM fan, photo taker",
    color: "#282828",
    textColor: "#458588",
    font: "Atkinson Hyperlegible",
    borderIsTextColor: true,
    rel: "friend met",
  },
  {
    name: "Izzy Rosepetals",
    image: "/badges/izzy.png",
    url: "https://izzy.horse/",
    bio: 'pony, "canadian" software developer',
    color: "#8d3e8c",
    textColor: "#ffffff",
    font: "Equestria",
    rel: "friend met",
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
    borderIsTextColor: true,
    rel: "friend met",
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
    borderIsTextColor: true,
    rel: "acquaintance",
  },
  {
    tag: "hfuller",
    name: "Hunter Fuller",
    image: "/badges/hunter.png",
    url: "https://pixilic.com/",
    bio: "network engineer, hacker, agent of chaos",
    color: "#808080",
    textColor: "#ff0000",
    rel: "friend met",
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
    rel: "acquaintance met",
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
    rel: "friend met",
  },
  {
    tag: "nyashidos",
    name: "Ula Bitinaitis",
    image: "/badges/ula.png",
    url: "https://www.ulabit.dev/",
    bio: "CS + media arts, web dev, game dev, VR",
    color: "#FFE2B1",
    textColor: "#FFE2B1",
    rel: "acquaintance met",
  },
  {
    name: "Kel Weaver",
    image: "/badges/kel.png",
    url: "https://keleats.rocks/",
    bio: "CS + environment, rocks, fiddle, radio",
    color: "#ADC9A5",
    textColor: "#ADC9A5",
    font: "Times New Roman",
    rel: "acquaintance met",
  },
  {
    tag: "eggy",
    name: "Ezgi Bas",
    image: "/badges/eggy.png",
    url: "https://twitter.com/ezgiburglar69",
    bio: "CS, math major, turkish",
    color: "#F0D75D",
    textColor: "#F0D75D",
    rel: "acquaintance met",
  },
  {
    name: "Maeve Andersen",
    image: "/badges/maeve.png",
    url: "https://ndr.sn/",
    bio: "politics, CS, bicycles, chonkpad",
    color: "#E61E26",
    textColor: "#E61E26",
    font: "IBM Plex Sans",
    rel: "acquaintance met",
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
    rel: "acquaintance met",
  },
  {
    name: "oomfieland",
    image: "/badges/oomfieland.png",
    url: "#",
    bio: "oomfieland",
    color: "#000000",
    textColor: "#FFFFFF",
    exclude: true,
    rel: "kin",
  },
  {
    name: "eightyeightthirty.one",
    image: "/badges/eightyeightthirtyone.png",
    url: "https://eightyeightthirty.one/",
    bio: "graph of the 88x31 network",
    color: "#000000",
    textColor: "#FFFFFF",
    exclude: true,
    rel: "kin",
  },
];
