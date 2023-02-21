import data from "./data.js"; // Импортируем данные
import { tbody, rowsOnPage, checkedBtns } from "./consts.js";
import { selectedRow } from "./eventEdit.js";
import { page } from "./eventSwitchPage.js";

export default function fillingTableData() {
  fillTable(data);
}

fillingTableData();

// Функция для заполнения таблицы
function fillTable(data) {
  data = data.slice((page - 1) * rowsOnPage, page * rowsOnPage);
  for (let i = 0; i < data.length; i++) {
    const tr = document.createElement("tr");
    tr.setAttribute("id", data[i].id);
    if (selectedRow?.id === tr.id) {
      tr.style.background = "gray";
    }

    const dataName = data[i].name;

    // Создаем строки таблицы
    const tdFirstName = document.createElement("td");
    tdFirstName.textContent = dataName.firstName;

    const tdLastName = document.createElement("td");
    tdLastName.textContent = dataName.lastName;

    const tdAbout = document.createElement("td");
    tdAbout.classList.add("td-about");
    tdAbout.textContent = data[i].about;

    const tdEyeColor = document.createElement("td");
    tdEyeColor.textContent = data[i].eyeColor;
    tdEyeColor.style.background = data[i].eyeColor;
    tdEyeColor.style.fontSize = 0;

    tr.append(tdFirstName, tdLastName, tdAbout, tdEyeColor);

    // Скрываем колонки
    for (let i = 0; i < tr.cells.length; i++) {
      if (!checkedBtns[i].checked) {
        tr.cells[i].classList.add("hidden");
      }
    }

    // Добавляем строку в tbody таблицы
    tbody.append(tr);
  }
}
