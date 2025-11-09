"use client"

import type { LucideIcon } from "lucide-react"
import { Lightbulb, Rocket, ShieldCheck, Users } from "lucide-react"

type Benefit = {
  id: number
  title: string
  description: string
  icon: LucideIcon
  stat: string
}

const benefits: Benefit[] = [
  {
    id: 1,
    title: "Faster Growth Sprints",
    description:
      "Launch campaigns in weeks, not months. Our cross-functional pods remove handoffs so you see compounding results sooner.",
    icon: Rocket,
    stat: "3x quicker go-to-market",
  },
  {
    id: 2,
    title: "Conversion-First Experiences",
    description:
      "Every touchpoint is tested against revenue goals. From copy to UX, we optimise continuously to lift pipeline quality.",
    icon: ShieldCheck,
    stat: "28% lift in qualified leads",
  },
  {
    id: 3,
    title: "Insight-Driven Decisions",
    description:
      "Weekly dashboards translate complex data into next steps, keeping your leadership confident about every investment.",
    icon: Lightbulb,
    stat: "95% reporting adoption",
  },
  {
    id: 4,
    title: "Embedded Partner Support",
    description:
      "We work as an extension of your team with proactive stand-ups, transparent roadmaps, and on-call specialists.",
    icon: Users,
    stat: "12+ dedicated experts",
  },
]

export default function ContentSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 lg:px-12">
        <header className="text-center">
          <span className="inline-flex items-center justify-center rounded-full bg-yellow px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-black">
            Outcomes
          </span>
          <h2 className="mt-8 text-4xl font-semibold leading-tight text-black md:text-5xl lg:text-6xl font-cal-sans">
            The{" "}
            <span className="relative inline-block">
              <span className="absolute bottom-1 left-0 right-0 h-2/4 bg-yellow" />
              <span className="relative z-10 font-semibold">Impact</span>
            </span>{" "}
            Digital Neighbour Brings
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-black md:text-lg">
            Every engagement is engineered to compound. These are the measurable shifts clients feel within the first ninety
            days of partnering with our team.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {benefits.map(({ id, icon: Icon, title, description, stat }) => (
            <article key={id} className="flex h-full flex-col gap-6 rounded-[28px] bg-yellow/10 p-8">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow text-black">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-black">{title}</h3>
                  <p className="mt-1 text-sm font-medium uppercase tracking-[0.2em] text-black/70">{stat}</p>
                </div>
              </div>
              <p className="text-base leading-relaxed text-black">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

