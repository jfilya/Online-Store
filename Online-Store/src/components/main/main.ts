import Filter from "./decoration/filters/filter";
import Products from "./decoration/product/product";
import Sort from "./decoration/sort";
class Main {
  private readonly main: HTMLElement;
  private readonly asideValue: HTMLElement;
  private readonly sectionProducts: HTMLElement;
  private readonly filterValue: Filter;
  private readonly products: Products;
  private readonly sort: Sort;
  constructor() {
    this.main = document.createElement("main");
    this.asideValue = document.createElement("aside");
    this.sectionProducts = document.createElement("section");
    this.filterValue = new Filter();
    this.products = new Products();
    this.sort = new Sort();
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
    this.filterValue.localStorageAllFiltersBtn();
  }
  appendSectionProducts(): void {
    this.products.innerProduct();
  }
  activeSectionProducts(): void {
    document.addEventListener("DOMContentLoaded", (): void => {
      (document.querySelector(".search") as HTMLInputElement).focus();
      this.sort.localStorInputValue();
    });
    this.sort.rangeSlider();
    this.sort.searchOninput();
    this.sort.sortAscendingDescendingOnchange();
    this.sort.filterBtnAllClick();
    this.sort.resetFilters();
    this.sort.localStorageFunction();
  }
}

export default Main;
