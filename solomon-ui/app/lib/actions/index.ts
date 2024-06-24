"use server";

export const getCategoriesWithRelations = async () => {
  const response = await fetch("http://localhost:8000/categories");
  const data = await response.json();
  return data;
};
