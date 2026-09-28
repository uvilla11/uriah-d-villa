import { Hero, Signals } from "@/components/home/Hero";
import { Contact } from "@/components/home/Contact";
import { SelectedWork } from "@/components/home/SelectedWork";
import {
  About,
  BuildLogPreview,
  Capabilities,
  Coverage,
  Experience,
  Metrics,
  Principles,
  Scope,
} from "@/components/home/sections";

/**
 * Homepage sequence (§15). Twelve sections, in the order that moves a
 * visitor from identity to evidence to technical depth to contact.
 *
 *   01 Hero              07 Engineering metrics
 *   02 Current signals   08 Experience
 *   03 Selected work     09 Build log preview
 *   04 What I do         10 Engineering principles
 *   05 Engineering scope 11 About
 *   06 Technical coverage 12 Contact
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Signals />
      <SelectedWork />
      <Capabilities />
      <Scope />
      <Coverage />
      <Metrics />
      <Experience />
      <BuildLogPreview />
      <Principles />
      <About />
      <Contact />
    </>
  );
}
