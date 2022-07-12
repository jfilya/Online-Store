import "./filter.scss";
class FilterValue {
  public filter: HTMLDivElement;
  constructor() {
    this.filter = document.createElement("div");
  }
  innerFilter(): void {
    (document.querySelector("aside") as HTMLElement).innerHTML = ``;
    (document.querySelector("aside") as HTMLElement).append(this.filter);
    this.filter.className = "filter-value";
    this.filter.innerHTML = `<h4>Фильтры</h4>`;
  }
  manufacturer(): void {
    this.filter.innerHTML += `<div class="filter-value__filter">Производитель:
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
    </div>`;
  }
  numberCameras(): void {
    this.filter.innerHTML += `<div class="filter-value__filter">Количество камер:
    <div class="filter-value__list">
      <input type="checkbox" class="favorite-input" id="camera4">
      <label for="camera4" class="favorite-camera filter-value__number-cameras">4</label>
      <input type="checkbox" class="favorite-input" id="camera3">
      <label for="camera3" class="favorite-camera filter-value__number-cameras">3</label>
      <input type="checkbox" class="favorite-input" id="camera2">
      <label for="camera2" class="favorite-camera filter-value__number-cameras">2</label>
      <input type="checkbox" class="favorite-input" id="camera1">
      <label for="camera1" class="favorite-camera filter-value__number-cameras">1</label>
    </div>
  </div>`;
  }
  colorSort(): void {
    this.filter.innerHTML += `<div class="filter-value__filter">Цвет:
      <div class="filter-value__list">
        <input type="checkbox" class="favorite-input" id="white">
        <label for="white" class="favorite-label filter-value__color_white"></label>
        <input type="checkbox" class="favorite-input" id="purple">
        <label for="purple" class="favorite-label filter-value__color_purple"></label>
        <input type="checkbox" class="favorite-input" id="blue">
        <label for="blue" class="favorite-label filter-value__color_blue"></label>
        <input type="checkbox" class="favorite-input" id="gray">
        <label for="gray" class="favorite-label filter-value__color_gray"></label>
        <input type="checkbox" class="favorite-input" id="black">
        <label for="black" class="favorite-label filter-value__color_black"></label>
      </div>
    </div>`;
  }
  popular(): void {
    this.filter.innerHTML += `<div class="filter-value__filter">Только популярные:
      <div>
        <input type="checkbox" class="favorite-input" id="checkbox">
        <label for="checkbox" class="favorite-label"></label>
      </div>
    </div>`;
  }
  range(): void {
    this.filter.innerHTML += `<div class="filter-value__filter filter-value__filter_slider">Количество:
      <div class="slider-value"></div>
      <div class="slider-value__range">
        <div class="slider-value-start">1</div>
        <div class="slider-value-end">20</div>
      </div>
    </div>
    <div class="filter-value__filter filter-value__filter_slider">Год выхода на рынок:
      <div class="slider-year"></div>
      <div class="slider-value__range">
        <div class="slider-year-start">2017</div> 
        <div class="slider-year-end">2022</div>
      </div>  
    </div>`;
  }
  search(): void {
    this.filter.innerHTML += `<div class="filter-value__filter_search">
      <label>Поиск:</label>
      <input placeholder="Введите наименование товара" type="search" class="search" id="search-text" value="">
    </div>`;
  }
  sort(): void {
    this.filter.innerHTML += `<div class="filter-value__filter_search">
      <label>Сортировка:</label>
      <select class="search" id="search-ascending-descending">
        <option id="search-ascending-text" selected>От А до Я</option>
        <option id="search-descending-text">От Я до А</option>
        <option id="search-ascending-year">От 2017 до 2022</option>
        <option id="search-descending-year">От 2022 до 2017</option>
      </select>
    </div>`;
  }
  reset(): void {
    this.filter.innerHTML += `<div class="filter-value__filter_reset">
      <button id="reset-filters">Сброс фильтров</button>
      <button>Сброс настроек</button>
    </div>`;
  }
}

export default FilterValue;
