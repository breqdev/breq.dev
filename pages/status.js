import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import useSWR from "swr";

import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";

const fetcher = (url) => fetch(url, { method: "POST" }).then((r) => r.json());

function Monitor({ monitor }) {
  const color = monitor.status === 2 ? "bg-green-300" : "bg-red-500";
  const message = monitor.status === 2 ? "up!" : "down!";

  return (
    <div className="border-2 border-black rounded-xl p-4 flex flex-col items-center gap-4">
      <div
        className={`h-32 w-32 ${color} rounded-full flex items-center justify-center`}
      >
        <span className="font-display text-5xl text-black">{message}</span>
      </div>
      <span className="font-display text-xl text-center">
        {monitor.friendly_name}
      </span>
    </div>
  );
}

function MonitorGrid({ data }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto p-8 gap-4">
      {data?.map((monitor) => (
        <Monitor key={monitor.id} monitor={monitor} />
      ))}
    </div>
  );
}

export default function Status() {
  const { data } = useSWR(
    "https://api.uptimerobot.com/v2/getMonitors?api_key=ur1108078-9145143a83c400b059424b59",
    fetcher,
    { refreshInterval: 30000 }
  );

  return (
    <Page>
      <SEOHelmet title="status dashboard" />
      <h1 className="font-display text-center text-5xl m-8">
        status dashboard
      </h1>
      <p className="font-body max-w-2xl text-center mx-auto text-xl">
        check the uptime status of one of my gazillion side projects.
        <br />
        or, alternatively, view historical data on{" "}
        <a
          href="https://stats.uptimerobot.com/ZvOXKhMG1x"
          target="_blank"
          rel="noopener noreferrer"
          className="text-panblue-dark focus:bg-panyellow"
        >
          uptimerobot <FontAwesomeIcon icon={faExternalLinkAlt} />
        </a>
        .
      </p>
      <MonitorGrid data={data?.monitors} />
    </Page>
  );
}