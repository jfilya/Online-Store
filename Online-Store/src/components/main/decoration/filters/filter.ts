import "./filter.scss";
class FilterValue {
  public filter: HTMLDivElement;
  constructor() {
    this.filter = document.createElement("div");
  }
  public innerFilter(): void {
    (document.querySelector("aside") as HTMLElement).innerHTML = ``;
    (document.querySelector("aside") as HTMLElement).append(this.filter);
    this.filter.className = "filter-value";
    this.filter.innerHTML = `<h4>Фильтры</h4>`;
  }
  public manufacturer(): void {
    this.filter.innerHTML += `<div class="filter-value__filter">Производитель:
      <div class="filter-value__list">
        <div class="favorite-icon filter-value__phone" id="samsung">
          <img src="assets/svg/samsung.svg" alt="samsung">
        </div>
        <div class="favorite-icon filter-value__phone" id="apple">
          <img class="favorite-icon" src="assets/svg/apple.svg" alt="apple"> 
        </div>
        <div class="favorite-icon filter-value__phone" id="xiaomi">
          <img src="assets/svg/xiaomi.svg" alt="xiaomi">
        </div>
      </div>
    </div>`;
  }
  public numberCameras(): void {
    this.filter.innerHTML += `<div class="filter-value__filter">Количество камер:
    <div class="filter-value__list">
      <div id="camera3" class="favorite-item favorite-camera filter-value__number-cameras">3</div>
      <div id="camera2" class="favorite-item favorite-camera filter-value__number-cameras">2</div>
      <div id="camera1" class="favorite-item favorite-camera filter-value__number-cameras">1</div>
    </div>
  </div>`;
  }
  public colorSort(): void {
    this.filter.innerHTML += `<div class="filter-value__filter">Цвет:
      <div class="filter-value__list">
        <div id="white" class="favorite-item favorite-label filter-value__color_white"></div>
        <div id="purple" class="favorite-item favorite-label filter-value__color_purple"></div>
        <div id="blue" class="favorite-item favorite-label filter-value__color_blue"></div>
        <div id="black" class="favorite-item favorite-label filter-value__color_black"></div>
      </div>
    </div>`;
  }
  public popular(): void {
    this.filter.innerHTML += `<div class="filter-value__filter">Только популярные:
        <div id="checkbox" class="favorite-item favorite-label"></div>
    </div>`;
  }
  public range(): void {
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
  public search(): void {
    this.filter.innerHTML += `<div class="filter-value__filter_search">
      <label>Поиск:</label>
      <input placeholder="Введите наименование товара" type="search" class="search" id="search-text" value="">
    </div>`;
  }
  public sort(): void {
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
  public reset(): void {
    this.filter.innerHTML += `<div class="filter-value__filter_reset">
      <button id="reset-filters">Сброс фильтров</button>
      <button id="reset-settings">Сброс настроек</button>
    </div>`;
  }
}

export default FilterValue;
