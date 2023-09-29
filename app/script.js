let ARR_TODO = "toDo";
let toDo = JSON.parse(localStorage.getItem(ARR_TODO)) ?? [];

const input = document.querySelector(".main__task_form-input");
const btnAdd = document.querySelector(".main__task_form-button");
const ul = document.querySelector(".main__task_create_list");
const form = document.querySelector(".main__task_form");
const delAll = document.querySelector(".main__task_delete_all");
const delCom = document.querySelector(".main__task_delete_completed");
const delbuttons = document.querySelector(".main__task_delete_hide");

//Добавление в масив задачи
function addToDo(text) {
  if (text !== "" && text.trim().length > 0) {
    toDo.push({
      text: text,
      id: `id-${Date.now()}`,
      isDone: false,
    });
  }

  input.value = "";
  if (toDo.length > 0) {
    delbuttons.classList.replace("main__task_delete_hide", "main__task_delete");
  }
  localStorage.setItem(ARR_TODO, JSON.stringify(toDo));

  renderTodos(toDo);
}

//all Listners here at this place
input.addEventListener("input", (evt) => evt.target.value);
btnAdd.addEventListener("click", () => addToDo(input.value));
form.addEventListener("submit", (evt) => {
  evt.preventDefault();
});
delAll.addEventListener("click", () => deleteAll(toDo));
delCom.addEventListener("click", () => deleteCompleted(toDo));

//Create tags into index.html
function createTodo({ text, id, isDone }) {
  const li = document.createElement("li");
  li.className = "main__task__item";
  li.innerHTML = `<input id="${id}" class='main__task__item_checkbox' type="checkbox" name="item"/>
    <label class='main__task__item_label' for="${id}">${text}</label>
  <button class='main__task__item_delete'>❌</button>`;
  // button "delete x"
  const del = li.querySelector(".main__task__item_delete");
  del.addEventListener("click", () => deleteTodo(id));
  const chb = li.querySelector(".main__task__item_checkbox");
  chb.addEventListener("change", () => toggleIsDone(id));
  chb.checked = isDone;

  return li;
}

//render tasks
function renderTodos() {
  ul.innerHTML = "";
  toDo.forEach((obj) => {
    ul.append(createTodo(obj));
  });
  if (toDo.length > 0) {
    delbuttons.classList.replace("main__task_delete_hide", "main__task_delete");
  }

  ul.scrollTo(0, Number.MIN_SAFE_INTEGER);
}

//delete one task through the button x
function deleteTodo(id) {
  toDo = toDo.filter((obj) => obj.id !== id);
  if (toDo.length == 0) {
    delbuttons.classList.replace("main__task_delete", "main__task_delete_hide");
  }
  localStorage.setItem(ARR_TODO, JSON.stringify(toDo));
  renderTodos(toDo);
}

//delete all tasks
function deleteAll(arr) {
  toDo = [];

  if (toDo.length == 0) {
    delbuttons.classList.replace("main__task_delete", "main__task_delete_hide");
  }
  localStorage.setItem(ARR_TODO, JSON.stringify(toDo));
  renderTodos(toDo);
}

//delete completed tasks
function deleteCompleted(arr) {
  toDo = toDo.filter((obj) => obj.isDone == false);
  if (toDo.length == 0) {
    delbuttons.classList.replace("main__task_delete", "main__task_delete_hide");
  }
  localStorage.setItem(ARR_TODO, JSON.stringify(toDo));
  renderTodos(toDo);
}

// changing task status
function toggleIsDone(id) {
  let obj = toDo.find((item) => item.id == id);
  obj = obj.isDone = !obj.isDone;
  localStorage.setItem(ARR_TODO, JSON.stringify(toDo));
  renderTodos(toDo);
}

renderTodos(toDo);
JSON.parse(localStorage.getItem(ARR_TODO));
