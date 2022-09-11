import Products from "../components/main/decoration/product/product";

describe("Products is defined", () => {
  const products = new Products();
  it("should be defined", () => {
    expect(products.innerProduct).toBeDefined();
    expect(products.innerProduct).not.toBeUndefined();
  });
  it("should be defined", () => {
    expect(products.buildProductitem).toBeDefined();
    expect(products.buildProductitem).not.toBeUndefined();
  });
});
