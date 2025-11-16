import {employeesData, removeEmployeeData} from './setup.js'

export function    editEmployee(employee, employeeCard) {
    console.log("edit");
}

export function    deleteEmployee(employee, employeeCard) {
    if (confirm(`Employe with name : ${employee.name} will be deleted, are you sure?`));
    console.log(employeesData);
    employeeCard.remove();
    removeEmployeeData(employee);
    console.log(employeesData);
}

export function viewEmployee(employee) {
    console.log("view");

}
