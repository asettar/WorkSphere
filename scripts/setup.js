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
    experience: ["Network troubleshooting", "System maintenance"]
  },
  {
    id: 2,
    name: "Sara Benali",
    role: "Receptionist",
    photo: "https://i.pravatar.cc/150?img=2",
    email: "sara.benali@example.com",
    phone: "+212622334455",
    room: "unassigned",
    experience: ["Customer assistance", "Front desk operations"]
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

const employeesData = JSON.parse(localStorage.getItem('employees')
                    || JSON.stringify(demoEmployees));


console.log(employeesData);

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