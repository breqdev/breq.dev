import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowUpRightFromSquare,
  faKey,
  faPlaneUp,
  faRadio,
  faServer,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";
import pgpKey from "../public/keys/pgp.txt";
import sshKey from "../public/keys/ssh.txt";

function NumberBlock({
  icon,
  label,
  displayValue,
  value,
  command,
  url,
  urlLabel,
}: {
  icon: IconDefinition;
  label: string;
  displayValue?: string;
  value: string;
  command?: string;
  url?: string;
  urlLabel?: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border-2 border-black p-4 font-body dark:border-white sm:gap-8 sm:p-8">
      <span className="text-6xl sm:text-8xl">
        <FontAwesomeIcon icon={icon} />
      </span>
      <div className="w-full min-w-0">
        <button
          className={
            "text-left font-mono " +
            ((displayValue || value).length > 10
              ? "text-2xl sm:text-4xl"
              : "text-3xl sm:text-5xl")
          }
          onClick={() => navigator.clipboard.writeText(value)}
        >
          {displayValue || value}
        </button>
        <p className="text-xl text-gray-600 dark:text-gray-400">{label}</p>
        {command && (
          <div className="hidden overflow-auto sm:block">
            <button
              className="mt-2 whitespace-nowrap rounded bg-gray-200 px-2 py-4 text-left font-mono dark:bg-gray-600"
              onClick={() => navigator.clipboard.writeText(command)}
            >
              $ {command}
            </button>
          </div>
        )}
        {url && (
          <a
            href={url}
            className="mt-2 text-left text-gray-600 dark:text-gray-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            {urlLabel} <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </a>
        )}
      </div>
    </div>
  );
}

export default function Numbers() {
  return (
    <Page>
      <SEOHelmet title="keys, callsigns, and more." />
      <div className="mx-auto my-8 max-w-xl">
        <h1 className="text-center font-display text-5xl">names and numbers</h1>
        <p className="mt-1 text-center font-body text-lg">
          click a key ID to copy the full key to the clipboard.
        </p>
      </div>
      <div className="mx-auto my-8 flex max-w-xl flex-col gap-8 px-2">
        <NumberBlock
          icon={faKey}
          label="PGP Public Key"
          displayValue="EF956A1CEF9CEF5E"
          value={pgpKey}
          command="curl https://breq.dev/keys/pgp.txt | gpg --import"
        />
        <NumberBlock
          icon={faServer}
          label="SSH Public Keys"
          displayValue="(click to copy)"
          value={sshKey}
          command="curl https://breq.dev/keys/ssh.txt | cat >> ~/.ssh/authorized_keys"
        />
        <NumberBlock
          icon={faRadio}
          label="FCC Amateur Callsign"
          value="KC1QYG"
          url="https://wireless2.fcc.gov/UlsApp/UlsSearch/license.jsp?licKey=4576848"
          urlLabel="view license information"
        />
        <NumberBlock
          icon={faPlaneUp}
          label="FAA Drone License"
          value="FA3LMCNCYL"
        />
      </div>
    </Page>
  );
}
