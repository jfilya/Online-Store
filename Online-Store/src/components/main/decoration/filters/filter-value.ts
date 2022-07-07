class FilterValue {
  public filter: HTMLDivElement;
  constructor() {
    this.filter = document.createElement("div");
  }
  innerFilter(): void {
    (document.querySelector("aside") as HTMLElement).append(this.filter);
    this.filter.className = "filter-value";
    this.filter.innerHTML += `<h4>Фильтры</h4>
    <div class="filter-value__filter">Производитель:
      <div class="filter-value__list">
        <input type="checkbox" class="favorite-input" id="samsung">
          <label for="samsung" class="favorite-icon filter-value__phone">
            <img src="assets/svg/samsung.svg" alt="samsung">
          </label>
        <input type="checkbox" class="favorite-input" id="apple">
          <label for="apple" class="favorite-icon filter-value__phone">
            <img class="favorite-icon" src="assets/svg/apple.svg" alt="apple"> 
          </label>
        <input type="checkbox" class="favorite-input" id="xiaomi">
          <label for="xiaomi" class="favorite-icon filter-value__phone">
            <img src="assets/svg/xiaomi.svg" alt="xiaomi">
          </label>
      </div>
    </div>
    <div class="filter-value__filter">Количество камер:
      <div class="filter-value__list">
        <input type="checkbox" class="favorite-input" id="camera3">
        <label for="camera3" class="favorite-camera filter-value__number-cameras">3</label>
        <input type="checkbox" class="favorite-input" id="camera2">
        <label for="camera2" class="favorite-camera filter-value__number-cameras">2</label>
        <input type="checkbox" class="favorite-input" id="camera1">
        <label for="camera1" class="favorite-camera filter-value__number-cameras">1</label>
      </div>
    </div>
    <div class="filter-value__filter">Цвет:
      <div class="filter-value__list">
        <input type="checkbox" class="favorite-input" id="white">
        <label for="white" class="favorite-label filter-value__color_white"></label>
        <input type="checkbox" class="favorite-input" id="yellow">
        <label for="yellow" class="favorite-label filter-value__color_yellow"></label>
        <input type="checkbox" class="favorite-input" id="red">
        <label for="red" class="favorite-label filter-value__color_red"></label>
        <input type="checkbox" class="favorite-input" id="green">
        <label for="green" class="favorite-label filter-value__color_green"></label>
        <input type="checkbox" class="favorite-input" id="black">
        <label for="black" class="favorite-label filter-value__color_black"></label>
      </div>
    </div>
    <div class="filter-value__filter">Только популярные:
      <div>
        <input type="checkbox" class="favorite-input" id="checkbox">
        <label for="checkbox" class="favorite-label"></label>
      </div>
    </div>`;
  }
}
export default FilterValue;
