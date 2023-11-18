loadData();
enableModals();
renderPage();

var projects;
var todos;

function createToDo() {
    let title = document.getElementById("todo-title").value;
    let description = document.getElementById("todo-description").value;
    let project = document.getElementById("todo-project-name").value;
    let dueDate = document.getElementById("todo-due").value;
    let priority = document.getElementById("todo-priority").value;
    return { title, description, project, dueDate, priority };
}

function createProject(name, todoList) {
    return {name, todoList };
}

function displayProjects() {
  //load projects into new-todo modal
  var projectSelectList = document.getElementById("todo-project-name");
  projects.forEach((element) => {
    var opt = document.createElement("option");
    opt.value = element;
    opt.innerHTML = element;
    projectSelectList.appendChild(opt);
  });
  //display projects in sidebar
  var projectList = document.querySelector(".projects");
  projects.forEach((element) => {
    var proj = document.createElement("li");
    proj.innerHTML = element;
    projectList.appendChild(proj);
  });
}

function displayToDos() {
    var todoContainer = document.querySelector(".todo-container");
    todos.forEach((item) => {
        var todoDiv = document.createElement("div");
        todoDiv.className = "todo-card";
        Object.keys(item).forEach((key) => {
            var keySpan = document.createElement("span");
            keySpan.className = key;
            keySpan.textContent = item[key];
            todoDiv.appendChild(keySpan);
        })
        todoContainer.appendChild(todoDiv);
    });
}

function loadData() {
  projects = JSON.parse(localStorage.getItem("projects"));
  todos = JSON.parse(localStorage.getItem("todos"));
  if (!projects){
    projects = ["default"];
  }
  if (!todos){
    todos = [];
  }
}

function saveData() {
  localStorage.setItem("projects", JSON.stringify(projects));
  localStorage.setItem("todos", JSON.stringify(todos));
}

function enableModals() {
  const newToDo = document.getElementById("new-todo");
  const newProject = document.getElementById("new-project");

  const newToDoOpen = document.getElementById("open-new-todo");
  const newProjectOpen = document.getElementById("open-new-project");

  const newToDoClose = document.getElementById("close-todo");
  const newProjectClose = document.getElementById("close-project");

  newToDoOpen.addEventListener("click", () => {
    newToDo.showModal();
  });

  newToDoClose.addEventListener("click", (e) => {
    //TODO handle data
    var newToDoObj = createToDo();
    todos.push(newToDoObj);
    saveData();
    renderPage();
    e.preventDefault();
    newToDo.close();
  });

  newProjectOpen.addEventListener("click", () => {
    newProject.showModal();
  });

  newProjectClose.addEventListener("click", (e) => {
    var projectName = document.getElementById("project-name");
    projects.push(projectName.value);
    saveData();
    renderPage();
    e.preventDefault();
    newProject.close();
  });
}

function renderPage() {
  clearPage();
  displayProjects();
  //TODO display todos
  displayToDos();
}

function clearPage(){

  var projectSelectList = document.getElementById("todo-project-name");
  projectSelectList.replaceChildren();
  
  var projectList = document.querySelector(".projects");
  projectList.replaceChildren();

  var todoContainer = document.querySelector(".todo-container");
  todoContainer.replaceChildren();
}