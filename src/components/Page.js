import React, { useEffect } from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";
import SEOHelmet from "./SEOHelmet";

export default function Page({ children, className }) {
  useEffect(() => {
    const handler = (event) => {
      if (window.scrollY <= 500) {
        document.body.classList.add("bg-panpink");
        document.body.classList.remove("bg-panblue");
      } else if (
        window.scrollY >=
        document.body.scrollHeight - window.innerHeight - 500
      ) {
        document.body.classList.remove("bg-panpink");
        document.body.classList.add("bg-panblue");
      }
    };

    handler();
    window.addEventListener("scroll", handler);

    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEOHelmet
        title="hey, i'm brooke."
        description="welcome to my little patch of internet. here you'll find my projects over the years."
      />
      <Navbar />
      <article
        className={
          "flex-grow selection:bg-panyellow/75 " + (className ? className : "")
        }
        id="main"
      >
        {children}
      </article>
      <Footer />
    </div>
  );
}
