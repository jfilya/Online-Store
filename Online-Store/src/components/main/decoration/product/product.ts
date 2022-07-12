import { IProducts } from "./product-list";
import "./product.scss";
class Products {
  public productItem: HTMLDivElement;
  constructor() {
    this.productItem = document.createElement("div");
  }
  innerProduct(): void {
    (
      document.querySelector("section") as HTMLElement
    ).innerHTML += `<h4>Товары</h4>`;
    (
      document.querySelector("section") as HTMLElement
    ).innerHTML += `<p class="no-found">Извините, совпадений не обнаружено</p>`;
    (document.querySelector("section") as HTMLElement).append(this.productItem);
    this.productItem.className = "product";
  }
  createProductItem(p: IProducts[]): void {
    (document.querySelector(".product") as HTMLElement).innerHTML = ``;
    for (const prod of p) {
      (
        document.querySelector(".product") as HTMLElement
      ).innerHTML += `<div class="product__item ${prod.manufacturer}" name-sort="${prod.name}" year-sort="${prod.year}">
        <img src="${prod.img}" alt="${prod.name}" class="product__item-image">
        <h5 class="product__item-title">${prod.name}</h5>
        <p>Цена: ${prod.price} руб</p>
        <p>Количество: ${prod.amount}</p>
        <p>Год: ${prod.year}</p>
        <p>Производитель: ${prod.manufacturer}</p>
        <p class="${prod.color[1]}">Цвет: ${prod.color[0]}</p>
        <p>Количество камер: ${prod.numberOfCameras}</p>
        <p>Популярный: ${prod.popular}</p>
        <input id="btn-${prod.id}" type="checkbox" class="btnInput">
        <label for="btn-${prod.id}" class="product__item-btn"></label>
        <img src="./assets/svg/basket.svg" alt="basket" class="product__basket-add">
      </div>`;
    }
  }
}

export default Products;
