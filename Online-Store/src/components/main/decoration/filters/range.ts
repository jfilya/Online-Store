import * as noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";

export function rangeSlider(): void {
  const sliderValue = document.querySelector(
    ".slider-value"
  ) as noUiSlider.target;
  const sliderYear = document.querySelector(
    ".slider-year"
  ) as noUiSlider.target;

  if (sliderValue) {
    noUiSlider.create(sliderValue, {
      start: [1, 10],
      step: 1,
      connect: true,
      range: {
        min: [1],
        max: [10],
      },
    });
    const inputsValue: HTMLDivElement[] = [
      document.querySelector(".slider-value-start") as HTMLDivElement,
      document.querySelector(".slider-value-end") as HTMLDivElement,
    ];
    sliderValue.noUiSlider.on(
      "update",
      (values, handle: number): string =>
        (inputsValue[handle].innerText = `${Math.round(+values[handle])}`)
    );
  }

  if (sliderYear) {
    noUiSlider.create(sliderYear, {
      start: [2017, 2022],
      connect: true,
      step: 1,
      range: {
        min: [2017],
        max: [2022],
      },
    });
    const inputsYear: HTMLDivElement[] = [
      document.querySelector(".slider-year-start") as HTMLDivElement,
      document.querySelector(".slider-year-end") as HTMLDivElement,
    ];
    sliderYear.noUiSlider.on(
      "update",
      (values, handle: number): string =>
        (inputsYear[handle].innerText = `${Math.round(+values[handle])}`)
    );
  }
}
rangeSlider();
