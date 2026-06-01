import type { CSSProperties, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  CheckCircle2,
  CircleDot,
  FileText,
  Lightbulb,
  TrendingUp,
} from "lucide-react";

type ClassValue = string | false | null | undefined;

function cn(...classes: ClassValue[]) {
  return classes.filter(Boolean).join(" ");
}

type CaseEyebrowProps = {
  children: ReactNode;
  className?: string;
};

export function CaseEyebrow({ children, className }: CaseEyebrowProps) {
  return (
    <p
      className={cn(
        "text-xs font-mono uppercase tracking-[0.18em] text-accent-light",
        className,
      )}
    >
      {children}
    </p>
  );
}

type CaseSectionHeaderProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  text?: ReactNode;
  className?: string;
};

export function CaseSectionHeader({
  eyebrow,
  title,
  text,
  className,
}: CaseSectionHeaderProps) {
  return (
    <div className={cn("mb-8 max-w-3xl", className)}>
      {eyebrow && <CaseEyebrow className="mb-3">{eyebrow}</CaseEyebrow>}
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      {text && (
        <p className="mt-4 text-base leading-relaxed text-text-secondary md:text-lg">
          {text}
        </p>
      )}
    </div>
  );
}

type BeforeAfterColumn = {
  title: ReactNode;
  description?: ReactNode;
  points?: ReactNode[];
};

type BeforeAfterProps = {
  before: BeforeAfterColumn;
  after: BeforeAfterColumn;
  beforeLabel?: ReactNode;
  afterLabel?: ReactNode;
  className?: string;
};

export function BeforeAfter({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  className,
}: BeforeAfterProps) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-[1fr_auto_1fr]", className)}>
      <BeforeAfterPanel label={beforeLabel} tone="muted" {...before} />
      <div className="hidden items-center justify-center px-1 md:flex">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/25 bg-accent/10 text-accent-light">
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </div>
      </div>
      <BeforeAfterPanel label={afterLabel} tone="accent" {...after} />
    </div>
  );
}

type BeforeAfterPanelProps = BeforeAfterColumn & {
  label: ReactNode;
  tone: "muted" | "accent";
};

function BeforeAfterPanel({
  label,
  title,
  description,
  points,
  tone,
}: BeforeAfterPanelProps) {
  return (
    <div
      className={cn(
        "card p-6",
        tone === "accent" && "border-accent/25 bg-accent/5",
      )}
    >
      <p
        className={cn(
          "mb-3 font-mono text-xs uppercase tracking-[0.16em]",
          tone === "accent" ? "text-accent-light" : "text-text-muted",
        )}
      >
        {label}
      </p>
      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      {description && (
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          {description}
        </p>
      )}
      {points && points.length > 0 && (
        <ul className="mt-5 space-y-3">
          {points.map((point, index) => (
            <li
              key={index}
              className="flex gap-3 text-sm leading-relaxed text-text-secondary"
            >
              <span
                className={cn(
                  "mt-2 h-1.5 w-1.5 shrink-0 rounded-full",
                  tone === "accent" ? "bg-accent-light" : "bg-text-dim",
                )}
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export type LearningItem = {
  title: ReactNode;
  text: ReactNode;
  icon?: LucideIcon;
};

type LearningBlockProps = {
  title?: ReactNode;
  text?: ReactNode;
  items: LearningItem[];
  className?: string;
};

export function LearningBlock({
  title = "Learnings",
  text,
  items,
  className,
}: LearningBlockProps) {
  return (
    <div className={cn("card p-6 md:p-8", className)}>
      <div className="mb-6 flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent-light">
          <Lightbulb className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
          {text && (
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              {text}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item, index) => {
          const Icon = item.icon ?? CheckCircle2;

          return (
            <div
              key={index}
              className="rounded-lg border border-border bg-bg-primary/35 p-4"
            >
              <div className="mb-3 flex items-center gap-3">
                <Icon className="h-4 w-4 text-accent-light" aria-hidden="true" />
                <h4 className="font-semibold tracking-tight">{item.title}</h4>
              </div>
              <p className="text-sm leading-relaxed text-text-secondary">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export type SystemFlowStep = {
  title: ReactNode;
  text?: ReactNode;
  meta?: ReactNode;
  tags?: ReactNode[];
  icon?: LucideIcon;
};

type SystemFlowProps = {
  steps: SystemFlowStep[];
  title?: ReactNode;
  text?: ReactNode;
  direction?: "vertical" | "horizontal";
  className?: string;
};

export function SystemFlow({
  steps,
  title,
  text,
  direction = "vertical",
  className,
}: SystemFlowProps) {
  const isHorizontal = direction === "horizontal";

  return (
    <div className={cn("card p-6 md:p-8", className)}>
      {(title || text) && (
        <div className="mb-7 max-w-3xl">
          {title && <h3 className="text-2xl font-bold tracking-tight">{title}</h3>}
          {text && (
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              {text}
            </p>
          )}
        </div>
      )}

      <ol
        className={cn(
          "grid gap-4",
          isHorizontal && "lg:grid-cols-[repeat(var(--flow-count),minmax(0,1fr))]",
        )}
        style={
          isHorizontal
            ? ({ "--flow-count": steps.length } as CSSProperties)
            : undefined
        }
      >
        {steps.map((step, index) => (
          <SystemFlowCard
            key={index}
            step={step}
            index={index}
            isLast={index === steps.length - 1}
            isHorizontal={isHorizontal}
          />
        ))}
      </ol>
    </div>
  );
}

type SystemFlowCardProps = {
  step: SystemFlowStep;
  index: number;
  isLast: boolean;
  isHorizontal: boolean;
};

function SystemFlowCard({
  step,
  index,
  isLast,
  isHorizontal,
}: SystemFlowCardProps) {
  const Icon = step.icon ?? CircleDot;

  return (
    <li className="relative">
      {!isLast && (
        <div
          className={cn(
            "absolute bg-border",
            isHorizontal
              ? "left-[2.75rem] right-[-1rem] top-6 hidden h-px lg:block"
              : "bottom-[-1rem] left-6 top-12 w-px",
          )}
          aria-hidden="true"
        />
      )}

      <div className="relative rounded-lg border border-border bg-bg-primary/45 p-5">
        <div className="mb-4 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent-light">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="font-mono text-xs text-text-muted">
              {step.meta ?? String(index + 1).padStart(2, "0")}
            </p>
            <h4 className="mt-1 text-lg font-semibold tracking-tight">
              {step.title}
            </h4>
          </div>
        </div>

        {step.text && (
          <p className="text-sm leading-relaxed text-text-secondary">
            {step.text}
          </p>
        )}

        {step.tags && step.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {step.tags.map((tag, tagIndex) => (
              <span key={tagIndex} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}

export type ImpactMetric = {
  value: ReactNode;
  label: ReactNode;
  detail?: ReactNode;
  icon?: LucideIcon;
};

type ImpactGridProps = {
  items: ImpactMetric[];
  columns?: 2 | 3 | 4;
  className?: string;
};

export function ImpactGrid({ items, columns = 3, className }: ImpactGridProps) {
  const gridClass =
    columns === 4
      ? "md:grid-cols-2 lg:grid-cols-4"
      : columns === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-3";

  return (
    <dl className={cn("grid gap-4", gridClass, className)}>
      {items.map((item, index) => {
        const Icon = item.icon ?? TrendingUp;

        return (
          <div key={index} className="card p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <Icon className="h-5 w-5 text-accent-light" aria-hidden="true" />
              <span className="font-mono text-xs text-text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <dt className="text-sm leading-relaxed text-text-secondary">
              {item.label}
            </dt>
            <dd className="mt-2 text-3xl font-bold tracking-tight text-accent-light">
              {item.value}
            </dd>
            {item.detail && (
              <p className="mt-3 text-xs leading-relaxed text-text-muted">
                {item.detail}
              </p>
            )}
          </div>
        );
      })}
    </dl>
  );
}

type EvidenceItem = {
  label?: ReactNode;
  value: ReactNode;
};

type EvidenceCalloutProps = {
  title: ReactNode;
  text?: ReactNode;
  items?: EvidenceItem[];
  icon?: LucideIcon;
  footer?: ReactNode;
  className?: string;
};

export function EvidenceCallout({
  title,
  text,
  items,
  icon: Icon = FileText,
  footer,
  className,
}: EvidenceCalloutProps) {
  return (
    <aside
      className={cn(
        "rounded-xl border border-accent/25 bg-accent/5 p-6 md:p-7",
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent-light">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
          {text && (
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              {text}
            </p>
          )}
        </div>
      </div>

      {items && items.length > 0 && (
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {items.map((item, index) => (
            <div
              key={index}
              className="rounded-lg border border-border bg-bg-primary/45 p-4"
            >
              {item.label && (
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.14em] text-text-muted">
                  {item.label}
                </p>
              )}
              <p className="text-sm leading-relaxed text-text-secondary">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {footer && (
        <div className="mt-5 border-t border-accent/15 pt-4 text-sm leading-relaxed text-text-muted">
          {footer}
        </div>
      )}
    </aside>
  );
}
