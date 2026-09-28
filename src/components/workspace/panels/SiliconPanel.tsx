import { TechnicalTable } from "@/components/ui";
import { siliconMatrix } from "@/data/technical";

import { Panel } from "./Panel";

/** Silicon family and bus interface matrix (§41, §43). */
export function SiliconPanel() {
  return (
    <div id="silicon">
      <Panel
        id="silicon-matrix"
        title="Silicon family & bus interfaces"
        description="Architecture, clock, and the interfaces and instruments each family is validated with."
      >
        <TechnicalTable
          columns={[
            { label: "Family", short: "Family" },
            { label: "Architecture", short: "Architecture" },
            { label: "Core clock", short: "Clock" },
            { label: "Interfaces employed", short: "Interfaces" },
            { label: "Primary bench tools", short: "Bench tools" },
          ]}
          rows={siliconMatrix.map((family) => [
            <strong key="family">{family.family}</strong>,
            family.architecture,
            <span key="clock" className="tabular">
              {family.coreClock}
            </span>,
            family.interfaces,
            family.benchTools,
          ])}
        />
      </Panel>
    </div>
  );
}
