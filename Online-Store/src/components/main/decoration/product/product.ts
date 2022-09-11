import IProducts from "../../../types/interface";
import { products } from "./product-list";
import "./product.scss";
class Products {
  protected products: IProducts[];
  private localArray: string[];
  count: number;
  constructor() {
    this.products = products;
    this.localArray = [];
    this.count = 0;
  }
  innerProduct(): void {
    const productItem = document.createElement("div");
    (
      document.querySelector("section") as HTMLElement
    ).innerHTML += `<h4>Товары</h4>`;
    (
      document.querySelector("section") as HTMLElement
    ).innerHTML += `<p class="no-found">Извините, совпадений не обнаружено</p>`;
    (document.querySelector("section") as HTMLElement).append(productItem);
    productItem.className = "product";
  }
  buildProductitem(p: IProducts[]): void {
    (document.querySelector(".product") as HTMLElement).innerHTML = ``;
    for (const prod of p) {
      (
        document.querySelector(".product") as HTMLElement
      ).innerHTML += `<div id="${prod.id}" class="product__item ${prod.manufacturer}" name-sort="${prod.name}" year-sort="${prod.year}" popular="${prod.popular[0]}" cameras="${prod.numberOfCameras}">
        <img src="${prod.img}" alt="${prod.name}" class="product__item-image">
        <h5 class="product__item-title">${prod.name}</h5>
        <p>Цена: ${prod.price} руб</p>
        <p>Количество: ${prod.amount}</p>
        <p>Год: ${prod.year}</p>
        <p>Производитель: ${prod.manufacturer}</p>
        <p class="${prod.color[1]}">Цвет: ${prod.color[0]}</p>
        <p>Количество камер: ${prod.numberOfCameras}</p>
        <p>Популярный: ${prod.popular[0]}</p>
        <div class="product__item-btn">${prod.btn}</div>
      </div>`;
    }
    this.addCountOfBasket();
  }
  private amountProductsInBasket(): void {
    const basketAmount = document.querySelector(
      ".header__basket-amount"
    ) as HTMLDivElement;
    if (localStorage.getItem("count") !== "0") {
      this.count = +(localStorage.getItem("count") as string);
      basketAmount.innerHTML = String(this.count);
    } else this.count = +basketAmount.innerHTML;
    const array = JSON.parse(localStorage.getItem("localArray") as string) as {
      [key: string]: string;
    };
    products.forEach((p) => {
      for (const a in array) {
        if (array[a] === p.id) {
          p.btn = "Удалить";
        }
      }
    });
  }
  private addCountOfBasket(): void {
    this.amountProductsInBasket();
    const productItem = document.querySelectorAll(
      ".product__item-btn"
    ) as unknown as HTMLDivElement[];
    productItem.forEach((element) => {
      if (element.innerHTML == "Добавить в корзину") {
        (element.parentNode as HTMLDivElement).classList.remove(
          "active-before"
        );
        products.forEach((p) => {
          if ((element.parentNode as HTMLDivElement).id === p.id) {
            this.localArray = this.localArray.filter((f) => f !== p.id);
            localStorage.setItem("localArray", JSON.stringify(this.localArray));
          }
        });
      }
      if (element.innerHTML == "Удалить") {
        (element.parentNode as HTMLDivElement).classList.add("active-before");
        products.forEach((p) => {
          if ((element.parentNode as HTMLDivElement).id === p.id) {
            this.localArray.push(p.id);
            localStorage.setItem(
              "localArray",
              JSON.stringify([...new Set(this.localArray)])
            );
          }
        });
      }
      this.addCountForClickBtn(element);
    });
  }
  private addCountForClickBtn(element: HTMLDivElement): void {
    element.addEventListener("click", () => {
      if (element.innerHTML == "Добавить в корзину") {
        if (this.count == 20) alert("Извините, все слоты заполнены");
        if (this.count < 20) {
          products.forEach((p) => {
            if ((element.parentNode as HTMLDivElement).id === p.id) {
              p.btn = "Удалить";
              this.localArray.push(p.id);
              localStorage.setItem(
                "localArray",
                JSON.stringify(this.localArray)
              );
            }
          });
          element.innerHTML = "Удалить";
          (element.parentNode as HTMLDivElement).classList.add("active-before");
          this.count += 1;
          localStorage.setItem("count", `${this.count}`);
          (
            document.querySelector(".header__basket-amount") as HTMLDivElement
          ).innerHTML = `${this.count}`;
        }
      } else if (element.innerHTML == "Удалить") {
        products.forEach((p) => {
          if ((element.parentNode as HTMLDivElement).id === p.id) {
            p.btn = "Добавить в корзину";
            this.localArray = this.localArray.filter((f) => f !== p.id);
            localStorage.setItem("localArray", JSON.stringify(this.localArray));
          }
        });
        element.innerHTML = "Добавить в корзину";
        (element.parentNode as HTMLDivElement).classList.remove(
          "active-before"
        );
        this.count -= 1;
        localStorage.setItem("count", `${this.count}`);
        (
          document.querySelector(".header__basket-amount") as HTMLDivElement
        ).innerHTML = `${this.count}`;
      }
    });
  }
}

export default Products;
