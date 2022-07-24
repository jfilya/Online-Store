import FilterValue from "../components/main/decoration/filters/filter";

describe("FilterValue is defined", () => {
  const filter = new FilterValue();
  it("should be defined", () => {
    expect(filter.innerFilter).toBeDefined();
    expect(filter.innerFilter).not.toBeUndefined();
  });
  it("should be defined", () => {
    expect(filter.manufacturer).toBeDefined();
    expect(filter.manufacturer).not.toBeUndefined();
  });
  it("should be defined", () => {
    expect(filter.numberCameras).toBeDefined();
    expect(filter.numberCameras).not.toBeUndefined();
  });
  it("should be defined", () => {
    expect(filter.colorSort).toBeDefined();
    expect(filter.colorSort).not.toBeUndefined();
  });
  it("should be defined", () => {
    expect(filter.popular).toBeDefined();
    expect(filter.popular).not.toBeUndefined();
  });

  it("should be defined", () => {
    expect(filter.range).toBeDefined();
    expect(filter.range).not.toBeUndefined();
  });
  it("should be defined", () => {
    expect(filter.search).toBeDefined();
    expect(filter.search).not.toBeUndefined();
  });
  it("should be defined", () => {
    expect(filter.sort).toBeDefined();
    expect(filter.sort).not.toBeUndefined();
  });
  it("should be defined", () => {
    expect(filter.reset).toBeDefined();
    expect(filter.reset).not.toBeUndefined();
  });
  it("should be defined", () => {
    expect(filter.localStorageAllFiltersBtn).toBeDefined();
    expect(filter.localStorageAllFiltersBtn).not.toBeUndefined();
  });
});