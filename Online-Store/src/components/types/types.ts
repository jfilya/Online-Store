import * as noUiSlider from "nouislider";

type LocalStorFunc = (element: string, className: string) => void;

type LocalStorSelect = (sortRule: string, idName: string) => void;

type rangeBuildSliderFunc = (
  sliderName: noUiSlider.target,
  xStart: number,
  yEnd: number,
  xMin: number,
  yMax: number,
  inputs: HTMLDivElement[]
) => void;

export { LocalStorFunc, LocalStorSelect, rangeBuildSliderFunc };
