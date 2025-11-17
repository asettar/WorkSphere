const form = document.querySelector('form');
const mainContent = document.querySelector('.main-sidebar-content');
const addExperienceButton = document.getElementById('add-experience-btn');
const formInputs = form.querySelectorAll('input');
const roleInput = document.getElementById('role-input'); 

export  function    showForm() {
    mainContent.style.display = 'none';
    form.style.display = 'flex';
}

export function resetAndCloseForm() {
    form.reset();
    const experiences = form.querySelectorAll('.experience-form');
    experiences.forEach((elem) => elem.remove());
    document.getElementById('form-profile-image').src = "";
    form.style.display = 'none';
    mainContent.style.display = 'block';
}

function    deleteExperience(experienceCard) {
    if (confirm("Experience will be deleted, are you sure?")) {
        experienceCard.remove();
    }
}

function    addExperienceForm() {
    const newExperience = document.createElement('div');
    newExperience.classList.add('experience-form');
    newExperience.innerHTML = `
        <h3>Experience</h3>
        <div>
            <label for="">Position</label>
            <input type="text" name="post" class="position-input" placeholder="Enter Position">
        </div>
        <div>
            <label for="">Start Date</label>
            <input type="date" name="startDate" id="picture-input">
        </div>
        <div>
            <label for="">End Date</label>
            <input type="date" name="endDate" id="picture-input">
        </div>
        <div>
            <label for="">Description</label>
            <textarea name="Description" rows = "4" cols = "40" value="" placeholder="Enter post description" ></textarea>
        </div>
        <img class = "delete-experience" src = "Images/delete.png">
    `;
    const deleteBtn = newExperience.querySelector('.delete-experience');
    deleteBtn.addEventListener('click', () => deleteExperience(newExperience));
    form.insertBefore(newExperience, addExperienceButton);
    return newExperience;
}

export function prefillFormData(employee) {
    // prefill default inputs
    formInputs.forEach((input) => {
        input.value = employee[input.name];
    });
    roleInput.value = employee["role"];
    // profile img
    document.getElementById('form-profile-image').src = employee.photo;
    // add experiences
    for (let experience of employee.experience) {
        const newExperienceForm = addExperienceForm();
        const currentExperienceInputs = newExperienceForm.querySelectorAll('input, textarea');
        currentExperienceInputs.forEach(input => {
            input.value = experience[input.name];
        });
    }
}
 
export function getEmployeeData(employee) {
    formInputs.forEach((input) => {
        employee[input.name] = input.value;
    });
    employee["role"] = roleInput.value;
    // experiences
    let experiences = form.querySelectorAll('.experience-form');
    employee.experience = []; // reset experiences
    for (let experience of experiences) {
        let newExperience = {};
        const experienceInputs = experience.querySelectorAll('input, textarea');
        experienceInputs.forEach(input => {
            newExperience[input.name] = input.value;
        });
        employee.experience.push(newExperience);
    }
}

addExperienceButton.addEventListener('click', (event) => {
    console.log("add experience clicked");
    event.preventDefault();
    addExperienceForm();
});