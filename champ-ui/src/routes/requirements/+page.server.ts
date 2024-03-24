import { config } from "$lib/config"
import type { Load } from "@sveltejs/kit";

export const load: Load = async ({ fetch }) => {
  const categoryResponse = await fetch(`${config.baseApiUrl}/api/v1/asvs/categories/sub-categories`)
  const categories = await categoryResponse.json();

  const categoriesJoinedRequirementsResponse = await fetch(`${config.baseApiUrl}/api/v1/asvs/categories/sub-categories/requirements`)
  const categoriesJoinedRequirements = await categoriesJoinedRequirementsResponse.json()

  console.log(categoriesJoinedRequirements)

  return { categories, categoriesJoinedRequirements }
}
