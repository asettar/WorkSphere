import {addUnassignedEmployee} from "./cardsCreation.js"

const demoEmployees = [
  {
    id: 1,
    name: "Achraf Settar",
    role: "IT Technician",
    photo: "https://i.pravatar.cc/150?img=1",
    email: "achrafsettar8@gmail.com",
    phone: "+212614643738",
    room: "unassigned",
    experience: [
      { post: "Network troubleshooting", startDate: "2023-01-01",endDate: "2023-06-01", Description: "description1"},
      { post: "System maintenance", startDate: "2023-06-02", endDate: "2024-01-01", Description: "description2" }
    ]
  },
  {
    id: 2,
    name: "Sara Benali",
    role: "Receptionist",
    photo: "https://i.pravatar.cc/150?img=2",
    email: "sara.benali@example.com",
    phone: "+212622334455",
    room: "unassigned",
    experience: [
      { post: "Customer assistance", startDate: "2022-03-01", endDate: "2023-01-01", Description: "description1" },
      { post: "Front desk operations", startDate: "2023-01-02", endDate: "2024-01-01", Description: "description2" }
    ]
  },
  {
    id: 3,
    name: "Hicham Amrani",
    role: "Cleaning Staff",
    photo: "https://i.pravatar.cc/150?img=5",
    email: "hicham.amrani@example.com",
    phone: "+212655667788",
    room: "unassigned",
    experience: []
  }
];

export let employeesData = JSON.parse(localStorage.getItem('employees')
                    || JSON.stringify(demoEmployees));


console.log(employeesData);

export  function    removeEmployeeData(employee) {
    employeesData = employeesData.filter((elem) => elem.id !== employee.id);
    // todo: updateLocalStorage
}

export  function    addNewEmployeeData(employee) {
    employeesData.push(employee);
    addUnassignedEmployee(employee);
    // todo : update localstorage
}

function    isUnassignedEmpolyee(employee) {
    return (employee.room === "unassigned");
}

function    renderEmployeesCards() {
    for (let employee of employeesData) {
        if (isUnassignedEmpolyee(employee))
            addUnassignedEmployee(employee);
        else {
            // assign to it's room
        }
    }
};

renderEmployeesCards();