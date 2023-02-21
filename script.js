// Импортируем из другого файла данные
import data from "./data.js";

let selectedRow = null;
let page = 1; // Стартовая страница
const rowsOnPage = 10; // Количество строк на странице
const maxPage = Math.ceil(data.length / rowsOnPage); // Максимальное количество страниц
const sort = {
  field: "name",
  order: "ASC",
}; // Поле сортировки и метод

const tbody = document.querySelector(".tbody");
const thead = document.querySelector(".thead");

// Кнопки скрытия колонок
const btnsHidden = document.querySelector(".hidden-btn");
const checkedBtns = document.querySelectorAll(".check-col");

// Кнопки переключения страницы
const btnNext = document.querySelector(".next");
const btnPrev = document.querySelector(".prev");

// Текст страницы
const pageText = document.querySelector(".page");

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

// Функция очистки таблицы
function clearTable() {
  tbody.innerHTML = "";
}

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
  fillTable(data);
}

fillTable(data);

// Событие при клике на tbody, для редактирования строки в таблице
tbody.addEventListener("click", (e) => {
  let tr = e.target.closest("tr"); // Находим ближайший tr
  if (!tr || selectedRow) {
    // Проверяем не нажата ли другая строка или tr не найден
    return;
  }
  selectedRow = tr;
  tr.style.background = "gray";
  const currentData = data.find((i) => i.id === tr.id); // Ищем в массиве data объект, который хотим изменить
  const editData = document.querySelector(".edit-data");
  editData.style.display = "flex";

  // Находим все input'ы
  const firstName = editData.querySelector(".edit-data__name");
  const lastName = editData.querySelector(".edit-data__last-name");
  const about = editData.querySelector(".edit-data__input-about");
  const eyeColor = editData.querySelector(".edit-data__eye-color");

  // Заполняем input данными, которые находятся в строке
  firstName.value = currentData.name.firstName;
  lastName.value = currentData.name.lastName;
  about.value = currentData.about;
  eyeColor.value = currentData.eyeColor;

  const saveBtn = document.querySelector(".save-button");
  saveBtn.addEventListener("click", saveButtonHandler);

  const cancelBtn = document.querySelector(".cancel-button");
  cancelBtn.addEventListener("click", cancelButtonHandler);

  function cancelButtonHandler() {
    endEdit();
  }

  function saveButtonHandler() {
    // Меняем в массиве data значения на новые
    currentData.name.firstName = firstName.value;
    currentData.name.lastName = lastName.value;
    currentData.about = about.value;
    currentData.eyeColor = eyeColor.value;

    endEdit();
    // Обновляем текст в строке таблицы
    tr.childNodes[0].textContent = firstName.value;
    tr.childNodes[1].textContent = lastName.value;
    tr.childNodes[2].textContent = about.value;
    tr.childNodes[3].textContent = eyeColor.value;
    tr.childNodes[3].style.background = eyeColor.value;
  }

  function endEdit() {
    tr = document.getElementById(tr.id) || tr; // Ищем снова строку в таблице, если вдруг мы сортировали таблицу или переключали страницу
    selectedRow = null;
    editData.style.display = "none";
    tr.style.background = "none";
    cancelBtn.removeEventListener("click", cancelButtonHandler);
    saveBtn.removeEventListener("click", saveButtonHandler);
  }
});

// Событие скрытия колонок
btnsHidden.addEventListener("click", (e) => {
  let input = e.target.closest("input");
  if (!input) {
    return;
  }
  const allTr = document.querySelectorAll("tr"); // Находим все строки
  const column = input.classList[0][0] - 1; // Выбираем одну колонку

  // Добавляем/удаляем класс каждому элементу в колонке
  for (let i = 0; i < allTr.length; i++) {
    const child = allTr[i].cells[column];
    child.classList.toggle("hidden");
  }
});

// События переключения страницы
btnNext.addEventListener("click", () => {
  // Проверяем, чтобы при переключении страницы она была не больше максимальной
  if (page + 1 > maxPage) {
    return;
  }
  page += 1;
  pageText.textContent = page;
  clearTable();
  fillTable(data);
});

btnPrev.addEventListener("click", () => {
  // Проверяем, чтобы при переключении страницы она была не нулевая
  if (page - 1 <= 0) {
    return;
  }
  page -= 1;
  pageText.textContent = page;
  clearTable();
  fillTable(data);
});
