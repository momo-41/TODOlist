const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
  todos.forEach((todo) => {
    add(todo);
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log(input.value);
  add();
});

function add(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    // 0より大きかったらtrueを返す.小さかったら何も返さない.暗黙的型変換〇
    const li = document.createElement("li");
    li.innerText = todoText;
    li.classList.add("list-group-item");

    if (todo && todo.completed) {
      // 両方がtrueだった時に処理が行われる
      li.classList.add("text-decoration-line-through");
    }

    li.addEventListener("contextmenu", function (event) {
      event.preventDefault();
      li.remove();
      saveData();
    });

    li.addEventListener("click", function () {
      li.classList.toggle("text-decoration-line-through");
      // toggleは()の内容が無ければそのクラスをつける.あればつけない削除する.切り替えるもの
      saveData();
    });

    ul.appendChild(li);
    input.value = "";
    saveData();
  }
}

function saveData() {
  const lists = document.querySelectorAll("li");
  let todos = [];

  lists.forEach((list) => {
    let todo = {
      text: list.innerText,
      completed: list.classList.contains("text-decoration-line-through"),
    };
    todos.push(todo);
  });
  localStorage.setItem("todos", JSON.stringify(todos));
  // localStorageは文字列形式で値が格納→JSONで値に変換する
}
