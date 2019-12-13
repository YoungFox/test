// function greeter(person: string) {
//     return 'Hello, ' + person
// }
// let user = ['xxx']
// document.body.innerHTML = greeter(user)
// interface Person{
//     firstName: string;
//     lastName: string;
// }
// function greater(person: Person) {
//     return "Hello, " + person.firstName + " " + person.lastName;
// }
// let user = { firstName: 'Jane'}
// document.body.innerHTML = greater(user)
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + ' ' + middleInitial + lastName;
    }
    return Student;
}());
function greeter(person) {
    return 'Hello, ' + person.firstName + ' ' + person.lastName;
}
var user = new Student('Jane', 'M.', 'User');
document.body.innerHTML = greeter(user);
