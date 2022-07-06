import "./footer.scss";

class Footer {
  public page: HTMLBodyElement;
  constructor() {
    this.page = document.querySelector("body") as HTMLBodyElement;
  }
  public innerFooter(): void {
    this.page.innerHTML += `    <footer class="footer">
    <div class="footer__container container">
      <a target="_blank" href="https://github.com/jfilya">
         <img src="assets/svg/gitHub.svg" alt="GitHub">
      </a>
      <p>2022</p>
      <a target="_blank" href="https://rs.school/js/">
        <img src="assets/svg/logoSchool.svg" alt="LogoSchool">
      </a>
    </div>
  </footer>`;
  }
}
export default Footer;
