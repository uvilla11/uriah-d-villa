import type { Credential, Education, ExperienceRole, Profile } from "@/lib/types";

/**
 * Identity, work history, and education.
 *
 * Every value here is transcribed from verified source material. Fields with
 * no confirmed value are omitted rather than guessed (§78).
 */
export const profile: Profile = {
  name: "Uriah Villa",
  monogram: "UV",
  title: "MCU Applications Engineer II",
  positioning:
    "Embedded systems engineer working from silicon to motion — bare-metal firmware, custom PCB design, closed-loop motor control, robotics, and edge AI.",
  location: "Mesa, Arizona",
  status: "ACTIVE",
  statusContext: "Microchip Technology · New Product Development",
  email: "uvilla11@gmail.com",
  links: [
    {
      label: "GitHub",
      href: "https://github.com/uvilla11",
      external: true,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/uriah-villa/",
      external: true,
    },
    {
      label: "Résumé",
      href: "/resume",
      external: false,
    },
    {
      label: "Email",
      href: "mailto:uvilla11@gmail.com",
      external: false,
    },
  ],
};

export const experience: ExperienceRole[] = [
  {
    company: "Microchip Technology",
    role: "Engineer II, MCU Applications — New Product Development",
    start: "2023",
    end: "PRESENT",
    location: "Mesa, Arizona",
    summary:
      "Author the firmware solutions and technical collateral that engineers use to bring up new PIC microcontrollers in their own production systems.",
    bullets: [
      "Author and maintain 10+ firmware application examples and reference code solutions across 8-bit, 16-bit, and 32-bit MCU product lines.",
      "Develop customer-facing application notes and technical documentation for low-power optimization and peripheral bring-up.",
      "Collaborate across silicon architecture, EDA tool teams, and tier-1 customers to accelerate adoption of new microcontrollers.",
    ],
    progression:
      "MCU Applications Intern → Support Engagement Intern → Corporate Applications Intern → Engineer II",
  },
  {
    company: "Arizona State University",
    role: "Student Services Coordinator Senior",
    start: "2023",
    end: "2025",
    location: "Tempe, Arizona",
    concurrent: true,
    summary:
      "Designed and deployed a QR-based express-advising intake system alongside graduate study and engineering tenure.",
    bullets: [
      "Reduced front-desk intake latency by 70%.",
      "Enabled the department to serve 20% more students with existing staffing.",
    ],
  },
];

export const education: Education[] = [
  {
    institution: "Arizona State University",
    degree: "M.S. in Engineering",
    field: "Systems, Mechatronics, and Power",
    date: "2025",
    honors: ["4.0 GPA", "Graduated with Distinction"],
    detail: "Accelerated 4+1 program.",
  },
  {
    institution: "Arizona State University",
    degree: "B.S.E. in Robotics",
    field: "Robotics Engineering",
    date: "2024",
    honors: ["Cum Laude"],
    detail:
      "Embedded systems, computational modeling, and closed-loop robotic development.",
  },
];

/**
 * Certification and training badges. Only the badge names are confirmed —
 * issuing body, issue date, and credential ID are deliberately left out
 * rather than assumed (§78).
 */
export const credentials: Credential[] = [
  { name: "Universal Robots Core" },
  { name: "Universal Robots Pro" },
  { name: "Simulink Fundamentals" },
  { name: "Arizona Tech Skills" },
];

/** Background narrative for /about. Facts only, no invented history. */
export const background: string[] = [
  "I started at sixteen in Chinle, Arizona, repairing cracked phones, damaged logic boards, and dead laptops — spending five years learning how and why hardware breaks before formally studying engineering theory.",
  "That background still sets the method: verify the datasheet on the bench, isolate one subsystem at a time, and never assume software is working until the oscilloscope trace confirms it.",
  "At Microchip I write the firmware solutions and technical collateral that engineers rely on to bring up new PIC microcontrollers in their own production systems.",
];
