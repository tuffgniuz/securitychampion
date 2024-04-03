import { config } from "$lib/config"
import type { Actions, Load } from "@sveltejs/kit";

export const load: Load = async ({ fetch }) => {
  const categoryResponse = await fetch(`${config.baseApiUrl}/api/v1/asvs/categories/sub-categories`)
  const categories = await categoryResponse.json();

  const categoriesJoinedRequirementsResponse = await fetch(`${config.baseApiUrl}/api/v1/asvs/categories/sub-categories/requirements`)
  const categoriesJoinedRequirements = await categoriesJoinedRequirementsResponse.json()

  const issuesResponse = await fetch(`${config.baseApiUrl}/api/v1/issues`)
  const issues = await issuesResponse.json();

  return { categories, categoriesJoinedRequirements, issues }
}

export const actions: Actions = {
  addRequirementToIssue: async ({ request }) => {
    const data = await request.formData();
    const issueId = data.get('issueId')
    const requirementId = data.get('requirementId')

    try {
      const response = await fetch(`${config.baseApiUrl}/api/v1/issues/${issueId}/requirements/${requirementId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          issue_id: issueId, 
          requirement_id: requirementId 
        })
      })
      const data = await response.json();

      if (!response.ok) {
        console.log(data)
      }
    } catch (error) {
      console.log(error)
    }
  },

  createIssue: async ({ request }) => {
    console.log('Creating...')
    const data = await request.formData();
    const name = data.get('name')
    const description = data.get('description')

    try {
      const response = await fetch(`${config.baseApiUrl}/api/v1/issues`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description })
      })
      const data = await response.json();

      if (!response.ok) throw new Error('Failed');
    } catch (error) {
      console.log(error)
    }
  }
}
