import { WorkflowTrigger } from "../../../../common/Workflow";
import Link from "next/link";
import { formatDate } from "@/lib/calendar";

import { MealCard } from "../MealCard";
import type { DayCellProps } from "./types";

export function DayCell({ date, userId, today, selected, inMonth, plans, href, incomplete }: DayCellProps) {
  const label = formatDate(date, { weekday: "long", day: "numeric", month: "long" });
  return <td className={`h-36 border-r border-b border-border p-1.5 align-top last:border-r-0 ${selected ? "bg-primary-muted/30" : inMonth ? "bg-surface" : "bg-background"}`}>
    <Link href={href} aria-label={`${label}${date === today ? ", hoje" : ""}, ${plans.length} refeições`} aria-current={selected ? "date" : undefined} className="mb-1.5 block rounded-control">
      <span className={`flex size-7 items-center justify-center rounded-full text-sm ${date === today ? "bg-primary font-semibold text-primary-foreground" : selected ? "bg-primary-muted font-semibold text-primary-muted-foreground" : inMonth ? "text-foreground" : "text-muted-foreground"}`}>{Number(date.slice(-2))}</span>
    </Link>
    <ul className="space-y-1">{plans.map(plan => <li key={plan.id}><MealCard plan={plan} date={date} variant="compact" /></li>)}</ul>
    {plans.length === 0 && incomplete && <p className="px-1 text-xs text-muted-foreground">Dados incompletos</p>}
    <WorkflowTrigger request={{ kind: "plan", userId: userId ?? undefined }} className="mt-2 block rounded px-1 text-left text-sm text-primary">+ Adicionar refeição</WorkflowTrigger>
  </td>;
}