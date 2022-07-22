import Products from "./product/product";
import {
  ClassNameActive,
  Color,
  Manufacturer,
  NumberOfCameras,
  sortAscendDescend,
} from "../../types/enums";
import * as noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";
import { products } from "./product/product-list";
import IProducts from "../../types/interface";
import { rangeBuildSliderFunc } from "../../types/types";

class Sort extends Products {
  private workArray: IProducts[];
  private productsPopular: IProducts[];
  private productsManufacturer: IProducts[];
  private productsColors: IProducts[];
  private productsFilters: IProducts[];
  private productsCameras: IProducts[];
  constructor() {
    super();
    this.workArray = products;
    this.productsPopular = [];
    this.productsManufacturer = [];
    this.productsColors = [];
    this.productsFilters = [];
    this.productsCameras = [];
  }
  rangeSlider(): void {
    let xStartValue, yEndValue, xStartYear, yEndYear;
    if (!localStorage.getItem("sliderValue")) {
      xStartValue = 1;
      yEndValue = 10;
    }
    if (localStorage.getItem("sliderValue")) {
      xStartValue = +(localStorage.getItem("sliderValue") as string).split(
        ","
      )[0];
      yEndValue = +(localStorage.getItem("sliderValue") as string).split(
        ","
      )[1];
    }
    if (!localStorage.getItem("sliderYear")) {
      xStartYear = 2017;
      yEndYear = 2022;
    }
    if (localStorage.getItem("sliderYear")) {
      xStartYear = +(localStorage.getItem("sliderYear") as string).split(
        ","
      )[0];
      yEndYear = +(localStorage.getItem("sliderYear") as string).split(",")[1];
    }

    const rangeBuildSlider: rangeBuildSliderFunc = (
      sliderName,
      xStart,
      yEnd,
      xMin,
      yMax,
      inputs
    ) => {
      if (sliderName) {
        noUiSlider.create(sliderName, {
          start: [xStart, yEnd],
          step: 1,
          connect: true,
          range: {
            min: [xMin],
            max: [yMax],
          },
        });
        sliderName.noUiSlider.on(
          "update",
          (values: (string | number)[], handle: number): void => {
            inputs[handle].innerText = `${Math.round(+values[handle])}`;
          }
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
          this.filterBtnAll();
          this.buildProductitem(
            this.products.filter(
              (p: IProducts) =>
                p.amount >= +sliderValueStart.innerText &&
                p.amount <= +sliderValueEnd.innerText &&
                p.year >= +sliderYearStart.innerText &&
                p.year <= +sliderYearEnd.innerText
            )
          );
          localStorage.setItem(
            "sliderYear",
            `${sliderYearStart.innerText + "," + sliderYearEnd.innerText}`
          );
          localStorage.setItem(
            "sliderValue",
            `${sliderValueStart.innerText + "," + sliderValueEnd.innerText}`
          );
          this.searchBoxValue();
          this.outputMessageNotFound();
          this.sortAscendingDescending();
        });
      }
    };
    rangeBuildSlider(
      document.querySelector(".slider-value") as noUiSlider.target,
      xStartValue as number,
      yEndValue as number,
      1,
      10,
      [
        document.querySelector(".slider-value-start") as HTMLDivElement,
        document.querySelector(".slider-value-end") as HTMLDivElement,
      ]
    );
    rangeBuildSlider(
      document.querySelector(".slider-year") as noUiSlider.target,
      xStartYear as number,
      yEndYear as number,
      2017,
      2022,
      [
        document.querySelector(".slider-year-start") as HTMLDivElement,
        document.querySelector(".slider-year-end") as HTMLDivElement,
      ]
    );
  }
  searchOninput(): void {
    (document.getElementById("search-text") as HTMLInputElement).oninput =
      (): void => {
        localStorage.setItem(
          "search-text",
          (document.getElementById("search-text") as HTMLInputElement).value
        );
        this.searchBoxValue();
      };
  }
  private searchBoxValue(): void {
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
  private sortAscendingDescending(): void {
    const elementProducts: HTMLDivElement = document.querySelector(
      ".product"
    ) as HTMLDivElement;
    if (
      (document.getElementById("search-ascending-text") as HTMLOptionElement)
        .selected
    ) {
      localStorage.setItem("sortAscendDescend", sortAscendDescend.AZ);
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
      localStorage.setItem("sortAscendDescend", sortAscendDescend.ZA);
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
      localStorage.setItem("sortAscendDescend", sortAscendDescend.min);
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
      localStorage.setItem("sortAscendDescend", sortAscendDescend.max);
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
  private filterBtnAll(): IProducts[] {
    const checkboxPupular = document.getElementById(
      "checkbox"
    ) as HTMLDivElement;

    const whiteBtn = document.getElementById("white") as HTMLDivElement;
    const purpleBtn = document.getElementById("purple") as HTMLDivElement;
    const blueBtn = document.getElementById("blue") as HTMLDivElement;
    const blackBtn = document.getElementById("black") as HTMLDivElement;

    const samsung = document.getElementById("samsung") as HTMLDivElement;
    const apple = document.getElementById("apple") as HTMLDivElement;
    const xiaomi = document.getElementById("xiaomi") as HTMLDivElement;

    const camera1 = document.getElementById("camera1") as HTMLDivElement;
    const camera2 = document.getElementById("camera2") as HTMLDivElement;
    const camera3 = document.getElementById("camera3") as HTMLDivElement;

    if (checkboxPupular.classList.contains(ClassNameActive.activeCheckbox)) {
      this.productsPopular = this.workArray.filter((p) => p.popular[1]);
      localStorage.setItem("popular", "popular");
    }
    if (!checkboxPupular.classList.contains(ClassNameActive.activeCheckbox)) {
      this.productsPopular = this.workArray;
      localStorage.removeItem("popular");
    }
    if (this.productsPopular.length === 0) {
      this.productsPopular = this.workArray;
    }

    const selectColor = (): void => {
      if (whiteBtn.classList.contains(ClassNameActive.activeCheckbox)) {
        this.productsColors = this.productsColors.filter(
          (p) => p.color[1] !== Color.white
        );
        this.productsColors.push(
          ...this.workArray.filter((p) => p.color[1] === Color.white)
        );
        localStorage.setItem(Color.white, Color.white);
      }
      if (!whiteBtn.classList.contains(ClassNameActive.activeCheckbox)) {
        this.productsColors = this.productsColors.filter(
          (p) => p.color[1] !== Color.white
        );
        localStorage.removeItem(Color.white);
      }

      if (purpleBtn.classList.contains(ClassNameActive.activeCheckbox)) {
        this.productsColors = this.productsColors.filter(
          (p) => p.color[1] !== Color.purple
        );
        this.productsColors.push(
          ...this.workArray.filter((p) => p.color[1] === Color.purple)
        );
        localStorage.setItem(Color.purple, Color.purple);
      }
      if (!purpleBtn.classList.contains(ClassNameActive.activeCheckbox)) {
        this.productsColors = this.productsColors.filter(
          (p) => p.color[1] !== Color.purple
        );
        localStorage.removeItem(Color.purple);
      }

      if (blueBtn.classList.contains(ClassNameActive.activeCheckbox)) {
        this.productsColors = this.productsColors.filter(
          (p) => p.color[1] !== Color.blue
        );
        this.productsColors.push(
          ...this.workArray.filter((p) => p.color[1] === Color.blue)
        );
        localStorage.setItem(Color.blue, Color.blue);
      }
      if (!blueBtn.classList.contains(ClassNameActive.activeCheckbox)) {
        this.productsColors = this.productsColors.filter(
          (p) => p.color[1] !== Color.blue
        );
        localStorage.removeItem(Color.blue);
      }

      if (blackBtn.classList.contains(ClassNameActive.activeCheckbox)) {
        this.productsColors = this.productsColors.filter(
          (p) => p.color[1] !== Color.black
        );
        this.productsColors.push(
          ...this.workArray.filter((p) => p.color[1] === Color.black)
        );
        localStorage.setItem(Color.black, Color.black);
      }
      if (!blackBtn.classList.contains(ClassNameActive.activeCheckbox)) {
        this.productsColors = this.productsColors.filter(
          (p) => p.color[1] !== Color.black
        );
        localStorage.removeItem(Color.black);
      }
      if (this.productsColors.length === 0) {
        this.productsColors = this.workArray;
      }
    };
    selectColor();

    const selectManufacturer = (): void => {
      if (xiaomi.classList.contains(ClassNameActive.activeIcon)) {
        this.productsManufacturer = this.productsManufacturer.filter(
          (p) => p.manufacturer !== Manufacturer.xiaomi
        );
        this.productsManufacturer.push(
          ...this.workArray.filter(
            (p) => p.manufacturer === Manufacturer.xiaomi
          )
        );
        localStorage.setItem(Manufacturer.xiaomi, Manufacturer.xiaomi);
      }
      if (!xiaomi.classList.contains(ClassNameActive.activeIcon)) {
        this.productsManufacturer = this.productsManufacturer.filter(
          (p) => p.manufacturer !== Manufacturer.xiaomi
        );
        localStorage.removeItem(Manufacturer.xiaomi);
      }
      if (apple.classList.contains(ClassNameActive.activeIcon)) {
        this.productsManufacturer = this.productsManufacturer.filter(
          (p) => p.manufacturer !== Manufacturer.apple
        );
        this.productsManufacturer.push(
          ...this.workArray.filter((p) => p.manufacturer === Manufacturer.apple)
        );
        localStorage.setItem(Manufacturer.apple, Manufacturer.apple);
      }
      if (!apple.classList.contains(ClassNameActive.activeIcon)) {
        this.productsManufacturer = this.productsManufacturer.filter(
          (p) => p.manufacturer !== Manufacturer.apple
        );
        localStorage.removeItem(Manufacturer.apple);
      }
      if (samsung.classList.contains(ClassNameActive.activeIcon)) {
        this.productsManufacturer = this.productsManufacturer.filter(
          (p) => p.manufacturer !== Manufacturer.samsung
        );
        this.productsManufacturer.push(
          ...this.workArray.filter(
            (p) => p.manufacturer === Manufacturer.samsung
          )
        );
        localStorage.setItem(Manufacturer.samsung, Manufacturer.samsung);
      }
      if (!samsung.classList.contains(ClassNameActive.activeIcon)) {
        this.productsManufacturer = this.productsManufacturer.filter(
          (p) => p.manufacturer !== Manufacturer.samsung
        );
        localStorage.removeItem(Manufacturer.samsung);
      }
      if (this.productsManufacturer.length === 0) {
        this.productsManufacturer = this.workArray;
      }
    };
    selectManufacturer();

    const selectCameras = (): void => {
      if (camera1.classList.contains(ClassNameActive.activeIcon)) {
        this.productsCameras = this.productsCameras.filter(
          (p) => p.numberOfCameras !== 1
        );
        this.productsCameras.push(
          ...this.workArray.filter((p) => p.numberOfCameras === 1)
        );
        localStorage.setItem(NumberOfCameras.camera1, NumberOfCameras.camera1);
      }
      if (!camera1.classList.contains(ClassNameActive.activeIcon)) {
        this.productsCameras = this.productsCameras.filter(
          (p) => p.numberOfCameras !== 1
        );
        localStorage.removeItem(NumberOfCameras.camera1);
      }
      if (camera2.classList.contains(ClassNameActive.activeIcon)) {
        this.productsCameras = this.productsCameras.filter(
          (p) => p.numberOfCameras !== 2
        );
        this.productsCameras.push(
          ...this.workArray.filter((p) => p.numberOfCameras === 2)
        );
        localStorage.setItem(NumberOfCameras.camera2, NumberOfCameras.camera2);
      }
      if (!camera2.classList.contains(ClassNameActive.activeIcon)) {
        this.productsCameras = this.productsCameras.filter(
          (p) => p.numberOfCameras !== 2
        );
        localStorage.removeItem(NumberOfCameras.camera2);
      }
      if (camera3.classList.contains(ClassNameActive.activeIcon)) {
        this.productsCameras = this.productsCameras.filter(
          (p) => p.numberOfCameras !== 3
        );
        this.productsCameras.push(
          ...this.workArray.filter((p) => p.numberOfCameras === 3)
        );
        localStorage.setItem(NumberOfCameras.camera3, NumberOfCameras.camera3);
      }
      if (!camera3.classList.contains(ClassNameActive.activeIcon)) {
        this.productsCameras = this.productsCameras.filter(
          (p) => p.numberOfCameras !== 3
        );
        localStorage.removeItem(NumberOfCameras.camera3);
      }
      if (this.productsCameras.length === 0) {
        this.productsCameras = this.workArray;
      }
    };
    selectCameras();

    this.productsFilters.splice(0, this.productsFilters.length);
    this.productsCameras.forEach((camera) => {
      this.productsManufacturer.forEach((m) => {
        this.productsPopular.forEach((p) => {
          this.productsColors.forEach((color) => {
            if (
              camera.id === m.id &&
              camera.id === p.id &&
              camera.id === color.id
            ) {
              this.productsFilters.push(camera);
            }
          });
        });
      });
    }) as unknown as IProducts[];

    return (this.products = this.productsFilters);
  }
  filterBtnAllClick(): void {
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
    const activeBtnFilter = (
      checkbox: HTMLDivElement,
      nameClassAdd: string
    ) => {
      checkbox.addEventListener("click", () => {
        checkbox.classList.toggle(nameClassAdd);
        this.filterBtnAll();
        this.buildProductitem(
          this.products.filter(
            (p: IProducts) =>
              p.amount >= +sliderValueStart.innerText &&
              p.amount <= +sliderValueEnd.innerText &&
              p.year >= +sliderYearStart.innerText &&
              p.year <= +sliderYearEnd.innerText
          )
        );
        this.sortAscendingDescending();
        this.outputMessageNotFound();
        this.searchBoxValue();
      });
    };
    activeBtnFilter(
      document.getElementById("checkbox") as HTMLDivElement,
      "active-checkbox"
    );

    activeBtnFilter(
      document.getElementById("white") as HTMLDivElement,
      "active-checkbox"
    );
    activeBtnFilter(
      document.getElementById("purple") as HTMLDivElement,
      "active-checkbox"
    );
    activeBtnFilter(
      document.getElementById("blue") as HTMLDivElement,
      "active-checkbox"
    );
    activeBtnFilter(
      document.getElementById("black") as HTMLDivElement,
      "active-checkbox"
    );

    activeBtnFilter(
      document.getElementById("samsung") as HTMLDivElement,
      "active-icon"
    );
    activeBtnFilter(
      document.getElementById("apple") as HTMLDivElement,
      "active-icon"
    );
    activeBtnFilter(
      document.getElementById("xiaomi") as HTMLDivElement,
      "active-icon"
    );
    activeBtnFilter(
      document.getElementById("camera1") as HTMLDivElement,
      "active-icon"
    );
    activeBtnFilter(
      document.getElementById("camera2") as HTMLDivElement,
      "active-icon"
    );
    activeBtnFilter(
      document.getElementById("camera3") as HTMLDivElement,
      "active-icon"
    );
  }
  private outputMessageNotFound(): void {
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
  localStorageFunction(): void {
    (
      document.getElementById("reset-settings") as HTMLButtonElement
    ).addEventListener("click", (): void => {
      localStorage.clear();
      location.reload();
    });
  }
  resetFilters(): void {
    (
      document.getElementById("reset-filters") as HTMLButtonElement
    ).addEventListener("click", () => {
      const checkboxPupular = document.getElementById(
        "checkbox"
      ) as HTMLDivElement;
      const whiteBtn = document.getElementById("white") as HTMLDivElement;
      const purpleBtn = document.getElementById("purple") as HTMLDivElement;
      const blueBtn = document.getElementById("blue") as HTMLDivElement;
      const blackBtn = document.getElementById("black") as HTMLDivElement;
      const samsung = document.getElementById("samsung") as HTMLDivElement;
      const apple = document.getElementById("apple") as HTMLDivElement;
      const xiaomi = document.getElementById("xiaomi") as HTMLDivElement;
      const camera1 = document.getElementById("camera1") as HTMLDivElement;
      const camera2 = document.getElementById("camera2") as HTMLDivElement;
      const camera3 = document.getElementById("camera3") as HTMLDivElement;
      const arrayFiltersCheckbox: HTMLDivElement[] = [
        checkboxPupular,
        whiteBtn,
        purpleBtn,
        blueBtn,
        blackBtn,
      ];
      const arrayFiltersIcon: HTMLDivElement[] = [
        samsung,
        apple,
        xiaomi,
        camera1,
        camera2,
        camera3,
      ];
      arrayFiltersCheckbox.forEach((element) =>
        element.classList.remove("active-checkbox")
      );
      arrayFiltersIcon.forEach((element) =>
        element.classList.remove("active-icon")
      );
      (
        document.querySelector(".no-found") as HTMLParagraphElement
      ).style.display = "none";
      (document.getElementById("search-text") as HTMLInputElement).value = "";

      (
        document.querySelector(".slider-value") as noUiSlider.target
      ).noUiSlider.set([1, 10]);
      (
        document.querySelector(".slider-year") as noUiSlider.target
      ).noUiSlider.set([2017, 2022]);
      this.buildProductitem(this.workArray);
      (
        document.querySelectorAll("option") as unknown as HTMLOptionElement[]
      )[0].selected = true;
      this.sortAscendingDescending();
    });
  }
  localStorInputValue(): void {
    if (localStorage.getItem("search-text")) {
      (document.getElementById("search-text") as HTMLInputElement).value =
        localStorage.getItem("search-text") as string;
    }
    this.searchBoxValue();
  }
}
export default Sort;
