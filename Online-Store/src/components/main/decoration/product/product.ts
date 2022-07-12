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
    (document.querySelector("section") as HTMLElement).append(this.productItem);
    this.productItem.className = "product";
  }
  createProductItem(p: IProducts[]): void {
    (document.querySelector(".product") as HTMLElement).innerHTML = ``;
    for (const prod of p) {
      const product: HTMLDivElement = document.createElement("div");
      (document.querySelector(".product") as HTMLElement).append(product);
      product.className = `product__item ${prod.manufacturer}`;
      product.setAttribute("name-sort", prod.name);
      product.setAttribute("year-sort", `${prod.year}`);

      const img: HTMLImageElement = document.createElement("img");
      img.src = prod.img;
      img.alt = prod.name;
      product.append(img);
      img.className = "product__item-image";

      const h: HTMLHeadingElement = document.createElement("h5");
      h.innerHTML = prod.name;
      product.append(h);
      h.className = "product__item-title";

      const price: HTMLParagraphElement = document.createElement("p");
      price.innerHTML = `Цена: ${prod.price} руб`;
      product.append(price);

      const amount: HTMLParagraphElement = document.createElement("p");
      amount.innerHTML = `Количество: ${prod.amount}`;
      product.append(amount);

      const year: HTMLParagraphElement = document.createElement("p");
      year.innerHTML = `Год: ${prod.year}`;
      product.append(year);

      const manufacturer: HTMLParagraphElement = document.createElement("p");
      manufacturer.innerHTML = `Производитель: ${prod.manufacturer}`;
      product.append(manufacturer);

      const color: HTMLParagraphElement = document.createElement("p");
      color.innerHTML = `Цвет: ${prod.color[0]}`;
      color.className = `${prod.color[1]}`;
      product.append(color);

      const numberOfCameras: HTMLParagraphElement = document.createElement("p");
      numberOfCameras.innerHTML = `Количество камер: ${prod.numberOfCameras}`;
      product.append(numberOfCameras);

      const popular: HTMLParagraphElement = document.createElement("p");
      if (prod.popular) {
        popular.innerHTML = `Популярный: да`;
      }
      if (!prod.popular) {
        popular.innerHTML = `Популярный: нет`;
      }
      product.append(popular);

      const btn: HTMLLabelElement = document.createElement("label");
      const btnInput: HTMLInputElement = document.createElement("input");
      btn.setAttribute("for", `btn-${prod.id}`);
      btnInput.id = `btn-${prod.id}`;
      btnInput.type = "checkbox";
      btnInput.className = "btnInput";
      product.append(btnInput);
      product.append(btn);
      btn.className = `product__item-btn`;

      const basketItem: HTMLImageElement = document.createElement("img");
      basketItem.src = "./assets/svg/basket.svg";
      basketItem.alt = "basket";
      product.append(basketItem);
      basketItem.className = "product__basket-add";
    }
  }
}

export default Products;
