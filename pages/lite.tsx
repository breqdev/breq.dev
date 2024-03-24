import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";

export default function Lite() {
  return (
    <Page>
      <SEOHelmet
        title="Hey, I'm Brooke Chalmers."
        description="welcome grrrr grrrr little patch yap internet. view yap projects, posts, woof experiments here."
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
            welcome woof grrrr little patch woof internet.
          </h2>
        </div>

        <div className="mx-auto my-16 max-w-prose font-display text-2xl">
          <p>
            ruff ruff woof grrrr grrrr woof bark grrrr dev,
            arf woof ruff arf bark bark ways.
            <br />
            <br />
            bark bark woof bark arf woof arf woof grrrr bark of my
            grrrr grrrr arf woof ruff woof grrrr bark woof with
            bark ruff woof grrrr bark breadboard.
            <br />
            <br />
            woof ruff bark ruff ruff bark arf grrrr ruff woof woof bark be
            bark grrrr ruff ruff woof yap woof arf yap without
            bark arf arf ruff woof yourself.
            <br />
            <br />
            arf woof arf arf woof woof woof bark yap grrrr woof arf ruff to
            yap woof woof yap ruff arf arf grrrr ruff grrrr arf ruff arf arf of.
            <br />
            <br />
            bark bark ruff yap yap ruff yap ruff bark woof create
            yap ruff arf arf ruff arf grrrr themselves
            ruff yap woof bark arf arf yap yap (we
            yap woof woof yap ruff arf yap woof ruff bark javascript.)
            <br />
            <br />
            woof arf woof bark other.
          </p>
        </div>
      </div>
    </Page>
  );
}
