import { AppProps } from "next/app";

import "katex/dist/katex.min.css";
import "../styles/globals.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import {
  Nunito,
  Libre_Franklin,
  Fira_Code,
  Nunito_Sans,
} from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--nunito",
});

const libre_franklin = Libre_Franklin({
  subsets: ["latin"],
  variable: "--libre-franklin",
});

const fira_code = Fira_Code({
  subsets: ["latin"],
  variable: "--fira-code",
});

const nunito_sans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--nunito-sans",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main
      className={[
        nunito.variable,
        libre_franklin.variable,
        fira_code.variable,
        nunito_sans.variable,
      ].join(" ")}
    >
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
