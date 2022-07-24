import Sort from "../components/main/decoration/sort";

describe("FilterValue is defined", () => {
  const sort = new Sort();
  it("should be defined", () => {
    expect(sort.rangeSlider).toBeDefined();
    expect(sort.rangeSlider).not.toBeUndefined();
  });
  it("should be defined", () => {
    expect(sort.searchOninput).toBeDefined();
    expect(sort.searchOninput).not.toBeUndefined();
  });
  it("should be defined", () => {
    expect(sort.sortAscendingDescendingOnchange).toBeDefined();
    expect(sort.sortAscendingDescendingOnchange).not.toBeUndefined();
  });
  it("should be defined", () => {
    expect(sort.filterBtnAllClick).toBeDefined();
    expect(sort.filterBtnAllClick).not.toBeUndefined();
  });
  it("should be defined", () => {
    expect(sort.localStorageFunction).toBeDefined();
    expect(sort.localStorageFunction).not.toBeUndefined();
  });
  it("should be defined", () => {
    expect(sort.resetFilters).toBeDefined();
    expect(sort.resetFilters).not.toBeUndefined();
  });
  it("should be defined", () => {
    expect(sort.localStorInputValue).toBeDefined();
    expect(sort.localStorInputValue).not.toBeUndefined();
  });
});