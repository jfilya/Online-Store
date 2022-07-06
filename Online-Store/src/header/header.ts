import "./header.scss";
const page: HTMLBodyElement | null = document.querySelector("body");

export default function Header(): void {
  (page as HTMLBodyElement).innerHTML = `<header class="header">
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
