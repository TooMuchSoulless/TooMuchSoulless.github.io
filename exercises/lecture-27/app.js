const ul = document.querySelector('ul');
const input = document.getElementById('item');

let itemsArray = JSON.parse(localStorage.getItem("items") || "[]");
console.log(itemsArray);

itemsArray.forEach(function(item) {
    addTask(item);
});

function addTask(text) {
    const newTask = document.createElement('li');
    newTask.textContent = text;
    ul.appendChild(newTask);
}

function add() {
    const newValue = input.value.trim();

    if (newValue !== '') {
        itemsArray.push(newValue);
        localStorage.setItem("items", JSON.stringify(itemsArray));
        addTask(newValue);
        input.value = '';
    } else {
        console.error('Ви намагаєтесь додати порожній елемент. Будь ласка, введіть значення, щоб продовжити.');
    }
}

function del() {
    localStorage.removeItem("items");
    itemsArray = [];
    ul.innerHTML = '';
}

