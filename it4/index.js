/// 1. Методы массивов, функкций, объектов, коллекций 

let a = [1, 2, 3, 4, 5]
let b = [5, 6, 7]
// 1.1. Методы массивов

c = a.concat(b) // [1, 2, 3, 4, 5, 5, 6, 7]
c = a.pop() // [1, 2, 3, 4], удаляет последний элемент массива и возвращает его
c = a.push(5) // [1, 2, 3, 4, 5], добавляет элемент в конец массива и возвращает новую длину массива
c = a.shift() // [2, 3, 4, 5], удаляет первый элемент массива и возвращает его
c = a.unshift(1) // [1, 2, 3, 4, 5], добавляет элемент в начало массива и возвращает новую длину массива

console.log(c.every(el => el > 0)) // true, проверяет, удовлетворяют ли все элементы массива условию, заданному в передаваемой функции
console.log(c.find(el => el > 3)) // 4, возвращает первое найденное в массиве значение, которое удовлетворяет условию, заданному в передаваемой функции
console.log(c.filter(el => el > 3)) // [4, 5], возвращает новый массив со всеми элементами, которые удовлетворяют условию, заданному в передаваемой функции

x = c.map(el => el ** 2) // [1, 4, 9, 16, 25], возвращает новый массив, в котором каждый элемент является результатом вызова переданной функции для каждого элемента массива

// 1.2. Методы функций

function someFunction(x){
    console.log(x)
}

someFunction.call(this, 5) // 5, вызывает функцию с указанным значением this и аргументами, переданными по отдельности
someFunction.apply(this, [5]) // 5, вызывает функцию с указанным значением this и аргументами, переданными в виде массива или объекта подобного массиву
anotherFunction = someFunction.bind(this, 5) // возвращает новую функцию, которая при вызове будет иметь указанное значение this и аргументы, переданные при связывании

// 1.3. Методы объектов

someObject = {
    a: 1,
    b: "hello",
    funcInObject: () => {console.log("function in object");}
}

console.log(Object.keys(someObject)) // ["a", "b", "funcInObject"], возвращает массив, содержащий имена всех перечисляемых свойств объекта
console.log(Object.values(someObject)) // [1, "hello", () => {console.log("function in object");}], возвращает массив, содержащий значения всех перечисляемых свойств объекта
console.log(Object.entries(someObject)) // [["a", 1], ["b", "hello"], ["funcInObject", () => {console.log("function in object");}]], возвращает массив, содержащий все перечисляемые свойства объекта в виде пар [ключ, значение]

someFunction.funcInObject() // "function in object", вызов функции, которая является свойством объекта

console.log(someObject.toString()) // "[object Object]", возвращает строковое представление объекта
// 1.4. Методы коллекций (Map, Set)

y = [1, 2, 3, 4, 5, 5, 4, 3, 2, 1]
let mySet = new Set(y) // Set(5) {1, 2, 3, 4, 5}, коллекция, которая хранит только уникальные значения
let myMap = new Map([[1,2], [3,4]]) // Map(2) {1 => 2, 3 => 4}, коллекция, которая хранит пары ключ-значение

// 2. Отличие стрелочных функций от обычных
// 1) Стрелочные функции не имеют собственного контекста this, они наследуют его от окружающего кода. Обычные функции имеют свой собственный контекст this, который определяется в момент вызова функции.
// 2) Стрелочные функции не могут быть вызваны при помощи bind, call или apply, так как они не имеют собственного контекста this. Обычные функции могут быть вызваны при помощи bind, call или apply, что позволяет изменять их контекст this.

function foo (arg1, arg2){
    console.log(arguments) 
    console.log(this.name)
}

foo.call({name: "John"}, 1, 2) // Arguments(2), "John"

fooArrow = (arg1, arg2) => {
    //console.log(arguments) // ReferenceError: arguments is not defined, так как стрелочные функции не имеют объекта arguments
    console.log(this.name) // undefined, так как стрелочные функции не имеют собственного контекста this
}
fooArrow.call({name: "John"}, 1, 2) // undefined

// 3. Замыкание
function outerFunction(text, number) {
    return function innerFunction() {
        console.log(text, number)
        return {text: text, number: number}
    }
    return innerFunction
}

caller = outerFunction("Hello", 42) // возвращает функцию innerFunction, которая замыкает переменные text и number


// 4. Spread/Rest, деструктуризация (объектов, массивов)

// spread - распаковка элементов массива или объекта
let arr1 = [1, 2, 3]
let arr2 = [...arr1, 4, 5] // [1, 2, 3, 4, 5], создаёт новый массив, который содержит все элементы arr1 и дополнительные элементы

//rest - сбор оставшихся элементов массива или объекта в новый массив или объект
function restExample(...args) {
    console.log(args) // [1, 2, 3], собирает все переданные аргументы в массив args
}

restExample('a', 'b', 'c') // ['a', 'b', 'c']

// деструктуризация - позволяет распаковать значения из массивов или свойства из объектов в отдельные переменные
const fruits = ['apple', 'banana', 'cherry']
const [first, second] = fruits // first = 'apple', second = 'banana', распаковывает элементы массива fruits в переменные first и second
console.log(first, second) // "apple", "banana"



// 5. Классы

class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }     
    greet() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`)
    }

}

const myClass = new Person("Alice", 30) // создаёт новый объект класса Person с именем "Alice" и возрастом 30
myClass.greet() // "Hello, my name is Alice and I am 30 years old.", вызывает метод greet объекта myClass

//Классы - это основа ООП. Основными принципами ООП являются инкапсуляция, наследование и полиморфизм. 
// Классы позволяют создавать объекты, которые могут иметь свои свойства и методы, а также наследовать свойства и методы от других классов. 
// Это позволяет создавать более организованный и модульный код, который легче поддерживать и расширять.
// Инкапсуляция - это принцип, который позволяет скрыть внутреннюю реализацию объекта и предоставлять только необходимый интерфейс для взаимодействия с ним.
// Наследование - это принцип, который позволяет создавать новый класс на основе существующего класса, наследуя его свойства и методы.
// Полиморфизм - это принцип, который позволяет использовать объекты разных классов через единый интерфейс, что позволяет создавать более гибкий и расширяемый код.

class Employee extends Person {
    constructor(name, age, position) {
        super(name, age) // вызывает конструктор родительского класса Person для инициализации свойств name и age
        this.position = position
    }
    work() {
        console.log(`${this.name} is working as a ${this.position}.`)
    }
}

const employee = new Employee("Bob", 25, "CEO") // создаёт новый объект класса Employee с именем "Bob", возрастом 25 и должностью "CEO"
employee.greet() // "Hello, my name is Bob and I am 25 years old.", вызывает метод greet объекта employee, который наследуется от класса Person
employee.work() // "Bob is working as a CEO.", вызывает метод work объекта employee, который определён в классе Employee

const objects = [myClass, employee] // массив, содержащий объекты myClass и employee
objects.forEach(obj => obj.greet()) // вызывает метод greet для каждого объекта в массиве objects, что демонстрирует полиморфизм, 
// так как оба объекта могут использовать один и тот же интерфейс для вызова метода greet