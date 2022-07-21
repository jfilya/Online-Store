import Filter from "./decoration/filters/filter";
import Products from "./decoration/product/product";
import Sort from "./decoration/sort";
class Main {
  protected main: HTMLElement;
  protected asideValue: HTMLElement;
  protected sectionProducts: HTMLElement;
  protected filterValue: Filter;
  protected products: Products;
  protected sort: Sort;
  constructor() {
    this.main = document.createElement("main");
    this.asideValue = document.createElement("aside");
    this.sectionProducts = document.createElement("section");
    this.filterValue = new Filter();
    this.products = new Products();
    this.sort = new Sort();
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
  }
  public appendSectionProducts(): void {
    this.products.innerProduct();
  }
  public activeSectionProducts(): void {
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
