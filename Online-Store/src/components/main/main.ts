import Filter from "./decoration/filters/filter";
import Products from "./decoration/product/product";

class Main {
  protected main: HTMLElement;
  protected asideValue: HTMLElement;
  protected sectionProducts: HTMLElement;
  protected filterValue: Filter;
  protected products: Products;
  constructor() {
    this.main = document.createElement("main");
    this.asideValue = document.createElement("aside");
    this.sectionProducts = document.createElement("section");
    this.filterValue = new Filter();
    this.products = new Products();
  }
  public appendBody(): void {
    document.body.append(this.main);
    this.main.className = "container";
  }
  public appendMain(): void {
    this.main.append(this.asideValue);
    this.main.append(this.sectionProducts);
    this.asideValue.className = "filter";
    this.sectionProducts.className = "products";
  }
  public appendAsideValue(): void {
    this.filterValue.innerFilter();
    this.filterValue.manufacturer();
    this.filterValue.numberCameras();
    this.filterValue.colorSort();
    this.filterValue.popular();
    this.filterValue.range();
    this.filterValue.search();
    this.filterValue.sort();
    this.filterValue.reset();
    this.filterValue.localStorageAllFiltersBtn();
    document.addEventListener("DOMContentLoaded", (): void => {
      (document.querySelector(".search") as HTMLInputElement).focus();
    });
  }
  public appendSectionProducts(): void {
    this.products.innerProduct();
  }
  public activeSectionProducts(): void {
    this.products.rangeSlider();
    this.products.searchOninput();
    this.products.sortAscendingDescendingOnchange();
    this.products.filterBtnAllClick();
    this.products.resetFilters();
    this.products.localStorageFunction();
  }
}

export default Main;
