import { config } from "$lib/config";
import type { Actions, Load } from "@sveltejs/kit";

export const load: Load = async ({ fetch }) => {
  const issuesResponse = await fetch(`${config.baseApiUrl}/api/v1/issues`)
  const issues = await issuesResponse.json();

  return { issues }
}

export const actions: Actions = {
  createIssue: async ({ request }) => {
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

      console.log(data)
      
      if (!response.ok) throw new Error('Failed');
    } catch (error) {
      console.log(error)
    }
  }
}
