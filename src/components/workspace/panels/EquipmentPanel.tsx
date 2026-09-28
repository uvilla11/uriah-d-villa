import { benchEquipment } from "@/data/technical";

import { Panel } from "./Panel";
import styles from "../panels.module.css";

/**
 * Bench equipment (§41).
 *
 * An equipment list, not a skills claim: what is on the bench and what each
 * instrument is used to measure.
 */
export function EquipmentPanel() {
  return (
    <div id="equipment">
      <Panel
        id="equipment-panel"
        title="Lab & instrumentation"
        description="Instruments used for bring-up, fault isolation, and validation."
      >
        <dl className={styles.equipment}>
          {benchEquipment.map((item) => (
            <div key={item.label} className={styles.equipmentItem}>
              <dt className="mono">{item.label}</dt>
              <dd>{item.use}</dd>
            </div>
          ))}
        </dl>
      </Panel>
    </div>
  );
}
