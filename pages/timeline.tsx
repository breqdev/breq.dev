import Page from "../components/Page";
import SEOHelmet from "../components/SEOHelmet";

const YEARS = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

export default function Timeline() {
  // TODO
  // inspired by https://tris.fyi/timeline.html
  return (
    <Page className="bg-black text-white">
      <SEOHelmet title="Timeline - breq.dev" />

      <div
        className="grid"
        style={{ gridTemplateColumns: `2fr repeat(${YEARS.length * 3}, 1fr)` }}
      >
        <div>year</div>
        {YEARS.map((i) => (
          <div key={i} className="col-span-3">
            {i}
          </div>
        ))}

        <div>age</div>
        {YEARS.map((i) => (
          // ah, the beauty of being born on Jan 2
          <div key={i} className="col-span-3">
            {i - 2003}
          </div>
        ))}

        <div>location</div>

        <div className="col-span-2">scarborough</div>
        <div className="col-span-5">limestone</div>
        <div className="col-span-7">scarborough</div>
        <div className="col-span-7">boston (various dorms)</div>
        <div className="col-span-2">boston (ava)</div>
        <div className="col-span-4">somerville</div>

        <div>school</div>

        <div className="col-span-2">scarborough middle school</div>
        <div className="col-span-5">
          maine school of science and mathematics
        </div>
        <div className="col-span-7">
          scarborough high school
          <br />
          university of southern maine
        </div>
        <div className="col-span-11">northeastern university</div>
        <div className="col-span-2" />

        <div>robots</div>

        <div className="col-span-2" />
        <div className="col-span-5">Vex Robotics team 4393</div>
        <div className="col-span-7">Vex Robotics team 344</div>
        <div className="col-span-12">Northeastern Mars Rover Team</div>
        <div className="col-span-1" />

        <div>gender</div>

        <div className="col-span-9" />
        <div className="col-span-3">questioning</div>
        <div className="col-span-1">out to parents</div>
        <div className="col-span-1">on HRT</div>
        <div className="col-span-12">out to world</div>
        <div />

        <div>work</div>
        <div className="col-span-12" />
        <div className="col-span-1" />
        <div className="col-span-1">texas instruments</div>
        <div className="col-span-3" />
        <div className="col-span-1">teaching assistant</div>
        <div className="col-span-1">research assistant</div>
        <div className="col-span-2">amazon robotics</div>
        <div className="col-span-1">research assistant</div>
        <div className="col-span-2">quadratic 3D, inc</div>
        <div className="col-span-1" />
        <div className="col-span-2">quadratic 3D, inc</div>
      </div>
    </Page>
  );
}
