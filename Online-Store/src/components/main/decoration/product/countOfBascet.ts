type element = (x: HTMLInputElement[], y: HTMLDivElement) => void;

export const addCountOfBasket: element = (x, y) => {
  let count = 0;
  x.forEach((element) => {
    element.onchange = function () {
      if (element.checked) {
        count += 1;
        y.innerHTML = `${count}`;
      } else if (!element.checked) {
        count -= 1;
        y.innerHTML = `${count}`;
      }
    };
  });
};
