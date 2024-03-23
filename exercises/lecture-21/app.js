//Завдання 1
let fruits = 'apple banana cantaloupe blueberries grapefruit';
fruits = fruits.split(' ');

console.log(fruits);

//Завдання 2
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

//Завдання 3
let a = 0;

while (a < fruits.length) {
    console.log(fruits[a]);
    a++;
}

//Завдання 4
let b = 0;

do {
    console.log(fruits[b]);
    b++;
} while (b < fruits.length);

//Завдання 5
for (const fruit of fruits) {
    console.log(fruit);
}

//Завдання 6
const Numbs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (let i = 0; i < Numbs.length; i++) {
    if (Numbs[i] % 2 === 0) {
        console.log(Numbs[i]);
    }
}

//Завдання 7
const twonames = ['Batman'];
twonames.push('Joker');

console.log(twonames);

//Завдання 8
const twonames1 = ['Batman'];
twonames1.unshift('Joker');

console.log(twonames1);

//Завдання 9
let allnames = ['Batman', 'Joker', 'Bane'];
allnames.unshift('Catwoman');

console.log(allnames);

//Завдання 10
let allnames1 = ['Batman', 'Joker', 'Bane'];
allnames1 = ['Catwoman', ...allnames1];

console.log(allnames1);

//Завдання 11
let allnames2 = ['Batman', 'Joker', 'Bane'];
allnames2.splice(1, 0, 'Catwoman');

console.log(allnames2);

//Завдання 12
const names = ['Batman', 'Catwoman', 'Joker', 'Bane'];
const fromIndex = 1;
const removeCount = 2;
const newNames = [
 ...names.slice(0, fromIndex),
 ...names.slice(fromIndex + removeCount)
];

console.log(newNames); 

//Завдання 13
let allnames3 = ['Batman', 'Catwoman', 'Joker', 'Bane'];
allnames3.splice(1, 2, 'Alfred');

console.log(allnames3);

//Завдання 14
let allnames4 = ['Batman', 'Catwoman', 'Joker', 'Bane'];

if (!allnames4.includes('Alfred')) {
    allnames4.push('Alfred');
}

console.log(allnames4);

//Завдання 15
const allnames5 = ['Batman', 'Catwoman', 'Joker', 'Bane'];
const check = allnames5.indexOf('Alfred');

if (check !== -1) {
    allnames5.splice(check, 1);
}

console.log(allnames5);