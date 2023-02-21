import data from "./data.js";

export const tbody = document.querySelector(".tbody");
export const thead = document.querySelector(".thead");
export const table = document.querySelector(".table");

// Кнопки скрытия колонок
export const btnsHidden = document.querySelector(".hidden-btn");
export const checkedBtns = document.querySelectorAll(".check-col");

// Кнопки переключения страницы
export const btnNext = document.querySelector(".next");
export const btnPrev = document.querySelector(".prev");

// Текст страницы
export const pageText = document.querySelector(".page");
export const rowsOnPage = 10; // Количество строк на странице

// Поле сортировки и метод
export const sort = {
  field: "name",
  order: "ASC",
};

// Максимальное количество страниц
export const maxPage = Math.ceil(data.length / rowsOnPage);
