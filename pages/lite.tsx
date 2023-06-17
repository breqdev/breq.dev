import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";

export default function Lite() {
  return (
    <Page>
      <SEOHelmet
        title="hey, i'm brooke chalmers."
        description="welcome to my little patch of internet. view my projects, posts, and experiments here."
      />
      <div className="flex flex-col">
        <div className="mx-auto mt-16 flex w-full max-w-3xl flex-col font-display">
          <h1 className="text-7xl">
            hey, i'm
            <br />
            <span className="text-panpink">brooke chalmers.</span>
          </h1>
          <p className="text-right text-6xl text-gray-500">(she/her).</p>
          <h2 className="mt-12 text-right text-3xl">
            welcome to my little patch of internet.
          </h2>
        </div>

        <div className="mx-auto my-16 max-w-prose font-display text-2xl">
          <p>
            i'm passionate about embedded systems, backend engineering, web dev,
            and bodging things together in creative ways.
            <br />
            <br />
            my favorite tools are python, react, rust, and linux. most of my
            work nowadays is completely digital, but i'm still comfortable with
            a soldering iron and a breadboard.
            <br />
            <br />
            i believe that the only way to learn something fully is to be
            creative with it. you can never truly understand something without
            applying it to a problem yourself.
            <br />
            <br />
            i'm a trans woman, and i'm still learning to love myself. i want to
            be myself and leave an impact on the world that i can be proud of.
            <br />
            <br />
            technology should be for everyone. i think it's important to create
            tools and resources that help people express themselves
            creatively—whether that's with code, or something else entirely. (we
            can't all spend our lives making websites with too much javascript.)
            <br />
            <br />
            be excellent to each other.
          </p>
        </div>
      </div>
    </Page>
  );
}
