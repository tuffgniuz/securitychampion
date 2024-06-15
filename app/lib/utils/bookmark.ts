import { fetchAsvsData } from "./data";

export const getBookmarkedRequirements = async () => {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
  const data = await fetchAsvsData();

  const bookmarkedRequirements: Requirement[] = [];

  data.forEach((category: Category) => {
    category.sub_categories.forEach((subCategory) => {
      subCategory.requirements.forEach((requirement) => {
        if (bookmarks.includes(requirement.requirement_id)) {
          bookmarkedRequirements.push(requirement);
        }
      })
    })
  })

  return bookmarkedRequirements;
}
