const todoForm = document.getElementById('todoForm');
const todoInput = document.querySelector('.todoInput');
const centerTodo = document.querySelector('.todoBox');
const todoListBox = document.querySelector('.todoListBox');
const todoBtn = document.getElementById('todoBtn');
const actualTodoBox = document.querySelector('.actualTodoBox');

let todos = [];
const USER_KEY = 'userName'
const TODOS_KEY = 'todos'

function openTodo(){
    if(localStorage.getItem(USER_KEY)===null){
        alert('이름 또는 아이디를 먼저 입력하신 후에 사용해주세요 🙏');
    } else {
        this.classList.contains('open') ? this.classList.remove('open') : this.classList.add('open');
        actualTodoBox.classList.contains('open') ? actualTodoBox.classList.remove('open') : actualTodoBox.classList.add('open');
        todoInput.focus();
    }
}
function handleSubmit(e){
    e.preventDefault();
    const todo = todoInput.value;
    todoInput.value = "";
    const todoObj = {
        id : Date.now(),
        todo : todo
    }
    todos.push(todoObj)
    appendTodo(todoObj);
    appendCenter(todoObj);
    saveTodos();
}

function saveTodos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function deleteTodos(e) {
    for (let i = 0; i < centerTodo.children.length; i++) {
        centerTodo.children[i].id === e.target.parentElement.id ? centerTodo.children[i].remove() : ""
    }
    const toDelete = e.target.parentElement
    todos = todos.filter(todo => todo.id !== parseInt(toDelete.id));
    toDelete.remove();
    saveTodos();
}

function appendTodo(todo){
    const li = document.createElement('li');
    li.id = todo.id
    const circle = document.createElement('i');
    circle.classList.add('far', 'fa-circle');
    const checked = document.createElement('i');
    checked.classList.add('far', 'fa-check-circle');
    const del = document.createElement('i');
    del.classList.add('far', 'fa-trash-alt');
    const span = document.createElement('span');
    li.append(circle,span,del);
    span.innerText = todo.todo;
    todoListBox.appendChild(li);

    del.addEventListener('click', deleteTodos)

    circle.addEventListener('click', (e)=>{
        const toCheck = e.target.parentNode;
        const toStyle = e.target.nextElementSibling;
        toStyle.style.textDecoration = "line-through";
        toCheck.replaceChild(checked, circle);
        for (let i=0; i<centerTodo.children.length; i++){
            centerTodo.children[i].id === toCheck.id ? centerTodo.children[i].classList.add('hide') : ""
        }
        console.log(centerTodo.children[0], toStyle);
        checked.addEventListener('click', (e)=>{
            toStyle.style.textDecoration = "none";
            e.target.parentNode.replaceChild(circle, checked);
            for (let i=0; i<centerTodo.children.length; i++){
                centerTodo.children[i].id === toCheck.id ? centerTodo.children[i].classList.remove('hide') : ""
            }
        })
    });
    
}
function appendCenter(todo){
    const li = document.createElement('li');
    li.id = todo.id
    const span = document.createElement('span');
    li.appendChild(span);
    span.innerText = todo.todo;
    centerTodo.appendChild(li);
}
todoBtn.addEventListener('click', openTodo);
todoForm.addEventListener('submit', handleSubmit);

const savedTodos = localStorage.getItem(TODOS_KEY);

if(savedTodos !== null){
    const parsedTodos = JSON.parse(savedTodos);
    todos = parsedTodos;
    parsedTodos.forEach(appendTodo);
    parsedTodos.forEach(appendCenter);
}