import { TechnicalTable, VerdictTag } from "@/components/ui";
import { validationMatrix } from "@/data/technical";

import { Panel } from "./Panel";
import styles from "../panels.module.css";

/**
 * Validation matrix (§52).
 *
 * Every row states the criterion, the instrument, the condition, and the
 * verdict in text. Nothing depends on colour to be understood.
 */
export function ValidationPanel() {
  return (
    <div id="validation">
      <Panel
        id="validation-matrix"
        title="Validation matrix"
        description="Measured results with the instrument and condition that produced them."
        aside={
          <p className={styles.verdictKey}>
            {validationMatrix.length} rows · all{" "}
            {validationMatrix.map((row) => row.verdict).join(" / ")}
          </p>
        }
      >
        <TechnicalTable
          columns={[
            { label: "System target", short: "Target" },
            { label: "Criterion", short: "Criterion" },
            { label: "Test instrument", short: "Tool" },
            { label: "Measured result", short: "Result" },
            { label: "Verdict", short: "Verdict" },
          ]}
          rows={validationMatrix.map((row) => [
            <strong key="target">{row.target}</strong>,
            row.criterion,
            row.tool,
            <span key="result" className="tabular">
              {row.result}
            </span>,
            <VerdictTag key="verdict" verdict={row.verdict} />,
          ])}
        />
      </Panel>
    </div>
  );
}
