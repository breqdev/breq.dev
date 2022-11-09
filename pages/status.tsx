import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import useSWR from "swr";

import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";

const fetcher = (url: string) =>
  fetch(url, { method: "POST" }).then((r) => r.json());

type MonitorInfo = { status: number; friendly_name: string; id: number };

function Monitor({ monitor }: { monitor: MonitorInfo }) {
  const color = monitor.status === 2 ? "bg-green-300" : "bg-red-500";
  const message = monitor.status === 2 ? "up!" : "down!";

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border-2 border-black p-4">
      <div
        className={`h-32 w-32 ${color} flex items-center justify-center rounded-full`}
      >
        <span className="font-display text-5xl text-black">{message}</span>
      </div>
      <span className="text-center font-display text-xl">
        {monitor.friendly_name}
      </span>
    </div>
  );
}

function MonitorGrid({ data }: { data: MonitorInfo[] }) {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
      <h1 className="m-8 text-center font-display text-5xl">
        status dashboard
      </h1>
      <p className="mx-auto max-w-2xl text-center font-body text-xl">
        check the uptime status of one of my gazillion side projects.
        <br />
        or, alternatively, view historical data on{" "}
        <a
          href="https://stats.uptimerobot.com/ZvOXKhMG1x"
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
