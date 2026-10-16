const inputBox = document.querySelector('#inputBox')
const addBtn = document.querySelector('#addBtn')
const todoList = document.querySelector('.todoList')
const deleteBtn = document.createElement('button');
let editTodo = null
addBtn.addEventListener('click', () => {
   const inputText = inputBox.value.trim();
   if (inputText.length <= 0) {
      alert("oops..you must add some task")

   }
   if (addBtn.innerText === 'Edit') {
      editTodo.target.previousElementSibling.innerText = inputText;
      addBtn.innerText = "Add";
      inputBox.value = "";
      editLocalTodo(inputText);

   } else {
      //create a list tag in ul
      const li = document.createElement("li");
      const p = document.createElement("p");
      p.innerText = inputText;
      li.appendChild(p);
      todoList.appendChild(li);
      inputBox.value = "";
      //create a edit button
      const editBtn = document.createElement('button');
      editBtn.innerText = "Edit";
      editBtn.classList.add('btn', 'editBtn')
      li.appendChild(editBtn);
      //create delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.innerText = "Remove";
      deleteBtn.classList.add('btn', 'deleteBtn')
      li.appendChild(deleteBtn);
      saveLocalTodos(inputText);
   }


})
todoList.addEventListener("click", (e) => {
   if (e.target.innerText === 'Remove') {
      todoList.removeChild(e.target.parentElement);
      deleteLocalTodo(e.target.parentElement)
   } else if (e.target.innerText === 'Edit') {
      inputBox.value = e.target.previousElementSibling.innerText;
      inputBox.focus();
      addBtn.innerText = 'Edit';
      editTodo = e
   }
})

const saveLocalTodos = (todo) => {
   let todos;
   if (localStorage.getItem("todos") === null) {
      todos = [];
   } else {
      todos = JSON.parse(localStorage.getItem("todos"));
   }
   todos.push(todo);
   localStorage.setItem("todos", JSON.stringify(todos));
   console.log(todos)
}
const getLocalTodos = () => {
   let todos;
   if (localStorage.getItem("todos") === null) {
      todos = [];
   } else {
      todos = JSON.parse(localStorage.getItem("todos"));
      todos.forEach(todos => {
         const li = document.createElement("li");
         const p = document.createElement("p");
         p.innerText = todos;
         li.appendChild(p);
         todoList.appendChild(li);
         inputBox.value = "";
         //create a edit button
         const editBtn = document.createElement('button');
         editBtn.innerText = "Edit";
         editBtn.classList.add('btn', 'editBtn')
         li.appendChild(editBtn);
         //create delete button
         const deleteBtn = document.createElement('button');
         deleteBtn.innerText = "Remove";
         deleteBtn.classList.add('btn', 'deleteBtn')
         li.appendChild(deleteBtn);
      });
   }

}
document.addEventListener("DOMContentLoaded", getLocalTodos);
const deleteLocalTodo = (todo)=>{
   let todos;
   if (localStorage.getItem("todos") === null) {
      todos = [];
   } else {
      todos = JSON.parse(localStorage.getItem("todos"));
   }
   let todoText = todo.children[0].innerText;
   let todoIndex = todos.indexOf(todoText);
   todos.splice(todoIndex,1);
   localStorage.setItem("todos",JSON.stringify(todos));
}
const editLocalTodo = (todo)=>{
   let todos = JSON.parse(localStorage.getItem("todos"));
   console.log(todo);
   let todoIndex = todos.indexOf(todo);
   todos[todoIndex] = inputBox.value;
   localStorage.setItem("todos",JSON.stringify(todos));




}