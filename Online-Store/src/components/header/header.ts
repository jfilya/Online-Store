import "./header.scss";

class Header {
  page: HTMLBodyElement;
  constructor() {
    this.page = document.querySelector("body") as HTMLBodyElement;
  }
  innerHeader(): void {
    this.page.innerHTML += `<header class="header">
    <nav class="header__container container">
      <div class="header__logo">
        <img src="assets/svg/phone.svg" alt="phone">
        <strong>Online Store</strong>
      </div>
      <div class="header__basket">
        <img src="assets/svg/basket.svg" alt="basket">
        <div id="basket-amount" class="header__basket-amount">0</div>
      </div>
    </nav>
  </header>`;
  }
}
export default Header;
