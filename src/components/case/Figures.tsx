import styles from "./case.module.css";

/**
 * System architecture diagram (§47).
 *
 * SVG with real text labels rather than node soup: three blocks, the buses
 * between them named in mono, and the active control path in accent. It
 * carries its own accessible name and every label stays legible in dark mode
 * and at 200% zoom because nothing depends on colour alone.
 */
export function ArchitectureFigure() {
  return (
    <figure className={styles.figureWrap}>
      <p className={styles.diagramScrollHint} aria-hidden="true">
        Scroll diagram
      </p>
      <div className={styles.diagram} tabIndex={0} role="group" aria-label="System architecture diagram, scrollable">
        <svg
          viewBox="0 0 900 300"
          role="img"
          aria-labelledby="arch-title arch-desc"
          className={styles.diagramSvg}
        >
          <title id="arch-title">
            Hephaestus lander control architecture
          </title>
          <desc id="arch-desc">
            Three stages. A PIC18F primary controller handles the rover rotation
            indexer, Hall-effect interrupts, PWM motor drive logic, and safety
            interlocks. It passes SPI and GPIO to a PSoC 4 co-controller, which
            drives six exit door actuators, the status indication matrix,
            telemetry signalling, and power rail monitoring. An H-bridge then
            carries drive current to the physical actuation stage: a geared DC
            motor, six neodymium magnets, op-amp conditioned Hall sensors, and
            the deployment bay doors.
          </desc>

          {/* Bus labels */}
          <text x="245" y="122" className={styles.busLabel}>
            SPI / GPIO
          </text>
          <text x="556" y="122" className={styles.busLabel}>
            H-BRIDGE
          </text>

          {/* Buses */}
          <path
            d="M240 130 H330"
            className={styles.busActive}
            markerEnd="url(#arrow)"
          />
          <path
            d="M560 130 H650"
            className={styles.bus}
            markerEnd="url(#arrow)"
          />

          {/* Blocks */}
          <Block
            x={20}
            title="PRIMARY MCU (PIC18)"
            lines={[
              "Rover rotation indexer",
              "Hall-effect interrupts",
              "PWM motor drive logic",
              "Safety interlocks",
            ]}
          />
          <Block
            x={340}
            title="CO-CONTROLLER (PSoC)"
            lines={[
              "6× exit door actuation",
              "Status indication matrix",
              "Telemetry signalling",
              "Power rail monitoring",
            ]}
          />
          <Block
            x={660}
            title="PHYSICAL ACTUATION"
            lines={[
              "Geared DC motor core",
              "6× neodymium magnets",
              "Op-amp Hall sensors",
              "Deployment bay doors",
            ]}
          />

          <defs>
            <marker
              id="arrow"
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L8 4 L0 8 z" className={styles.arrowHead} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className={styles.figureCaption}>
        <span className="meta">
          Figure 1.0 — dual-controller signal and actuation architecture
        </span>
        <span className="meta">Not flight hardware</span>
      </figcaption>
    </figure>
  );
}

function Block({
  x,
  title,
  lines,
}: {
  x: number;
  title: string;
  lines: string[];
}) {
  return (
    <g>
      <rect
        x={x}
        y={40}
        width={220}
        height={180}
        rx={6}
        className={styles.block}
      />
      <text x={x + 16} y={70} className={styles.blockTitle}>
        {title}
      </text>
      {lines.map((line, index) => (
        <text
          key={line}
          x={x + 16}
          y={100 + index * 22}
          className={styles.blockLine}
        >
          • {line}
        </text>
      ))}
    </g>
  );
}

/**
 * SolarSENSE inference pipeline.
 *
 * The honest version of the diagram: the sensors the board actually has, the
 * features derived from them, the model, and the local output. The rejected
 * NPK path is shown struck through and labelled, because leaving it out would
 * misrepresent how the system was built.
 */
export function SolarSenseFigure() {
  return (
    <figure className={styles.figureWrap}>
      <p className={styles.diagramScrollHint} aria-hidden="true">
        Scroll diagram
      </p>
      <div className={styles.diagram} tabIndex={0} role="group" aria-label="Inference pipeline diagram, scrollable">
        <svg
          viewBox="0 0 900 250"
          role="img"
          aria-labelledby="ss-title ss-desc"
          className={styles.diagramSvg}
        >
          <title id="ss-title">SolarSENSE on-device inference pipeline</title>
          <desc id="ss-desc">
            Capacitive soil moisture, electrical conductivity, and temperature
            probes feed a feature normalization stage, which feeds a quantized
            int8 classification model on the ESP32, which feeds an ESP-DASH
            dashboard served over a local SoftAP access point. No cloud
            dependency. A rejected branch, showing the nitrogen-phosphorus-
            potassium sensors assumed by the research datasets, is marked
            unavailable because the evaluation board does not carry them.
          </desc>

          <text x="20" y="40" className={styles.blockTitle}>
            MEASURED ON BOARD
          </text>
          {["Capacitive moisture", "Electrical conductivity", "Temperature"].map(
            (line, index) => (
              <text
                key={line}
                x={20}
                y={70 + index * 24}
                className={styles.blockLine}
              >
                • {line}
              </text>
            ),
          )}

          <path d="M240 100 H310" className={styles.busActive} markerEnd="url(#arrow2)" />

          <text x="320" y="40" className={styles.blockTitle}>
            PIPELINE
          </text>
          {["Feature normalization", "Quantized int8 model", "ESP32 execution"].map(
            (line, index) => (
              <text
                key={line}
                x={320}
                y={70 + index * 24}
                className={styles.blockLine}
              >
                • {line}
              </text>
            ),
          )}

          <path d="M560 100 H630" className={styles.busActive} markerEnd="url(#arrow2)" />

          <text x="640" y="40" className={styles.blockTitle}>
            OUTPUT
          </text>
          {["ESP-DASH dashboard", "Local SoftAP only", "0 KB network overhead"].map(
            (line, index) => (
              <text
                key={line}
                x={640}
                y={70 + index * 24}
                className={styles.blockLine}
              >
                • {line}
              </text>
            ),
          )}

          {/* Rejected path */}
          <g>
            <rect
              x={20}
              y={165}
              width={560}
              height={62}
              rx={6}
              className={styles.blockRejected}
            />
            <text x={36} y={192} className={styles.rejectedLabel}>
              REJECTED — NPK chemical sensors
            </text>
            <text x={36} y={213} className={styles.rejectedNote}>
              Assumed by the research datasets; not present on the evaluation board
            </text>
          </g>

          <defs>
            <marker
              id="arrow2"
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L8 4 L0 8 z" className={styles.arrowHead} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className={styles.figureCaption}>
        <span className="meta">
          Figure 1.0 — on-device inference path and the rejected sensor branch
        </span>
        <span className="meta">EGR 598 course prototype</span>
      </figcaption>
    </figure>
  );
}
