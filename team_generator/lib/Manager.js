const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    getRole() {
        return "Manager";
    }

    getOfficeNumber() {
        return this.officeNumber;
    }

}
const testValue = 100;
const e = new Manager("Foo", 1, "test@test.com", testValue);
console.log(e);

module.exports = Manager;