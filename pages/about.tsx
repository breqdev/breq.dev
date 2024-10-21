import Image from "next/image";
import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";
import AboutText from "../components/index/AboutText";
import peace from "../public/images/peace.png";

export default function About() {
  return (
    <Page className="bg-black px-4 py-4 text-white md:py-12">
      <SEOHelmet
        title="breq.dev - about me"
        description="information about brooke madeline chalmers."
      />

      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-[1fr,2fr]">
        <div className="relative mx-auto max-w-md">
          <Image src={peace} alt="" className="md:rounded-full" />
          <h1 className="absolute bottom-2 left-0 right-0 text-center font-display text-3xl md:hidden">
            <span className="rounded-xl bg-black px-1.5 font-bold text-panpink">
              brooke chalmers
            </span>
          </h1>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="hidden text-center font-display text-5xl md:block md:text-left">
            brooke madeline chalmers
          </h1>
          <section className="mx-auto w-full font-display text-lg">
            <AboutText />
          </section>
        </div>
      </div>
    </Page>
  );
}
