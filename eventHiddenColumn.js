import { btnsHidden, table } from "./consts.js";

// Событие скрытия колонок
btnsHidden.addEventListener("click", (e) => {
  let input = e.target.closest("input");
  if (!input) {
    return;
  }

  const allTr = table.rows; // Находим все строки
  const column = input.classList[0][0] - 1; // Выбираем одну колонку

  // Добавляем/удаляем класс каждому элементу в колонке
  for (let i = 0; i < allTr.length; i++) {
    const child = allTr[i].cells[column];
    child.classList.toggle("hidden");
  }
});
