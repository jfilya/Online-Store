type element = (x: HTMLInputElement[], y: HTMLDivElement) => void;

class Sort {
  addCountOfBasket: element = (x, y) => {
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
  sortAscendingDescending(): void {
    const elementProducts: HTMLDivElement = document.querySelector(
      ".product"
    ) as HTMLDivElement;
    (
      document.getElementById(
        "search-ascending-descending"
      ) as HTMLSelectElement
    ).onchange = (): void => {
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
                (elementProducts.children[j].getAttribute(
                  "name-sort"
                ) as string)
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
                (elementProducts.children[j].getAttribute(
                  "name-sort"
                ) as string)
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
              +(elementProducts.children[i].getAttribute(
                "year-sort"
              ) as string) >
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
              +(elementProducts.children[i].getAttribute(
                "year-sort"
              ) as string) <
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
    };
    function insertAfter(elem: Element, refElem: Element): Element {
      return (refElem.parentNode as HTMLDivElement).insertBefore(
        elem,
        refElem.nextSibling
      );
    }
  }
}

export default Sort;
