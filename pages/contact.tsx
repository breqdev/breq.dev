import {
  faBluesky,
  faDiscord,
  faGithub,
  faGitlab,
  faInstagram,
  faLinkedin,
  faMastodon,
  faReddit,
  faSignalMessenger,
  faStackExchange,
  faTelegram,
  faTumblr,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faAddressCard,
  faEnvelope,
  faLock,
  faMoneyBillTransfer,
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
  className,
}: {
  url: string;
  icon: IconDefinition;
  username: string;
  label: string;
  description: string;
  className: string;
}) {
  return (
    <a
      href={url}
      className={
        "flex flex-row items-center gap-4 rounded-2xl border-2 border-black p-4 outline-none transition-colors dark:border-white dark:bg-gray-800 " +
        className
      }
    >
      <FontAwesomeIcon className="fa-fw text-5xl" icon={icon} title={label} />
      <div className="flex w-full flex-col items-start">
        {username.length <= 16 ? (
          <h2 className="font-mono text-3xl">{username}</h2>
        ) : (
          <h2 className="font-mono text-2xl">{username}</h2>
        )}
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
      <div className="relative flex flex-row justify-center">
        <h2 className="relative z-10 mb-8 bg-white px-4 text-4xl dark:bg-black">
          {title}
        </h2>
        <div className="absolute left-0 right-0 top-6 h-8 rounded-t-2xl border-x-2 border-t-2 border-gray-400" />
      </div>
      <div className="grid grid-cols-1 place-items-stretch justify-center gap-8 lg:grid-cols-2">
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
        <p className="-mt-4 text-xl">
          available via{" "}
          <a
            href="https://breq.dev/vcard/breq.vcf"
            className="font-bold text-yellow-600 dark:text-yellow-300"
          >
            <FontAwesomeIcon
              icon={faAddressCard}
              className="-mb-px -mr-0.5 ml-0.5"
            />{" "}
            vcard
          </a>
        </p>

        <ContactCategory title="messaging">
          <ContactItem
            url="mailto:breq@breq.dev"
            icon={faEnvelope}
            username="breq@breq.dev"
            label="Email"
            description="when in doubt"
            className="hover:bg-red-200 focus-visible:bg-red-200 dark:hover:bg-red-600 dark:focus-visible:bg-red-600"
          />
          <ContactItem
            url="https://discord.com/users/386352037723635712"
            icon={faDiscord}
            username="@breq"
            label="Discord"
            description="for voice or video calls"
            className="hover:bg-indigo-200 focus-visible:bg-indigo-200 dark:hover:bg-indigo-600 dark:focus-visible:bg-indigo-600"
          />
          <ContactItem
            url="https://signal.me/#eu/65D91kL+LwalfvCf/DWfyl1gpsswnqel4gW79DDNxcZJEJjLoe9AWoZF98GvTQaG"
            icon={faSignalMessenger}
            username="@breq.16"
            label="Signal"
            description="for encrypted or disappearing chats"
            className="hover:bg-blue-200 focus-visible:bg-blue-200 dark:hover:bg-blue-600 dark:focus-visible:bg-blue-600"
          />
          <ContactItem
            url="https://t.me/breqdev"
            icon={faTelegram}
            username="@breqdev"
            label="Telegram"
            description="for furries"
            className="hover:bg-sky-200 focus-visible:bg-sky-200 dark:hover:bg-sky-600 dark:focus-visible:bg-sky-600"
          />
          <ContactItem
            url="https://wireless2.fcc.gov/UlsApp/UlsSearch/license.jsp?licKey=4768613"
            icon={faRadio}
            username="K9BRQ"
            label="Ham Radio"
            description="on 2m and 70cm, often W1XM"
            className="hover:bg-yellow-200 focus-visible:bg-yellow-200 dark:hover:bg-yellow-600 dark:focus-visible:bg-yellow-600"
          />
          <ContactItem
            url="/keys/pgp.txt"
            icon={faLock}
            username="EF956A1CEF9CEF5E"
            label="PGP keys"
            description="gpg --import"
            className="hover:bg-slate-200 focus-visible:bg-slate-200 dark:hover:bg-slate-600 dark:focus-visible:bg-slate-600"
          />
        </ContactCategory>

        <ContactCategory title="code">
          <ContactItem
            url="https://github.com/breqdev"
            icon={faGithub}
            username="breqdev"
            label="GitHub"
            description="most code and personal projects"
            className="hover:bg-zinc-200 focus-visible:bg-zinc-200 dark:hover:bg-zinc-600 dark:focus-visible:bg-zinc-600"
          />
          <ContactItem
            url="https://gitlab.com/breq"
            icon={faGitlab}
            username="breq"
            label="GitLab"
            description="rover projects, primarily"
            className="hover:bg-orange-200 focus-visible:bg-orange-200 dark:hover:bg-orange-600 dark:focus-visible:bg-orange-600"
          />
          {/* <ContactItem
            url="https://stackexchange.com/users/12968408/brooke-chalmers"
            icon={faStackExchange}
            username="brooke-chalmers"
            label="StackExchange"
            description="the unhelpful q&a site"
            className="hover:bg-amber-200 focus-visible:bg-amber-200 dark:hover:bg-amber-600 dark:focus-visible:bg-amber-600"
          /> */}
        </ContactCategory>

        <ContactCategory title="microblogging">
          <ContactItem
            url="https://bsky.app/profile/breq.dev"
            icon={faBluesky}
            username="@breq.dev"
            label="Bluesky"
            description="in the atmosphere"
            className="hover:bg-cyan-200 focus-visible:bg-cyan-200 dark:hover:bg-cyan-600 dark:focus-visible:bg-cyan-600"
          />
          <ContactItem
            url="https://tacobelllabs.net/@breq"
            icon={faMastodon}
            username="@breq@tacobelllabs.net"
            label="Mastodon"
            description="on the federated verse"
            className="hover:bg-violet-200 focus-visible:bg-violet-200 dark:hover:bg-violet-600 dark:focus-visible:bg-violet-600"
          />
          {/* <ContactItem
            url="https://twitter.com/breqdev"
            icon={faTwitter}
            username="@breqdev"
            label="Twitter"
            description="the bird themed hellsite"
            className="hover:bg-blue-200 focus-visible:bg-blue-200 dark:hover:bg-blue-600 dark:focus-visible:bg-blue-600"
          />
          <ContactItem
            url="https://tumblr.breq.dev/"
            icon={faTumblr}
            username="breq"
            label="Tumblr"
            description="i don't really use this"
            className="hover:bg-indigo-200 focus-visible:bg-indigo-200 dark:hover:bg-indigo-600 dark:focus-visible:bg-indigo-600"
          /> */}
        </ContactCategory>

        <ContactCategory title="socials">
          <ContactItem
            url="https://instagram.com/breqdev"
            icon={faInstagram}
            username="@breqdev"
            label="Instagram"
            description="view my photos"
            className="hover:bg-rose-200 focus-visible:bg-rose-200 dark:hover:bg-rose-600 dark:focus-visible:bg-rose-600"
          />
          <ContactItem
            url="https://www.linkedin.com/in/breqdev"
            icon={faLinkedin}
            username="in/breqdev"
            label="Linkedin"
            description="jobs i guess?"
            className="hover:bg-blue-200 focus-visible:bg-blue-200 dark:hover:bg-blue-600 dark:focus-visible:bg-blue-600"
          />
          <ContactItem
            url="https://reddit.com/u/breqdev"
            icon={faReddit}
            username="u/breqdev"
            label="Reddit"
            description="long time lurker, first time poster..."
            className="hover:bg-orange-200 focus-visible:bg-orange-200 dark:hover:bg-orange-600 dark:focus-visible:bg-orange-600"
          />
          <ContactItem
            url="https://www.youtube.com/@breqdev"
            icon={faYoutube}
            username="@breqdev"
            label="YouTube"
            description="mostly random old videos"
            className="hover:bg-red-200 focus-visible:bg-red-200 dark:hover:bg-red-600 dark:focus-visible:bg-red-600"
          />
        </ContactCategory>

        <ContactCategory title="other">
          <ContactItem
            url="https://account.venmo.com/u/breqdev"
            icon={faMoneyBillTransfer}
            username="@breqdev"
            label="Venmo"
            description="venmo"
            className="hover:bg-sky-200 focus-visible:bg-sky-200 dark:hover:bg-sky-600 dark:focus-visible:bg-sky-600"
          />
          <ContactItem
            url="/keys/ssh.txt"
            icon={faServer}
            username="breq@breq.dev"
            label="SSH keys"
            description=".ssh/authorized_keys"
            className="hover:bg-slate-200 focus-visible:bg-slate-200 dark:hover:bg-slate-600 dark:focus-visible:bg-slate-600"
          />
        </ContactCategory>
      </div>
    </Page>
  );
}
