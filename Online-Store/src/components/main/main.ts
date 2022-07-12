import FilterValue from "./decoration/filters/filter-value";
import Products from "./decoration/product/product";
import { IProducts } from "./decoration/product/product-list";

class Main {
  public main: HTMLElement;
  public asideValue: HTMLElement;
  public sectionProducts: HTMLElement;
  public filterValue: FilterValue;
  public products: Products;
  constructor() {
    this.main = document.createElement("main");
    this.asideValue = document.createElement("aside");
    this.sectionProducts = document.createElement("section");
    this.filterValue = new FilterValue();
    this.products = new Products();
  }
  appendBody(): void {
    document.body.append(this.main);
    this.main.className = "container";
  }
  appendMain(): void {
    this.main.append(this.asideValue);
    this.main.append(this.sectionProducts);
    this.asideValue.className = "filter";
    this.sectionProducts.className = "products";
  }
  appendAsideValue(): void {
    this.filterValue.innerFilter();
    this.filterValue.manufacturer();
    this.filterValue.numberCameras();
    this.filterValue.colorSort();
    this.filterValue.popular();
    this.filterValue.range();
    this.filterValue.search();
    this.filterValue.sort();
    this.filterValue.reset();
  }
  appendSectionProducts(): void {
    this.products.innerProduct();
    document.addEventListener("DOMContentLoaded", () => {
      (document.querySelector(".search") as HTMLInputElement).focus();
    });
  }
  fullnessOfGoods(p: IProducts[]): void {
    this.products.createProductItem(p);
  }
}

export default Main;
