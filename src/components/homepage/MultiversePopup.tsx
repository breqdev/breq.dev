import { useEffect, useRef, useState } from "react";

export default function MultiversePopup() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [redirectTarget, setRedirectTarget] = useState("/");

  useEffect(() => {
    const referrer = new URL(document.referrer);

    if (referrer.hostname.endsWith("adryd.com")) {
      setRedirectTarget("/adryd.com");
      dialog.current?.showModal();
    } else if (referrer.hostname.endsWith("avasilver.dev")) {
      setRedirectTarget("/avasilver.dev");
      dialog.current?.showModal();
    } else if (referrer.hostname.endsWith("miakizz.quest")) {
      setRedirectTarget("/miakizz.quest");
      dialog.current?.showModal();
    }
  }, []);

  // <!-- Icon from Tabler Icons by Paweł Kuna - https://github.com/tabler/tabler-icons/blob/master/LICENSE -->

  return (
    <dialog
      ref={dialog}
      className="mx-auto mt-12 p-8 open:flex flex-col gap-8 border-2 border-black backdrop:bg-black/50"
    >
      <div className="flex flex-row gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path d="M20.975 11.33a9 9 0 1 0-5.673 9.043M3.6 9h16.8M3.6 15h9.9" />
            <path d="M11.5 3a17 17 0 0 0 0 18m1-18a17 17 0 0 1 2.57 9.518m-1.056 5.403A17 17 0 0 1 12.5 21m6.5 1v.01M19 19a2.003 2.003 0 0 0 .914-3.782a1.98 1.98 0 0 0-2.414.483" />
          </g>
        </svg>
        <div>
          <p className="text-xl">
            It looks like you're visiting from a{" "}
            <strong>parallel universe</strong>.
          </p>
          <p className="text-lg text-gray-800">
            Would you like to visit our localized website?
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-center">
        <button
          className="bg-gray-100 hover:bg-gray-200 transition-colors rounded-xl px-2 py-1 cursor-pointer"
          onClick={() => dialog.current?.close()}
        >
          <strong>No</strong>, stay on breq.dev
        </button>
        <a
          href={redirectTarget}
          className="bg-blue-200 hover:bg-blue-300 transition-colors rounded-xl px-2 py-1"
        >
          <strong>Yes</strong>, engage
          <br />
          multiverse spacetime travel
        </a>
      </div>
    </dialog>
  );
}
