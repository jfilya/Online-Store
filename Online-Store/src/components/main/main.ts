class Main {
  public main: HTMLElement;
  constructor() {
    this.main = document.createElement("main");
  }
  appendBody(): void {
    document.body.append(this.main);
  }
}
export default Main;
