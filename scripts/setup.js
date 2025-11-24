import {addUnassignedEmployee} from "./cardsCreation.js"
import {addEmployeeToRoom} from "./roomsCrud.js"

const demoEmployees = [
  {
    id: '1',
    name: "Achraf Settar",
    role: "IT Technician",
    photo: "https://i.pravatar.cc/150?img=1",
    email: "achrafsettar8@gmail.com",
    phone: "+212614643738",
    room: "server-room",
    experience: [
      { post: "Network troubleshooting", company: "Oracle", startDate: "2023-01-01", endDate: "2023-06-01", Description: "description" },
      { post: "System maintenance", company: "Youcode", startDate: "2023-06-02", endDate: "2024-01-01", Description: "description" }
    ]
  },
  {
    id: '2',
    name: "Sara Benali",
    role: "Receptionist",
    photo: "https://i.pravatar.cc/150?img=45",
    email: "sara.benali@example.com",
    phone: "+212622334455",
    room: "unassigned",
    experience: [
      { post: "Customer assistance", company: "OCP", startDate: "2022-03-01", endDate: "2023-01-01", Description: "description" },
      { post: "Front desk operations", company: "Oracle", startDate: "2023-01-02", endDate: "2024-01-01", Description: "description" }
    ]
  },
  {
    id: '3',
    name: "Hicham Amrani",
    role: "Security Officer",
    photo: "https://i.pravatar.cc/150?img=13",
    email: "hicham.amrani@example.com",
    phone: "+212655667788",
    room: "security-room",
    experience: [
      { post: "Customer assistance", company: "Jesa", startDate: "2022-03-01", endDate: "2023-01-01", Description: "description" }
    ]
  },
  {
    id: '4',
    name: "Hicham Hamid",
    role: "Manager",
    photo: "https://i.pravatar.cc/150?img=14",
    email: "hicham.hamid@example.com",
    phone: "+212655667788",
    room: "unassigned",
    experience: [
      { post: "Customer assistance", company: "Jesa", startDate: "2022-03-01", endDate: "2023-01-01", Description: "description" }
    ]
  },
  {
    id: '5',
    name: "Sara Hicham",
    role: "Manager",
    photo: "https://i.pravatar.cc/150?img=35",
    email: "sara.hicham@example.com",
    phone: "+212655667788",
    room: "reception-room",
    experience: [
      { post: "Customer assistance", company: "Jesa", startDate: "2022-03-01", endDate: "2023-01-01", Description: "description" }
    ]
  },
  {
    id: '6',
    name: "Youssef Alami",
    role: "Manager",
    photo: "https://i.pravatar.cc/150?img=15",
    email: "youssef.alami@example.com",
    phone: "+212655667799",
    room: "conference-room",
    experience: [
      { post: "Team leadership", company: "Jesa", startDate: "2022-03-01", endDate: "2023-01-01", Description: "description" }
    ]
  },
  {
    id: '7',
    name: "Fatima Zahra",
    role: "Cleaning Staff",
    photo: "https://i.pravatar.cc/150?img=27",
    email: "fatima.zahra@example.com",
    phone: "+212611223344",
    room: "staff-room",
    experience: [
      { post: "Facility maintenance", company: "Maroc Telecom", startDate: "2021-05-01", endDate: "2022-12-01", Description: "description" },
      { post: "Cleaning operations", company: "BMCE", startDate: "2023-01-01", endDate: "2024-06-01", Description: "description" }
    ]
  },
  {
    id: '8',
    name: "Mehdi Tazi",
    role: "IT Technician",
    photo: "https://i.pravatar.cc/150?img=52",
    email: "mehdi.tazi@example.com",
    phone: "+212644556677",
    room: "server-room",
    experience: [
      { post: "Full-stack development", company: "Capgemini", startDate: "2020-08-01", endDate: "2022-10-01", Description: "description" },
      { post: "Backend engineer", company: "Accenture", startDate: "2022-11-01", endDate: "2024-05-01", Description: "description" }
    ]
  },
  {
    id: '9',
    name: "Amina El Khattabi",
    role: "Receptionist",
    photo: "https://i.pravatar.cc/150?img=38",
    email: "amina.elkhattabi@example.com",
    phone: "+212633445566",
    room: "staff-room",
    experience: [
      { post: "Social media management", company: "Jumia", startDate: "2022-02-01", endDate: "2023-08-01", Description: "description" },
      { post: "Campaign coordination", company: "Avito", startDate: "2023-09-01", endDate: "2024-07-01", Description: "description" }
    ]
  },
  {
    id: '10',
    name: "Omar Benjelloun",
    role: "Manager",
    photo: "https://i.pravatar.cc/150?img=68",
    email: "omar.benjelloun@example.com",
    phone: "+212666778899",
    room: "security-room",
    experience: [
      { post: "Financial reporting", company: "Attijariwafa Bank", startDate: "2021-01-01", endDate: "2023-03-01", Description: "description" },
      { post: "Budget analysis", company: "BMCI", startDate: "2023-04-01", endDate: "2024-09-01", Description: "description" }
    ]
  },
  {
    id: '11',
    name: "Salma Idrissi",
    role: "Cleaning Staff",
    photo: "https://i.pravatar.cc/150?img=41",
    email: "salma.idrissi@example.com",
    phone: "+212622113344",
    room: "reception-room",
    experience: [
      { post: "UI/UX design", company: "1337", startDate: "2022-06-01", endDate: "2023-09-01", Description: "description" },
      { post: "Brand design", company: "UM6P", startDate: "2023-10-01", endDate: "2024-08-01", Description: "description" }
    ]
  },
  {
    id: '12',
    name: "Khalid Mansouri",
    role: "IT Technician",
    photo: "https://i.pravatar.cc/150?img=59",
    email: "khalid.mansouri@example.com",
    phone: "+212655889900",
    room: "staff-room",
    experience: [
      { post: "Data visualization", company: "Microsoft", startDate: "2021-07-01", endDate: "2022-11-01", Description: "description" },
      { post: "Business intelligence", company: "SAP", startDate: "2022-12-01", endDate: "2024-10-01", Description: "description" }
    ]
  },
  {
    id: '13',
    name: "Imane Chahidi",
    role: "Receptionist",
    photo: "https://i.pravatar.cc/150?img=32",
    email: "imane.chahidi@example.com",
    phone: "+212644990011",
    room: "archive-room",
    experience: [
      { post: "Blog writing", company: "LinkedIn", startDate: "2022-04-01", endDate: "2023-07-01", Description: "description" },
      { post: "SEO content", company: "Google", startDate: "2023-08-01", endDate: "2024-11-01", Description: "description" }
    ]
  },
  {
    id: '14',
    name: "Rachid Zeroual",
    role: "Security Officer",
    photo: "https://i.pravatar.cc/150?img=67",
    email: "rachid.zeroual@example.com",
    phone: "+212633221100",
    room: "conference-room",
    experience: [
      { post: "Supply chain management", company: "Coca-Cola", startDate: "2020-09-01", endDate: "2022-08-01", Description: "description" },
      { post: "Process optimization", company: "Danone", startDate: "2022-09-01", endDate: "2024-06-01", Description: "description" }
    ]
  },
  {
    id: '15',
    name: "Laila Bennani",
    role: "Cleaning Staff",
    photo: "https://i.pravatar.cc/150?img=49",
    email: "laila.bennani@example.com",
    phone: "+212611334455",
    room: "server-room",
    experience: [
      { post: "Technical support", company: "Dell", startDate: "2021-11-01", endDate: "2023-02-01", Description: "description" },
      { post: "Client relations", company: "HP", startDate: "2023-03-01", endDate: "2024-09-01", Description: "description" }
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

export function    renderEmployeesCards() {
    for (let employee of employeesData) {
        if (isUnassignedEmpolyee(employee))
            addUnassignedEmployee(employee);
        else {
            addEmployeeToRoom(employee, employee.room);
        }
    }
};

renderEmployeesCards();