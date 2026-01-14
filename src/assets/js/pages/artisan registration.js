const addProjectBtn = document.getElementById("addProject");
const projectsContainer = document.getElementById("projects");

addProjectBtn.addEventListener("click", () => {
  const projectDiv = document.createElement("div");
  projectDiv.classList.add("project");

  projectDiv.innerHTML = `
    <input type="text" placeholder="Project name">
    <input type="file">
  `;

  projectsContainer.appendChild(projectDiv);
});

function goToVerification(event) {
  event.preventDefault();// Prevent form submission
  window.location.href = 'profile-review.html';
}