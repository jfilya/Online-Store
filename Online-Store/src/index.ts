import "./style.scss";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Main from "./components/main/main";
import * as range from "./components/main/decoration/filters/filter-value";

const header = new Header();
header.innerHeader();
const main = new Main();
main.appendBody();
main.appendMain();
const footer = new Footer();
footer.innerFooter();
range.rangeBuild();
