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
    // add experiences
    for (let experience of employee.experience) {
        console.log(experience);
        const newExperienceForm = addExperienceForm();
        const currentExperienceInputs = newExperienceForm.querySelectorAll('input');
        console.log(currentExperienceInputs);
        currentExperienceInputs.forEach(input => {
            input.value = experience[input.name];
        });
    }
}
 
addExperienceButton.addEventListener('click', (event) => {
    console.log("add experience clicked");
    event.preventDefault();
    addExperienceForm();
});