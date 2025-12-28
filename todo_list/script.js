const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');

// Load saved todos from localStorage
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Create a DOM node for a todo
function createTodoNode(todo, index) {
    const li = document.createElement('li');

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;

    checkbox.addEventListener('change', () => {
        todo.completed = checkbox.checked;
        render();
        saveTodos();
    });

    // Text
    const textSpan = document.createElement('span');
    textSpan.textContent = todo.text;
    textSpan.style.margin = '0 8px';

    if (todo.completed) {
        textSpan.style.textDecoration = 'line-through';
    }

    // Edit on double click
    textSpan.addEventListener('dblclick', () => {
        const newText = prompt('Edit todo', todo.text);
        if (newText !== null && newText.trim() !== '') {
            todo.text = newText.trim();
            render();
            saveTodos();
        }
    });

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';

    delBtn.addEventListener('click', () => {
        todos.splice(index, 1);
        render();
        saveTodos();
    });

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);

    return li;
}

// Render all todos
function render() {
    list.innerHTML = '';
    todos.forEach((todo, index) => {
        const node = createTodoNode(todo, index);
        list.appendChild(node);
    });
}

// Add new todo
function addTodo() {
    const text = input.value.trim();
    if (!text) return;

    todos.push({
        text: text,
        completed: false
    });

    input.value = '';
    render();
    saveTodos();
}

addBtn.addEventListener('click', addTodo);

input.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        addTodo();
    }
});

render();

