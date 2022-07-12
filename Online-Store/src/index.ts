import "./style.scss";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Main from "./components/main/main";
import * as range from "./components/main/decoration/filters/filter-value";
import Sort from "./components/main/decoration/sort";
import { products } from "./components/main/decoration/product/product-list";
const header = new Header();
header.innerHeader();
const main = new Main();
main.appendBody();
main.appendMain();
main.appendAsideValue();
main.appendSectionProducts();
main.fullnessOfGoods(products);
const footer = new Footer();
footer.innerFooter();
range.rangeBuild();

const sort = new Sort();

const btnsAdd = document.querySelectorAll(
  ".btnInput"
) as unknown as HTMLInputElement[];
const countOfBasket = document.querySelector(
  ".header__basket-amount"
) as HTMLDivElement;

sort.addCountOfBasket(btnsAdd, countOfBasket);
sort.sortAscendingDescending();
