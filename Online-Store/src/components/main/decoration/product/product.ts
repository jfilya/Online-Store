import * as noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";
import { IProducts, products } from "./product-list";
import "./product.scss";
class Products {
  public productItem: HTMLDivElement;
  public products: IProducts[];
  constructor() {
    this.products = products;
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
  buildProductitem(p: IProducts[]): void {
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
        <p>Популярный: ${prod.popular[0]}</p>
        <div class="product__item-btn">${prod.btn}</div>
        <img src="./assets/svg/basket.svg" alt="basket" class="product__basket-add">
      </div>`;
      this.addCountOfBasket();
    }
  }
  addCountOfBasket(): void {
    let count = +(
      document.querySelector(".header__basket-amount") as HTMLDivElement
    ).innerHTML;
    (
      document.querySelectorAll(
        ".product__item-btn"
      ) as unknown as HTMLInputElement[]
    ).forEach((element, index) => {
      element.addEventListener("click", () => {
        if (products[index].btn == "Добавить в корзину") {
          products[index].btn = "Удалить";
          element.innerHTML = "Удалить";
          count += 1;
          (
            document.querySelector(".header__basket-amount") as HTMLDivElement
          ).innerHTML = `${count}`;
        } else if (products[index].btn == "Удалить") {
          products[index].btn = "Добавить в корзину";
          element.innerHTML = "Добавить в корзину";
          count -= 1;
          (
            document.querySelector(".header__basket-amount") as HTMLDivElement
          ).innerHTML = `${count}`;
        }
      });
    });
  }
  rangeSlider(
    sliderName: noUiSlider.target,
    x: number,
    y: number,
    inputs: HTMLDivElement[]
  ): void {
    if (sliderName) {
      noUiSlider.create(sliderName, {
        start: [x, y],
        step: 1,
        connect: true,
        range: {
          min: [x],
          max: [y],
        },
      });
      sliderName.noUiSlider.on(
        "update",
        (values, handle: number): string =>
          (inputs[handle].innerText = `${Math.round(+values[handle])}`)
      );
      const sliderValueStart = document.querySelector(
        ".slider-value-start"
      ) as HTMLDivElement;
      const sliderValueEnd = document.querySelector(
        ".slider-value-end"
      ) as HTMLDivElement;
      const sliderYearStart = document.querySelector(
        ".slider-year-start"
      ) as HTMLDivElement;
      const sliderYearEnd = document.querySelector(
        ".slider-year-end"
      ) as HTMLDivElement;
      sliderName.noUiSlider.on("update", () => {
        this.buildProductitem(
          this.products.filter(
            (p: IProducts) =>
              p.amount >= +sliderValueStart.innerText &&
              p.amount <= +sliderValueEnd.innerText &&
              p.year >= +sliderYearStart.innerText &&
              p.year <= +sliderYearEnd.innerText
          )
        );
      });
    }
  }
}

export default Products;

function rangeBuild(): void {
  new Products().rangeSlider(
    document.querySelector(".slider-value") as noUiSlider.target,
    1,
    10,
    [
      document.querySelector(".slider-value-start") as HTMLDivElement,
      document.querySelector(".slider-value-end") as HTMLDivElement,
    ]
  );
  new Products().rangeSlider(
    document.querySelector(".slider-year") as noUiSlider.target,
    2017,
    2022,
    [
      document.querySelector(".slider-year-start") as HTMLDivElement,
      document.querySelector(".slider-year-end") as HTMLDivElement,
    ]
  );
}

export { rangeBuild, noUiSlider };
