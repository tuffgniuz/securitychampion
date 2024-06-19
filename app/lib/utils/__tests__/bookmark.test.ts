import { mockData } from "../__mocks__/mockData";
import {
  filteredBookmarkedRequirements,
  getBookmarkedRequirements,
  getBookmarks,
} from "../bookmark";
import { fetchAsvsData } from "../data";

jest.mock("../data", () => ({
  fetchAsvsData: jest.fn(),
}));

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

describe("filteredBookmarkedRequirements", () => {
  it("should return an empty array when there are no bookmarked equal requirementId's", () => {
    const bookmarks = ["req7", "req8"];
    const result = filteredBookmarkedRequirements(mockData, bookmarks);
    expect(result).toEqual([]);
  });

  it("should return the correct bookmarked requirements", () => {
    const bookmarks = [
      "V1.1.1",
      "V1.1.2",
      "V1.1.3",
      "V1.1.4",
      "V1.1.5",
      "V1.1.6",
    ];
    const expected = [
      { requirement_id: "V1.1.1", description: "Requirement 1" },
      { requirement_id: "V1.1.2", description: "Requirement 2" },
      { requirement_id: "V1.1.3", description: "Requirement 3" },
      { requirement_id: "V1.1.4", description: "Requirement 4" },
      { requirement_id: "V1.1.5", description: "Requirement 5" },
      { requirement_id: "V1.1.6", description: "Requirement 6" },
    ];
    const result = filteredBookmarkedRequirements(mockData, bookmarks);
    expect(result).toEqual(expected);
  });
});

describe("getBookmarkedRequirements", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("should return an empty array when there are no bookmarks and no data", async () => {
    localStorage.setItem("bookmarks", JSON.stringify([]));
    (fetchAsvsData as jest.Mock).mockResolvedValue([]);

    const result = await getBookmarkedRequirements();
    expect(result).toEqual([]);
  });

  it("should return the correct bookmarked requirements", async () => {
    const bookmarks = ["V1.1.1", "V1.1.4", "V1.1.6"];
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    (fetchAsvsData as jest.Mock).mockResolvedValue(mockData);

    const expected = [
      { requirement_id: "V1.1.1", description: "Requirement 1" },
      { requirement_id: "V1.1.4", description: "Requirement 4" },
      { requirement_id: "V1.1.6", description: "Requirement 6" },
    ];
    const result = await getBookmarkedRequirements();
    expect(result).toEqual(expected);
  });

  it("should handle invalid JSON in localStorage gracefully and still fetch data", async () => {
    localStorage.setItem("bookmarks", "invalid JSON");
    (fetchAsvsData as jest.Mock).mockResolvedValue(mockData);

    const result = await getBookmarkedRequirements();
    expect(result).toEqual([]);
  });
});
