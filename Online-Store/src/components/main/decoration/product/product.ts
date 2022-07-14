import * as noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";
import { IProducts, products } from "./product-list";
import "./product.scss";
class Products {
  public productItem: HTMLDivElement;
  public products: IProducts[];
  private productsNotPopular: IProducts[];
  private productsColorWhite: IProducts[];
  private productsColorPurple: IProducts[];
  private productsColorBlue: IProducts[];
  private productsColorGray: IProducts[];
  private productsColorBlack: IProducts[];
  constructor() {
    this.products = products;
    this.productItem = document.createElement("div");
    this.productsNotPopular = [];
    this.productsColorWhite = [];
    this.productsColorPurple = [];
    this.productsColorBlue = [];
    this.productsColorGray = [];
    this.productsColorBlack = [];
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
      ).innerHTML += `<div id="${prod.id}" class="product__item ${prod.manufacturer}" name-sort="${prod.name}" year-sort="${prod.year}" popular="${prod.popular[0]}">
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
  addCountOfBasket(): void {
    let count = +(
      document.querySelector(".header__basket-amount") as HTMLDivElement
    ).innerHTML;
    (
      document.querySelectorAll(
        ".product__item-btn"
      ) as unknown as HTMLDivElement[]
    ).forEach((element) => {
      element.addEventListener("click", () => {
        if (element.innerHTML == "Добавить в корзину") {
          this.products.forEach((p) => {
            if ((element.parentNode as HTMLDivElement).id === p.id) {
              p.btn = "Удалить";
            }
          });
          element.innerHTML = "Удалить";
          count += 1;
          (
            document.querySelector(".header__basket-amount") as HTMLDivElement
          ).innerHTML = `${count}`;
        } else if (element.innerHTML == "Удалить") {
          this.products.forEach((p) => {
            if ((element.parentNode as HTMLDivElement).id === p.id) {
              p.btn = "Добавить в корзину";
            }
          });
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
      console.log(this.productsNotPopular);
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
        this.filterBtnAll();
        this.searchBoxValue();
        this.outputMessageNotFound();
        this.sortAscendingDescending();
      });
    }
  }
  searchOninput(): void {
    (document.getElementById("search-text") as HTMLInputElement).oninput =
      (): void => {
        this.searchBoxValue();
      };
  }
  searchBoxValue(): void {
    const val = (
      document.getElementById("search-text") as HTMLInputElement
    ).value
      .trim()
      .toLowerCase();
    const elasticItems = document.querySelectorAll(".product__item-title");
    let flag = 0;
    if (val != "") {
      elasticItems.forEach((elem) => {
        if (
          (elem as HTMLHeadElement).innerText.toLowerCase().search(val) == -1
        ) {
          (elem.parentNode as HTMLDivElement).classList.add("not-search-text");
          flag++;
          if (flag === elasticItems.length) {
            (
              document.querySelector(".no-found") as HTMLParagraphElement
            ).style.display = "block";
          }
        } else {
          (elem.parentNode as HTMLDivElement).classList.remove(
            "not-search-text"
          );
          (
            document.querySelector(".no-found") as HTMLParagraphElement
          ).style.display = "none";
        }
      });
    } else {
      elasticItems.forEach((elem) => {
        (elem.parentNode as HTMLDivElement).classList.remove("not-search-text");
        (
          document.querySelector(".no-found") as HTMLParagraphElement
        ).style.display = "none";
      });
    }
  }
  sortAscendingDescendingOnchange(): void {
    (
      document.getElementById(
        "search-ascending-descending"
      ) as HTMLSelectElement
    ).onchange = (): void => {
      this.sortAscendingDescending();
    };
  }
  sortAscendingDescending(): void {
    const elementProducts: HTMLDivElement = document.querySelector(
      ".product"
    ) as HTMLDivElement;
    if (
      (document.getElementById("search-ascending-text") as HTMLOptionElement)
        .selected
    ) {
      for (let i = 0; i < elementProducts.children.length; i++) {
        for (let j = i; j < elementProducts.children.length; j++) {
          {
            if (
              (elementProducts.children[i].getAttribute(
                "name-sort"
              ) as string) >
              (elementProducts.children[j].getAttribute("name-sort") as string)
            ) {
              const replacedNode = elementProducts.replaceChild(
                elementProducts.children[j],
                elementProducts.children[i]
              );
              insertAfter(replacedNode, elementProducts.children[i]);
            }
          }
        }
      }
    } else if (
      (document.getElementById("search-descending-text") as HTMLOptionElement)
        .selected
    ) {
      for (let i = 0; i < elementProducts.children.length; i++) {
        for (let j = i; j < elementProducts.children.length; j++) {
          {
            if (
              (elementProducts.children[i].getAttribute(
                "name-sort"
              ) as string) <
              (elementProducts.children[j].getAttribute("name-sort") as string)
            ) {
              const replacedNode = elementProducts.replaceChild(
                elementProducts.children[j],
                elementProducts.children[i]
              );
              insertAfter(replacedNode, elementProducts.children[i]);
            }
          }
        }
      }
    } else if (
      (document.getElementById("search-ascending-year") as HTMLOptionElement)
        .selected
    ) {
      for (let i = 0; i < elementProducts.children.length; i++) {
        for (let j = i; j < elementProducts.children.length; j++) {
          if (
            +(elementProducts.children[i].getAttribute("year-sort") as string) >
            +(elementProducts.children[j].getAttribute("year-sort") as string)
          ) {
            const replacedNode = elementProducts.replaceChild(
              elementProducts.children[j],
              elementProducts.children[i]
            );
            insertAfter(replacedNode, elementProducts.children[i]);
          }
        }
      }
    } else if (
      (document.getElementById("search-descending-year") as HTMLOptionElement)
        .selected
    ) {
      for (let i = 0; i < elementProducts.children.length; i++) {
        for (let j = i; j < elementProducts.children.length; j++) {
          if (
            +(elementProducts.children[i].getAttribute("year-sort") as string) <
            +(elementProducts.children[j].getAttribute("year-sort") as string)
          ) {
            const replacedNode = elementProducts.replaceChild(
              elementProducts.children[j],
              elementProducts.children[i]
            );
            insertAfter(replacedNode, elementProducts.children[i]);
          }
        }
      }
    }

    function insertAfter(elem: Element, refElem: Element): Element {
      return (refElem.parentNode as HTMLDivElement).insertBefore(
        elem,
        refElem.nextSibling
      );
    }
  }
  filterBtnAll(): IProducts[] {
    const checkboxPupular = document.getElementById(
      "checkbox"
    ) as HTMLDivElement;

    const whiteBtn = document.getElementById("white") as HTMLDivElement;
    const purpleBtn = document.getElementById("purple") as HTMLDivElement;
    const blueBtn = document.getElementById("blue") as HTMLDivElement;
    const grayBtn = document.getElementById("gray") as HTMLDivElement;
    const blackBtn = document.getElementById("black") as HTMLDivElement;

    if (checkboxPupular.classList.contains("active-checkbox")) {
      this.products.forEach((p) => {
        if (p.popular[0] === "нет") {
          this.productsNotPopular.push(p);
        }
      });
      this.products = this.products.filter((p) => p.popular[1]);
    }
    if (!checkboxPupular.classList.contains("active-checkbox")) {
      this.products.push(...this.productsNotPopular);
      this.productsNotPopular.splice(0, this.productsNotPopular.length);
    }

    if (whiteBtn.classList.contains("active-checkbox")) {
      this.products.forEach((p) => {
        if (p.color[1] !== "white") {
          this.productsColorWhite.push(p);
        }
      });
      this.products = this.products.filter((p) => p.color[1] === "white");
    }
    if (!whiteBtn.classList.contains("active-checkbox")) {
      this.products.push(...this.productsColorWhite);
      this.productsColorWhite.splice(0, this.productsColorWhite.length);
    }
    if (purpleBtn.classList.contains("active-checkbox")) {
      this.products.forEach((p) => {
        if (p.color[1] !== "purple") {
          this.productsColorPurple.push(p);
        }
      });
      this.products = this.products.filter((p) => p.color[1] === "purple");
    }
    if (!purpleBtn.classList.contains("active-checkbox")) {
      this.products.push(...this.productsColorPurple);
      this.productsColorPurple.splice(0, this.productsColorPurple.length);
    }
    if (blueBtn.classList.contains("active-checkbox")) {
      this.products.forEach((p) => {
        if (p.color[1] !== "blue") {
          this.productsColorBlue.push(p);
        }
      });
      this.products = this.products.filter((p) => p.color[1] === "blue");
    }
    if (!blueBtn.classList.contains("active-checkbox")) {
      this.products.push(...this.productsColorBlue);
      this.productsColorBlue.splice(0, this.productsColorBlue.length);
    }
    if (grayBtn.classList.contains("active-checkbox")) {
      this.products.forEach((p) => {
        if (p.color[1] !== "gray") {
          this.productsColorGray.push(p);
        }
      });
      this.products = this.products.filter((p) => p.color[1] === "gray");
    }
    if (!grayBtn.classList.contains("active-checkbox")) {
      this.products.push(...this.productsColorGray);
      this.productsColorGray.splice(0, this.productsColorGray.length);
    }
    if (blackBtn.classList.contains("active-checkbox")) {
      this.products.forEach((p) => {
        if (p.color[1] !== "black") {
          this.productsColorBlack.push(p);
        }
      });
      this.products = this.products.filter((p) => p.color[1] === "black");
    }
    if (!blackBtn.classList.contains("active-checkbox")) {
      this.products.push(...this.productsColorBlack);
      this.productsColorBlack.splice(0, this.productsColorBlack.length);
    }

    return this.products;
  }
  filterBtnAllClick(): void {
    const activeBtnFilter = (checkbox: HTMLDivElement) => {
      checkbox.addEventListener("click", () => {
        checkbox.classList.toggle("active-checkbox");
        this.filterBtnAll();
        this.buildProductitem(this.products);
        this.sortAscendingDescending();
      });
    };
    activeBtnFilter(document.getElementById("checkbox") as HTMLDivElement);
    activeBtnFilter(document.getElementById("white") as HTMLDivElement);
    activeBtnFilter(document.getElementById("purple") as HTMLDivElement);
    activeBtnFilter(document.getElementById("blue") as HTMLDivElement);
    activeBtnFilter(document.getElementById("gray") as HTMLDivElement);
    activeBtnFilter(document.getElementById("black") as HTMLDivElement);
  }
  outputMessageNotFound(): void {
    if (
      (document.querySelector(".product") as unknown as HTMLDivElement)
        .childNodes.length === 0
    ) {
      (
        document.querySelector(".no-found") as HTMLParagraphElement
      ).style.display = "block";
    } else {
      (
        document.querySelector(".no-found") as HTMLParagraphElement
      ).style.display = "none";
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
