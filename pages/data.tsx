import SEOHelmet from "../components/SEOHelmet";

import Page from "../components/Page";

export default function Data() {
  return (
    <Page className="bg-black text-white">
      <SEOHelmet
        title="breq.dev data dashboard"
        description="doxxing brooke as a service"
      />
      <div className="mx-auto my-32 grid max-w-5xl grid-cols-3 gap-8">
        <div className="flex flex-col gap-2 rounded-2xl border-2 border-white px-4 py-2">
          <div className="text-center">
            <p className="font-mono text-3xl font-bold">Boston, MA, US</p>
            <p className="font-mono italic">Last Reported Location</p>
          </div>

          <hr className="border border-white" />

          <div className="flex justify-between">
            <p className="text-left font-mono italic">ASN:</p>
            <p className="text-right font-mono font-bold">AS6079 RCN</p>
          </div>

          <div className="flex justify-between">
            <p className="text-left font-mono italic">TZ:</p>
            <p className="text-right font-mono font-bold">America/New_York</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-2xl border-2 border-white px-4 py-2">
          <div className="text-center">
            <p className="font-mono text-3xl font-bold">MacBook Pro</p>
            <p className="font-mono italic">Last Active Device</p>
          </div>

          <hr className="border border-white" />

          <div className="flex justify-between">
            <p className="text-left font-mono italic">Battery:</p>
            <p className="text-right font-mono font-bold">33% (AC Power)</p>
          </div>

          <div className="flex justify-between">
            <p className="text-left font-mono italic">Focused:</p>
            <p className="text-right font-mono font-bold">Visual Studio Code</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-2xl border-2 border-white px-4 py-2">
          <div className="text-center">
            <p className="font-mono text-3xl font-bold">"Hometown"</p>
            <p className="font-mono italic">Current Spotify Track</p>
          </div>

          <hr className="border border-white" />

          <div className="flex justify-between">
            <p className="text-left font-mono italic">Artist:</p>
            <p className="text-right font-mono font-bold">French 79</p>
          </div>

          <div className="flex justify-between">
            <p className="text-left font-mono italic">Album:</p>
            <p className="text-right font-mono font-bold">Joshua</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-2xl border-2 border-white px-4 py-2">
          <div className="text-center">
            <p className="font-mono text-3xl font-bold">noentiendo</p>
            <p className="font-mono italic">Latest Git Commit</p>
          </div>

          <hr className="border border-white" />

          <div className="flex justify-between">
            <p className="w-full overflow-ellipsis text-center font-mono font-bold">
              Blank screen on CA2 write
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-left font-mono italic">SHA:</p>
            <p className="text-right font-mono font-bold">7b427164</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-2xl border-2 border-white px-4 py-2">
          <div className="text-center">
            <p className="font-mono text-3xl font-bold">tacobelllabs.net</p>
            <p className="font-mono italic">Latest Mastodon Post</p>
          </div>

          <hr className="border border-white" />

          <div className="flex justify-between">
            <p className="w-full overflow-ellipsis text-center font-mono font-bold">
              totally!! definitely was...
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-left font-mono italic">Mentions:</p>
            <p className="text-right font-mono font-bold">@haskal@types.pl</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-2xl border-2 border-white px-4 py-2">
          <div className="text-center">
            <p className="font-mono text-3xl font-bold">BlueBikes</p>
            <p className="font-mono italic">Last Transit Mode</p>
          </div>

          <hr className="border border-white" />

          <div className="flex justify-between">
            <p className="w-full overflow-ellipsis text-center font-mono font-bold">
              Porter Square Station
            </p>
          </div>

          <div className="flex justify-between">
            <p className="w-full text-center font-mono font-bold">
              Forsyth St @ Huntington Ave
            </p>
          </div>
        </div>
      </div>
    </Page>
  );
}
