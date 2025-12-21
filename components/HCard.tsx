export default function HCard() {
  return (
    <div className="p-author h-card hidden" aria-hidden="true" hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="u-photo"
        alt=""
        src="/branding/cropped.png"
        loading="lazy"
      />
      <p>
        <a className="p-name u-url u-uid" href="https://breq.dev/">
          Brooke Chalmers
        </a>
        <a className="u-email" href="mailto:breq@breq.dev" />
        <span className="p-nickname">breq</span>
      </p>
      <p>
        <span className="p-locality">Boston</span>,{" "}
        <span className="p-region" title="Massachusetts">
          MA
        </span>
        , <span className="p-country-name">US</span>
      </p>
      <p>
        <a href="https://breq.dev/keys/pgp.txt" className="u-key">
          EF956A1CEF9CEF5E
        </a>
      </p>
    </div>
  );
}
