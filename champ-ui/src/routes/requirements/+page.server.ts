import { config } from "$lib/config"
import type { Load } from "@sveltejs/kit";

export const load: Load = async ({ fetch }) => {
  const categoryResponse = await fetch(`${config.baseApiUrl}/api/v1/asvs/categories/sub-categories`)
  const categories = await categoryResponse.json();

  const requirementResponse = await fetch(`${config.baseApiUrl}/api/v1/asvs/categories/requirements`)
  const requirements = await requirementResponse.json()

  return { categories, requirements }
}
