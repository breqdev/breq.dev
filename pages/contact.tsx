import {
  faDiscord,
  faGithub,
  faGitlab,
  faInstagram,
  faKeybase,
  faLinkedin,
  faMastodon,
  faReddit,
  faStackExchange,
  faTelegram,
  faTumblr,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faAt,
  faC,
  faCloud,
  faEnvelope,
  faLock,
  faMoneyBillTransfer,
  faPlane,
  faRadio,
  faServer,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";

function ContactItem({
  url,
  icon,
  username,
  label,
  description,
}: {
  url: string;
  icon: IconDefinition;
  username: string;
  label: string;
  description: string;
}) {
  return (
    <a href={url}>
      <div className="flex flex-col items-center rounded-2xl border-2 border-black p-6 dark:border-white dark:bg-gray-800">
        <FontAwesomeIcon icon={icon} className="mb-2 text-5xl" title={label} />
        <h2 className="font-mono text-xl">{username}</h2>
        <p>{description}</p>
      </div>
    </a>
  );
}

function ContactCategory({
  title,
  children,
}: {
  title: string;
  children: any;
}) {
  return (
    <section>
      <h2 className="mx-auto mb-4 max-w-2xl text-4xl">{title}</h2>
      <div className="grid grid-cols-[repeat(auto-fill,15rem)] justify-center gap-8">
        {children}
      </div>
    </section>
  );
}

export default function Contact() {
  return (
    <Page>
      <SEOHelmet title="Contact - breq.dev" />
      <div className="mx-auto my-8 flex max-w-4xl flex-col gap-8 px-4 text-center font-display text-lg">
        <h1 className="mx-auto max-w-2xl text-6xl">contact me</h1>

        <ContactCategory title="messaging">
          <ContactItem
            url="https://discord.com/users/386352037723635712"
            icon={faDiscord}
            username="@breq"
            label="Discord"
            description="voice or video call"
          />
          <ContactItem
            url="mailto:breq@breq.dev"
            icon={faEnvelope}
            username="breq@breq.dev"
            label="Email"
            description="when in doubt"
          />
          <ContactItem
            url="https://keybase.io/breq"
            icon={faKeybase}
            username="@breq"
            label="Keybase"
            description="encrypted channel"
          />
          <ContactItem
            url="https://t.me/breqdev"
            icon={faTelegram}
            username="@breqdev"
            label="Telegram"
            description="for furries"
          />
          <ContactItem
            url="https://wireless2.fcc.gov/UlsApp/UlsSearch/license.jsp?licKey=4768613"
            icon={faRadio}
            username="K9BRQ"
            label="Ham Radio"
            description="2m and 70cm bands"
          />
          <ContactItem
            url="/keys/pgp.txt"
            icon={faLock}
            username="EF956A1CEF9CEF5E"
            label="PGP keys"
            description="gpg --import"
          />
        </ContactCategory>

        <ContactCategory title="code">
          <ContactItem
            url="https://github.com/breqdev"
            icon={faGithub}
            username="breqdev"
            label="GitHub"
            description="most things"
          />
          <ContactItem
            url="https://gitlab.com/breq"
            icon={faGitlab}
            username="breq"
            label="GitLab"
            description="rover projects"
          />
          <ContactItem
            url="https://stackexchange.com/users/12968408/brooke-chalmers"
            icon={faStackExchange}
            username="brooke-chalmers"
            label="StackExchange"
            description="stackexchange"
          />
        </ContactCategory>

        <ContactCategory title="twitters">
          <ContactItem
            url="https://twitter.com/breqdev"
            icon={faTwitter}
            username="@breqdev"
            label="Twitter"
            description="until twitter dies"
          />
          <ContactItem
            url="https://tacobelllabs.net/@breq"
            icon={faMastodon}
            username={"@breq\n@tacobelllabs.net"}
            label="Mastodon"
            description=""
          />
          <ContactItem
            url="https://tumblr.breq.dev/"
            icon={faTumblr}
            username="breq"
            label="Tumblr"
            description="gay people"
          />
          <ContactItem
            url="https://cohost.org/breq"
            icon={faC}
            username="@breq"
            label="Cohost"
            description="cohost"
          />
          <ContactItem
            url="https://bsky.app/profile/breq.dev"
            icon={faCloud}
            username="@breq.dev"
            label="BlueSky"
            description="bluesky"
          />
          <ContactItem
            url="https://www.threads.net/@breqdev"
            icon={faAt}
            username="@breqdev"
            label="Threads"
            description="threads"
          />
        </ContactCategory>

        <ContactCategory title="socials">
          <ContactItem
            url="https://instagram.com/breqdev"
            icon={faInstagram}
            username="@breqdev"
            label="Instagram"
            description="view my photos"
          />
          <ContactItem
            url="https://www.linkedin.com/in/breqdev"
            icon={faLinkedin}
            username="in/breqdev"
            label="Linkedin"
            description="jobs ig"
          />
          <ContactItem
            url="https://reddit.com/u/breqdev"
            icon={faReddit}
            username="u/breqdev"
            label="Reddit"
            description="i don't use this"
          />
          <ContactItem
            url="https://www.youtube.com/@breqdev"
            icon={faYoutube}
            username="@breqdev"
            label="YouTube"
            description="videos"
          />
        </ContactCategory>

        <ContactCategory title="other">
          <ContactItem
            url="https://account.venmo.com/u/breqdev"
            icon={faMoneyBillTransfer}
            username="@breqdev"
            label="Venmo"
            description="venmo"
          />
          <ContactItem
            url="/keys/ssh.txt"
            icon={faServer}
            username="breq@breq.dev"
            label="SSH keys"
            description=".ssh/authorized_keys"
          />
          <ContactItem
            url=""
            icon={faPlane}
            username="FA3LMCNCYL"
            label="FAA Drone"
            description="drone license"
          />
        </ContactCategory>
      </div>
    </Page>
  );
}
