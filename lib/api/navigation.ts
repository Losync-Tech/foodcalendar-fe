import "server-only";
import { getApi } from "./server";
import type { MealPlan, NavigationData, User } from "./types";

export async function getNavigationData(date: string, selected: string | null, signal?: AbortSignal): Promise<NavigationData | null> {
  const query = new URLSearchParams({ date });
  if (selected) query.set("userId", selected);
  const [usersResult, plansResult] = await Promise.allSettled([
    getApi<User[]>("/users", signal),
    getApi<MealPlan[]>(`/meal-plans?${query}`, signal),
  ]);
  if (usersResult.status === "rejected") throw usersResult.reason;
  const users = usersResult.value;
  if (!Array.isArray(users) || users.some(user => !Number.isSafeInteger(user.id) || typeof user.name !== "string")) throw new Error("Invalid users");
  if (selected && !users.some(user => String(user.id) === selected)) return null;
  const userIds = new Set(users.map(user => user.id));
  const plans = plansResult.status === "fulfilled" ? plansResult.value : undefined;
  if (!Array.isArray(plans) || plans.some(plan => !Number.isSafeInteger(plan?.id) || !userIds.has(plan.user?.id) || (selected && String(plan.user.id) !== selected) || !Number.isSafeInteger(plan.meal?.id) || typeof plan.meal?.name !== "string" || typeof plan.meal?.description !== "string" || typeof plan.mealType !== "string")) {
    return { users, plans: [], status: "unavailable" };
  }
  return { users, plans, status: "ready" };
}