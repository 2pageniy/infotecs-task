import data from "../data/data.js";
import { tbody } from "../consts/consts.js";
export let selectedRow = null;

// Событие при клике на tbody, для редактирования строки в таблице
tbody.addEventListener("click", (e) => {
  let tr = e.target.closest("tr"); // Находим ближайший tr

  // Проверяем не нажата ли другая строка или tr не найден
  if (!tr || selectedRow) {
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
