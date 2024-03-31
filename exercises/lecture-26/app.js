//Завдання 1
function calculate(operation, value, numbers) {
    let result = value;
    for (const number of numbers) {
      result = operation(result, number);
    }
    return result;
}
  
function sum(n1, n2) {
    return n1 + n2;
}
  
function multiply(n1, n2) {
    return n1 * n2;
}

console.log(calculate(sum, 0, [1, 2, 4]));
console.log(calculate(multiply, 1, [1, 2, 4]));

//Завдання 2
let student_names = ["Wick", "Malcolm", "Smith"]

let studentsList = student_names.map((name, index, array) => {
    return `name: ${name} | index: ${index} | array: [ "${array.join('", "')}"]`;
});
  
console.log(studentsList.join('\n'));

//Завдання 3
let students_information = [
    {"name": "Wick", "degree": 375}, 
    {"name": "Malcolm", "degree": 405}, 
    {"name": "Smith", "degree": 453},
];

let grades = students_information.map(student => {
    student.percentage = (student.degree / 600) * 100;
    return student;
});
  
console.log(grades);

//Завдання 4
const numbArr = [1, 2, 3, [10, 11, 12], 21, 22, 23, [31, 32, 33, 34], [41, 42]];

const reduce = numbArr.reduce((final, current) => {
    return final.concat(current);
}, []);
  
console.log(reduce);

//Завдання 5
Array.prototype.upperCase = function() {
    let i;
    for (i = 0; i < this.length; i++) {
        this[i] = this[i].toUpperCase();
    }
};
  
function myFunc() {
    let arr = ["Algorithm", "Data Structure", "Operating System", "html"];
    arr.upperCase();
    console.log(arr);
}

myFunc();
