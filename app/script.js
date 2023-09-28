let toDo = [];
const input = document.querySelector(".main__task_form-input");
const btnAdd = document.querySelector(".main__task_form-button");
const ul = document.querySelector(".main__task_create_list");
const form = document.querySelector(".main__task_form");
const delAll = document.querySelector(".main__task_delete_all");
const delCom = document.querySelector(".main__task_delete_completed");

//Добавление в масив задачи
function addToDo(text) {
  toDo.push({
    text: text,
    id: `id-${Date.now()}`,
    isDone: false,
  });

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
  li.innerHTML = `<input class='main__task__item_checkbox' type="checkbox" name="item"/>
    <label class='main__task__item_label' for="item">${text}</label>
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
}

//delete one task through the button x
function deleteTodo(id) {
  toDo = toDo.filter((obj) => obj.id !== id);
  renderTodos(toDo);
}

//delete all tasks
function deleteAll(arr) {
  toDo = [];
  renderTodos(toDo);
}

//delete complited tasks
function deleteCompleted(arr) {
  toDo = toDo.filter((obj) => obj.isDone == false);
  renderTodos(toDo);
}

// changing task status
function toggleIsDone(id) {
  let obj = toDo.find((item) => item.id == id);
  obj = obj.isDone = !obj.isDone;
  renderTodos(toDo);
}
console.log(toDo);
