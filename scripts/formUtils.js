import { createElement } from "react";

const form = document.querySelector('form');
const mainContent = document.querySelector('.main-sidebar-content');
const addExperienceButton = document.getElementById('add-experience-btn');

console.log(form);
console.log(mainContent);

export  function    showForm() {
    mainContent.style.display = 'none';
    form.style.display = 'flex';
}

export function resetAndCloseForm() {
    // remove experiences from form;
    form.style.display = 'none';
    mainContent.style.display = 'block';
}

export function prefillFormData(employee) {
    // prefill default inputs 
    // add experiences
}