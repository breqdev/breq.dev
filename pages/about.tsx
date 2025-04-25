import Image from "next/image";
import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";
import peace from "../public/images/selfies/peace.png";
import fisheye from "../public/images/selfies/fisheye.png";
import utah from "../public/images/selfies/utah.jpg";

export function AboutContent() {
  return (
    <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-[1fr,3fr]">
      <div className="relative mx-auto flex max-w-md flex-col gap-4">
        <Image src={peace} alt="" className="md:rounded-full" />
        <h1 className="absolute bottom-2 left-0 right-0 text-center font-display text-3xl md:hidden">
          <span className="rounded-xl bg-black px-1.5 font-bold text-panpink">
            brooke chalmers
          </span>
        </h1>
        <Image
          src={fisheye}
          alt=""
          className="hidden md:block md:rounded-full"
        />
        <Image src={utah} alt="" className="hidden md:block md:rounded-full" />
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="hidden text-center font-display text-5xl md:block md:text-left">
          brooke madeline chalmers
        </h1>
        <section className="mx-auto w-full font-display text-lg">
          <p>
            <span className="font-bold text-panpink">hey, i'm brooke</span>{" "}
            (she/her), and i'm here to learn, create, and have fun.
            <br />
            <br />
            i'm passionate about embedded systems, backend engineering, web dev,
            audio, and bodging things together in creative ways. my favorite
            tools are Python, React, Rust, and Linux. most of my work is with
            software but i'm still comfortable with a soldering iron and a
            breadboard.
            <br />
            <br />i have three wonderful, talented, amazing girlfriends:{" "}
            <a
              className="text-panpink-light underline hover:no-underline"
              href="https://avasilver.dev/"
            >
              Ava
            </a>
            ,{" "}
            <a
              className="text-panpink-light underline hover:no-underline"
              href="https://miakizz.quest/"
            >
              Mia
            </a>
            , and{" "}
            <a
              className="text-panpink-light underline hover:no-underline"
              href="https://adryd.com/"
            >
              Ari
            </a>
            .
            <br />
            <br />
            i live with Ava in Somerville, MA, and i can be frequently spotted
            riding on a BlueBike, wandering on foot, failing to get a "perfect"
            at a certain Porter Square ramen shop, or getting up to other
            miscellaneous shenanigans.
            <br />
            <br />
            i am openly, proudly, and unapologetically a queer transgender
            woman.
            <br />
            <br />i lead the{" "}
            <a
              className="text-panpink-light underline hover:no-underline"
              href="https://northeasternrover.com/"
            >
              northeastern university mars rover team
            </a>{" "}
            and write software (mostly for the camera streaming, communications,
            and control user interface systems).
            <br />
            <br />i grew up in Scarborough, ME and spent two years in Limestone,
            ME. if you spot me on the amtrak downeaster, say hi!
            <br />
            <br />
            be excellent to each other.
          </p>
        </section>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <Page className="bg-black px-4 py-4 text-lg text-white md:py-12">
      <SEOHelmet
        title="breq.dev - about me"
        description="information about brooke madeline chalmers."
      />

      <AboutContent />
    </Page>
  );
}
