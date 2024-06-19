import { getBookmarks } from "../bookmark";

describe("getBookmarks", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return an empty array when there are no bookmarks", () => {
    const result = getBookmarks();
    expect(result).toEqual([]);
  });

  it("should return an array of bookmarks when they exist in localStorage", () => {
    const bookmarks = ["req1", "req1", "req3"];
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    const result = getBookmarks();
    expect(result).toEqual(bookmarks);
  });

  it("should handle invalid JSON in localStorage gracefully", () => {
    localStorage.setItem("bookmarks", "invalid JSON");

    const result = getBookmarks();
    expect(result).toEqual([]);
  });
});
