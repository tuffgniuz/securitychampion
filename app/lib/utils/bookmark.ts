import { fetchAsvsData } from "./data";

export const addBookmark = (requirementId: string): void => {
  const bookmarks = getBookmarks();
  bookmarks.push(requirementId);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
};

/**
 * Retrieves bookmarks from localStorage.
 *
 * @returns {string[]} An array of bookmarked requirement IDs.
 */
export const getBookmarks = (): string[] => {
  try {
    const bookmarks = localStorage.getItem("bookmarks");
    return bookmarks ? JSON.parse(bookmarks) : [];
  } catch (error) {
    return [];
  }
};

/**
 * Filters the requirements based on the provided bookmarks.
 *
 * @param {Category[]} data - The array of categories containing requirements.
 * @param {string[]} bookmarks - The array of bookmarked requirement IDs.
 * @returns {Requirement[]} An array of requirements that are bookmarked.
 */
export const filteredBookmarkedRequirements = (
  data: Category[],
  bookmarks: string[],
): Requirement[] => {
  const bookmarkedRequirements: Requirement[] = [];

  data.forEach((category) => {
    category.sub_categories.forEach((subCategory) => {
      subCategory.requirements.forEach((requirement) => {
        if (bookmarks.includes(requirement.requirement_id)) {
          bookmarkedRequirements.push(requirement);
        }
      });
    });
  });

  return bookmarkedRequirements;
};

/**
 * Retrieves bookmarked requirements by fetching data and filtering it.
 *
 * @returns {Promise<Requirement[]>} A promise that resolves to an array of bookmarked requirements.
 */
export const getBookmarkedRequirements = async (): Promise<Requirement[]> => {
  const bookmarks = getBookmarks();
  const data = await fetchAsvsData();
  return filteredBookmarkedRequirements(data, bookmarks);
};

export const removeBookmark = (requirementId: string): void => {
  const bookmarks = getBookmarks().filter((id) => id !== requirementId);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
};

export const isBookmarked = (requirementId: string): boolean => {
  const bookmarks = getBookmarks();
  return bookmarks.includes(requirementId);
};
