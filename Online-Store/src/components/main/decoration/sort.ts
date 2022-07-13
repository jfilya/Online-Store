class Sort {
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
  searchBox(): void {
    (document.getElementById("search-text") as HTMLInputElement).oninput =
      (): void => {
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
              (elem as HTMLHeadElement).innerText.toLowerCase().search(val) ==
              -1
            ) {
              (elem.parentNode as HTMLDivElement).style.display = "none";
              flag++;
              if (flag === elasticItems.length) {
                (
                  document.querySelector(".no-found") as HTMLParagraphElement
                ).style.display = "block";
              }
            } else {
              (elem.parentNode as HTMLDivElement).style.display = "block";
              (
                document.querySelector(".no-found") as HTMLParagraphElement
              ).style.display = "none";
            }
          });
        } else {
          elasticItems.forEach((elem) => {
            (elem.parentNode as HTMLDivElement).style.display = "block";
            (
              document.querySelector(".no-found") as HTMLParagraphElement
            ).style.display = "none";
          });
        }
      };
  }
}

export default Sort;
