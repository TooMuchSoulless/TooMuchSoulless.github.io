//Завдання 1
const person = {
    name: "Вікторія", 
    age: 21
};

console.log("Ім'я:", person.name);
console.log("Вік:", person.age);

//Завдання 2
person.name = {
    firstName: "Вікторія",
    lastName: "Гурова"
};

console.log("Ім'я:", person.name.firstName);
console.log("Прізвище:", person.name.lastName);

//Завдання 3
const person1 = {
    name: {
        firstName: "Вікторія",
        lastName: "Гурова"
    },
    age: 21,
    
    bio: function() {
        return `Ім'я: ${this.name.firstName}\nПрізвище: ${this.name.lastName}\nВік: ${this.age}`;
    },
};

console.log(person1.bio());

//Завдання 4
const person2 = {
    name: {
        firstName: "Вікторія",
    },
    
    introduceSelf: function() {
        return `Hi! I'm ${this.name.firstName}.`;
    }
};

console.log(person2.introduceSelf());

//Завдання 5
function createPerson(name) {
    const obj = {
        name: name,
        introduceSelf: function() {
            console.log(`Hi! I'm ${this.name}.`);
        }
    };
    return obj;
}

const prsn1 = createPerson("Вікторія");
const prsn2 = createPerson("Олена");

prsn1.introduceSelf();
prsn2.introduceSelf();

//Завдання 6
function Person(name) {
    this.name = name;
    this.introduceSelf = function() {
        console.log(`Hi! I'm ${this.name}.`);
    };
}

const mary = new Person("Mary");
const tom = new Person("Tom");

mary.introduceSelf(); 
tom.introduceSelf(); 

console.log(mary.hasOwnProperty("prop"));
//console.log("prop" in mary);

//Завдання 7
const DirtyMartini = {
    gin: 6,
    vermouth: 1,
    brine: 1,
    olives: 4,
    avoirdupois: 28.4131,

    english_please: function() {
        return "ingredients:\n" +
               this.gin + " fluid ounces gin\n" +
               this.vermouth + " dash dry vermouth (0.0351951ml)\n" +
               this.brine + " fluid ounce brine from olive jar\n" +
               this.olives + " stuffed green olives";
    },

    excuse_my_french: function() {
      return "ingrédients:\n" +
             (this.gin * this.avoirdupois) + " ml de gin\n" +
             this.vermouth + " trait de vermouth sec (0.0351951ml)\n" +
             (this.brine * this.avoirdupois) + " ml de saumure du pot d'olive\n" +
             this.olives + " olives vertes farcies";
    }
  };
  
  console.log(DirtyMartini.english_please());
  console.log(DirtyMartini.excuse_my_french());