import data from "./data.js";
import clearTable from "./clearTable.js";
import fillTable from "./fillTable.js";
import { sort, thead } from "./consts.js";

thead.addEventListener("click", (e) => sortingTable(e.target.className));

// Функция сортировки таблицы
function sortingTable(field) {
  clearTable();

  let sortingField = "";

  // Проверяем по какому полю сортировать
  switch (field) {
    case "about":
      sortingField = field;
      break;
    case "eye-color":
      sortingField = "eyeColor";
      break;
    case "first-name":
      sortingField = "firstName";
      break;
    case "second-name":
      sortingField = "lastName";
      break;
  }

  // Если поле раньше было другое, устанавливаем новое и сортируем по возрастанию
  if (sort.field !== sortingField) {
    sort.field = sortingField;
    sort.order = "ASC";
  } else {
    sort.order = sort.order === "ASC" ? "DESC" : "ASC"; // Иначе сортируем по убыванию
  }

  // Функция сортировки
  data.sort((a, b) => {
    if (sortingField === "firstName" || sortingField === "lastName") {
      a = a.name;
      b = b.name;
    }
    if (a[sortingField] > b[sortingField]) {
      return sort.order === "ASC" ? 1 : -1;
    }
    if (a[sortingField] < b[sortingField]) {
      return sort.order === "ASC" ? -1 : 1;
    }
    return 0;
  });

  // Заполняем таблицу отсортированными значениями
  fillTable();
}
