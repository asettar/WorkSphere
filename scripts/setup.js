import {addUnassignedEmployee} from "./cardsCreation.js"
import {addEmployeeToRoom} from "./roomsCrud.js"

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
      { post: "Network troubleshooting", company : "Oracle", startDate: "2023-01-01",endDate: "2023-06-01", Description: "description"},
      { post: "System maintenance", company : "Youcode", startDate: "2023-06-02", endDate: "2024-01-01", Description: "description" }
    ]
  },
  {
    id: 2,
    name: "Sara Benali",
    role: "Receptionist",
    photo: "https://i.pravatar.cc/150?img=45",
    email: "sara.benali@example.com",
    phone: "+212622334455",
    room: "unassigned",
    experience: [
      { post: "Customer assistance", company : "OCP", startDate: "2022-03-01", endDate: "2023-01-01", Description: "description" },
      { post: "Front desk operations", company : "Oracle", startDate: "2023-01-02", endDate: "2024-01-01", Description: "description" }
    ]
  },
  {
    id: 3,
    name: "Hicham Amrani",
    role: "Security Officer",
    photo: "https://i.pravatar.cc/150?img=13",
    email: "hicham.amrani@example.com",
    phone: "+212655667788",
    room: "unassigned",
    experience: [
      { post: "Customer assistance", company : "Jesa", startDate: "2022-03-01", endDate: "2023-01-01", Description: "description" }
    ]
  },
  {
    id: 4,
    name: "Hicham hamid",
    role: "Manager",
    photo: "https://i.pravatar.cc/150?img=14",
    email: "hicham.amrani@example.com",
    phone: "+212655667788",
    room: "archive-room",
    experience: [
      { post: "Customer assistance", company : "Jesa", startDate: "2022-03-01", endDate: "2023-01-01", Description: "description" }
    ]
  },
   {
    id: 5,
    name: "Hicham sara",
    role: "Manager",
    photo: "https://i.pravatar.cc/150?img=35",
    email: "hicham.amrani@example.com",
    phone: "+212655667788",
    room: "reception-room",
    experience: [
      { post: "Customer assistance", company : "Jesa", startDate: "2022-03-01", endDate: "2023-01-01", Description: "description" }
    ]
  },
  {
    id: 6,
    name: "Hicham hamid",
    role: "Manager",
    photo: "https://i.pravatar.cc/150?img=15",
    email: "hicham.amrani@example.com",
    phone: "+212655667788",
    room: "archive-room",
    experience: [
      { post: "Customer assistance", company : "Jesa", startDate: "2022-03-01", endDate: "2023-01-01", Description: "description" }
    ]
  }
];

export let employeesData = JSON.parse(localStorage.getItem('employees')
                    || JSON.stringify(demoEmployees));

export let rooms = {
  "reception-room" : {
    currentEmployees : 0,  // cnt Of current employees in room 
    maxEmployees : 6,
    availablesRoles : ['Manager', 'Cleaning Staff', 'Receptionist']  // array of valid roles that can join
  },
  "conference-room" : {
    currentEmployees : 0,
    maxEmployees : 8,
    availablesRoles : ['Manager', 'Cleaning Staff', 'Security Officer', 'IT Technician', 'Receptionist', 'other']
  },
  "server-room" : {
    currentEmployees : 0,
    maxEmployees : 4,
    availablesRoles : ['Manager', 'Cleaning Staff', 'IT Technician']
  },
  "security-room" : {
    currentEmployees : 0,
    maxEmployees : 4,
    availablesRoles : ['Manager', 'Cleaning Staff', 'Security Officer']
  },
  "staff-room" : {
    currentEmployees : 0,
    maxEmployees : 4,
    availablesRoles : ['Manager', 'Security Officer', 'IT Technician', 'Receptionist', 'other', 'Cleaning Staff']
  },
  "archive-room" : {
    currentEmployees : 0,
    maxEmployees : 4,
    availablesRoles : ['Manager', 'Security Officer', 'IT Technician', 'Receptionist', 'other']
  },
};

console.log(employeesData);

export  function    removeEmployeeData(employee) {
    employeesData = employeesData.filter((elem) => elem.id !== employee.id);
    localStorage.setItem('employees', JSON.stringify(employeesData));
}

export  function    addNewEmployeeData(employee) {
    employeesData.push(employee);
    addUnassignedEmployee(employee);
    localStorage.setItem('employees', JSON.stringify(employeesData));
}

function    isUnassignedEmpolyee(employee) {
    return (employee.room === "unassigned");
}

function    renderEmployeesCards() {
    for (let employee of employeesData) {
        if (isUnassignedEmpolyee(employee))
            addUnassignedEmployee(employee);
        else {
            addEmployeeToRoom(employee, employee.room);
        }
    }
};

renderEmployeesCards();