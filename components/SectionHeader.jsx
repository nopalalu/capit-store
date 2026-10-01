"use client";
import Reveal from "./Reveal";

export default function SectionHeader({ eyebrow, title, accent, description, action }) {
  return (
    <Reveal>
      <div className="flex items-end justify-between gap-6 mb-8 md:mb-10">
        <div className="max-w-2xl">
          {eyebrow && (
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-800 mb-3 flex items-center gap-2.5">
              <span className="inline-block w-7 h-[2px] bg-emerald-800 rounded-full" />
              {eyebrow}
            </p>
          )}
          <h2 className="font-display text-[32px] md:text-[44px] leading-[1.05] font-semibold text-neutral-900 tracking-tight">
            {title}{" "}
            {accent && <em className="text-emerald-800">{accent}</em>}
          </h2>
          {description && (
            <p className="text-sm md:text-base text-neutral-500 mt-3 leading-relaxed">{description}</p>
          )}
        </div>
        {action && <div className="shrink-0 hidden sm:block pb-1">{action}</div>}
      </div>
    </Reveal>
  );
}
