import Main from "../components/main/main";

describe("Main is defined", () => {
  const main = new Main();
  it("should be defined", () => {
    expect(main.appendBody).toBeDefined();
    expect(main.appendBody).not.toBeUndefined();
  });
  it("should be defined", () => {
    expect(main.appendMain).toBeDefined();
    expect(main.appendMain).not.toBeUndefined();
  });
  it("should be defined", () => {
    expect(main.appendAsideValue).toBeDefined();
    expect(main.appendAsideValue).not.toBeUndefined();
  });
  it("should be defined", () => {
    expect(main.appendSectionProducts).toBeDefined();
    expect(main.appendSectionProducts).not.toBeUndefined();
  });
  it("should be defined", () => {
    expect(main.activeSectionProducts).toBeDefined();
    expect(main.activeSectionProducts).not.toBeUndefined();
  });

});