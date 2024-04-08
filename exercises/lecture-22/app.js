const classes = ['first', 'second', 'third', 'fourth'];

//Завдання 1
const h1Tags = document.getElementsByTagName('h1');

console.log('Тип об\'єкту:', typeof h1Tags);
console.log('Розмір:', h1Tags.length);

for (let i = 0; i < h1Tags.length; i++) {
    console.log('Елемент', i + 1, ':', h1Tags[i]);
}

//Завдання 2
const p1 = document.querySelector('#p1');
p1.style.backgroundColor = 'gold';

//Завдання 3
const p2 = document.querySelector('#p2');
p2.style.cssText = 'background-color: gold; color: blue; font-size: 2rem;';

//Завдання 4
const p3 = document.getElementById('p3');
p3.className = "third";

//Завдання 5
const p4 = document.querySelector('#p4');
p4.classList.add(classes[3], 'border');

//Завдання 6
const allcontainers = document.querySelectorAll('.container');

for (let i = 0; i < allcontainers.length; i++) {
    const firstChild = allcontainers[i].firstElementChild;
    console.log('Перший елемент контейнера', i + 1, ':', firstChild);
}

//Завдання 7
for (let i = 0; i < allcontainers.length; i++) {
    const firstChildContent = allcontainers[i].firstElementChild.textContent;
    console.log('Вміст першого елемента у контейнері', i + 1, ':', firstChildContent);
}

//Завдання 8
const headers = document.querySelectorAll('.container header');

for (let i = 0; i < headers.length; i++) {
    const header = headers[i];
    const tagName = 'h' + (i + 1);

    const newTag = document.createElement(tagName);
    newTag.textContent = header.querySelector('h1').textContent;

    const id = i === 3 ? header.querySelector('h1').id : '';
    const className = i === 3 ? header.querySelector('h1').className : '';

    newTag.id = id;
    newTag.className = className;

    newTag.classList.add(classes[i]);

    header.replaceChild(newTag, header.querySelector('h1'));
}