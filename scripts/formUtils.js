const form = document.querySelector('form');
const mainContent = document.querySelector('.main-sidebar-content');
console.log(form);
console.log(mainContent);


export  function    showForm() {
    console.log("sow-form");
    mainContent.style.display = 'none';
    form.style.display = 'flex';
}

export function resetAndCloseForm() {
    // remove experiences from form;
    
    form.style.display = 'none';
}

export function prefillFormData() {

}