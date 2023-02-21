import { btnNext, btnPrev, pageText, maxPage } from "./consts.js";
import fillTable from "./fillTable.js";
import clearTable from "./clearTable.js";

export let page = 1; // Стартовая страница

// События переключения страницы
btnNext.addEventListener("click", () => {
  // Проверяем, чтобы при переключении страницы она была не больше максимальной
  if (page + 1 > maxPage) {
    return;
  }
  page += 1;
  pageText.textContent = page;
  clearTable();
  fillTable();
});

btnPrev.addEventListener("click", () => {
  // Проверяем, чтобы при переключении страницы она была не нулевая
  if (page - 1 <= 0) {
    return;
  }
  page -= 1;
  pageText.textContent = page;
  clearTable();
  fillTable();
});
