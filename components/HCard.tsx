export default function HCard() {
  return (
    <div className="p-author h-card hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="u-photo"
        alt=""
        src="/branding/cropped.png"
        loading="lazy"
      />
      <a className="p-name u-url u-uid" href="https://breq.dev/">
        Brooke Chalmers
      </a>
      <a className="u-email" href="mailto:breq@breq.dev" />
      <span className="p-nickname">breq</span>
      <span className="p-locality">Boston</span>,{" "}
      <span className="p-region" title="Massachusetts">
        MA
      </span>
      , <span className="p-country-name">US</span>
      <p className="p-note">
        21. 🏳️‍⚧️. she/her. tinkering with code, chips, math, music. do it all.
        "the cutest fucking person here" -some girl at a rave. blåhaj. boston &
        maine.
      </p>
      <a href="https://breq.dev/keys/pgp.txt" className="u-key">
        EF956A1CEF9CEF5E
      </a>
      <a className="p-gender-identity">Woman</a>
    </div>
  );
}
