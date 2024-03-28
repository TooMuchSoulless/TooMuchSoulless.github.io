//Завдання 1 
const colors = ['blue', 'green', 'white'];

function iter(item) {
    console.log(item);
}

colors.forEach(iter);

//Завдання 2
/*function frstiterate(item, index) {
    console.log(`${item} has index ${index}.`);
}

colors.forEach(frstiterate);*/

function frstiterate(item, index, array) {
    console.log(`${item} has index ${index}.`);
    
    if (index === array.length - 1) {
        console.log('The last iteration!');
    }
}

colors.forEach(frstiterate);

//Завдання 3
const letters = ['a', 'b', 'c'];

function scnditerate(letter) {
    console.log(this === window);
}

letters.forEach(scnditerate);

//Завдання 4
const Numbers = [22, 3, 4, 10];

let allEven = true;

Numbers.forEach(function (number) {
    if (number % 2 === 1) {
    allEven = false;
    }
});

console.log(allEven);

//Завдання 5
const numbers = [22, 3, 4, 10];

const even = numbers.every(function(number) {
    return number % 2 === 0;
});

console.log(even); 

//Завдання 6
const fruits = ["apple", "banana", "cantaloupe", "blueberries", "grapefruit"];

const index = fruits.findIndex(fruit => fruit === "blueberries");

console.log(index);

//Завдання 7
const arr = [7, 33, 47, 99, 2, 103, 79];

const elGreaterThan10 = arr.find(element => element > 10);

console.log(elGreaterThan10);

//Завдання 8
const array = [1, 2, 3, 4, 5];

const evenNmbr = (element) => element % 2 === 0;

console.log(array.some(evenNmbr));

//Завдання 9
const sortingNumbers = [1, 30, 4, 21, 100000];

sortingNumbers.sort(function(a, b) {
    return a - b;
});

console.log(sortingNumbers); 