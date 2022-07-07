import FilterValue from "./decoration/filters/filter-value";
import "./decoration/filters/filter.scss";
class Main {
  public main: HTMLElement;
  public asideValue: HTMLElement;
  public filterValue: FilterValue;
  constructor() {
    this.main = document.createElement("main");
    this.asideValue = document.createElement("aside");
    this.filterValue = new FilterValue();
  }
  appendBody(): void {
    document.body.append(this.main);
  }
  appendMain(): void {
    this.main.append(this.asideValue);
    this.asideValue.className = "container filter";
    this.filterValue.innerFilter();
  }
}

export default Main;
