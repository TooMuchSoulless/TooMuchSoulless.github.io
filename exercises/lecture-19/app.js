//Завдання 1
let str1 = 'I\'m a string!';
let str2 = "I'm a string!";

//Так, рядки мають однакову довжину.
if (str1.length == str2.length) {
    console.log("Рядки str1 і str2 рівні");
} else {
    console.log("Рядки str1 і str2 не рівні");
}

if (str1.length === str2.length) {
    console.log("Рядки str1 і str2 рівні");
} else {
    console.log("Рядки str1 і str2 не рівні");
}

//Завдання 2
let string5 = 'Hello World';

console.log(string5[0]);
console.log(string5.charAt(0));

//Завдання 3
let str3 = "Hello Javascript";

console.log(str3[6]);
console.log(str3.charAt(6));

//Завдання 4
console.log(str3[str3.length -1]);
console.log(str3.charAt(str3.length - 1));

//Завдання 5
function lastChar(str) {
    return str[str.length - 1];
}

function lastChar(str) {
    return str.charAt(str.length - 1);
}

function lastChar(str) {
    return str.slice(-1);
}

//Завдання 6
let a = 'When candles are out,';
let b = 'all cats are grey.';

let phrase = a.concat(' ', b);

console.log(phrase);

//Завдання 7
let fact = "Fifteen is the same as";
let a1 = 5;
let b1 = 10;

fact += " " + (a1 + b1);

console.log(fact);

//Завдання 8
function getFullName(firstName, lastName) {
    return firstName + " " + lastName;
}

let firstName = "Tom";
let lastName = "Cat";

let fullName = getFullName(firstName, lastName);
console.log(fullName);

//Завдання 9
function greeting(yourFirstName, yourLastName) {
    let yourFullName = getFullName(yourFirstName, yourLastName);
    return "Hello, " + yourFullName + "!";
}

let yourFirstName = "Tom";
let yourLastName = "Cat";

let wholeName = greeting(yourFirstName, yourLastName);
console.log(wholeName);

//Завдання 10
function greeting(myFirstName, myLastName) {
    let myFullName = getFullName(myFirstName, myLastName);
    return "<div>" + "<h1>Hello, " + myFullName + "!</h1>" + "</div>";
}

let myFirstName = "Tom";
let myLastName = "Cat";

let html = greeting(myFirstName, myLastName);
console.log(html);

//Завдання 11
let string1 = "  The name of our game  ";

console.log(string1.trim()); //"The name of our game"
console.log(string1.trimStart()); //"The name of our game  "
//console.log(string1.trimLeft()); //"The name of our game  "
console.log(string1.trimEnd()); //"  The name of our game"
//console.log(string1.trimRight()); //"  The name of our game"

const phoneNumber = '\t  555-123\n ';
console.log(phoneNumber.trim());   //'555-123'
console.log(phoneNumber.trimStart() + '\n');  //'555-123 \n'

//Завдання 12
let sentence = 'Always look on the bright side of life';

console.log(sentence.includes('look up')); //false
console.log(sentence.includes('look on')); //true
console.log(sentence.includes('look on', 8)); //false

//Завдання 13
let sentence1 = 'Always look on the bright side of life';

console.log(sentence.indexOf('l')); //1
console.log(sentence.indexOf('l', 3)); //7
console.log(sentence.indexOf('L')); //-1 немає такого

//Завдання 14
let sentence2 = 'Always look on the bright side of life';

console.log(sentence.substring(7)); //'look on the bright side of life'
console.log(sentence.substring(0, 6)); //'Always'
console.log(sentence.substring(7, 11)); //'look'

//Завдання 15
let username = /^[a-z0-9_-]{8,16}$/i;

//Завдання 16
let email = /^[^\s!#$%&'*+/=?^`{|}~-]+@[^\s@\d]+\.[^\s@!#$%&'*+/=?^`{|}~\d]+$/;

//Завдання 17
let sentence3 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in sapien eu velit eleifend ullamcorper eget vitae nulla. Aenean euismod purus sed neque dictum, nec lobortis ante faucibus.';

function textSubstring() {
    return sentence3.substring(0, 50);
}

function textSubstr() {
    return sentence3.substr(0, 50);
}

console.log(textSubstring());
console.log(textSubstr());