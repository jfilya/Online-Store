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
        this.searchBoxValue();
        this.sortAscendingDescending();
        this.onlyPopular();
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
  onlyPopular(): void {
    const checkboxPupular = document.getElementById(
      "checkbox"
    ) as HTMLDivElement;
    const productsItemPopular = document.querySelectorAll(
      ".product__item"
    ) as unknown as HTMLDivElement[];

    if (checkboxPupular.classList.contains("active-checkbox")) {
      productsItemPopular.forEach((popular) => {
        if (popular.getAttribute("popular") === "нет") {
          popular.classList.add("not-popular");
        }
      });
    } else if (!checkboxPupular.classList.contains("active-checkbox")) {
      productsItemPopular.forEach((popular) => {
        popular.classList.remove("not-popular");
      });
    }
  }
  onlyPopularClick(): void {
    const checkboxPupular = document.getElementById(
      "checkbox"
    ) as HTMLDivElement;
    checkboxPupular.addEventListener("click", () => {
      checkboxPupular.classList.toggle("active-checkbox");
      this.onlyPopular();
    });
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
