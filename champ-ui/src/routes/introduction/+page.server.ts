import { config } from "$lib/config";
import type { Load } from "@sveltejs/kit";
import { marked } from "marked";

export const load: Load = async ({ fetch }) => {
  const response = await fetch(`${config.baseApiUrl}/files/introduction`)
  const data = await response.json();
  const content = marked.parse(data.content)

  return { content }
}
