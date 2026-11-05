import type { Meal, NavigationData } from "@/lib/api/types";

export interface SearchProps {
  date: string;
  userId: string | null;
  navigation: NavigationData | null;
  onRetryDay: () => void;
}
export interface SearchResponse {
  key: string;
  partial: boolean;
  meals: Meal[];
  failed: boolean;
}