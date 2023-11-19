loadData();
enableModals();
renderPage();

var projects;
var todos;

//TODO filter todos by project
//TODO add mark done button

function createToDo() {
    let title = document.getElementById("todo-title").value;
    let description = document.getElementById("todo-description").value;
    let project = document.getElementById("todo-project-name").value;
    let dueDate = document.getElementById("todo-due").value;
    let priority = document.getElementById("todo-priority").value;
    let uuid = crypto.randomUUID();
    return { title, description, project, dueDate, priority, uuid };
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
    proj.addEventListener("click", switchProject);
    if (element === "default"){
      proj.classList.add("selected");
    }
  });
}

function switchProject(e){
  var todoContainer = document.querySelector(".todo-container");
  todoContainer.replaceChildren();

  var project = e.currentTarget.textContent;
  displayToDos(project);

  var projectList = document.querySelector(".projects");
//add/remove selected class for styling
  [...projectList.children].forEach((element) => {element.classList.remove("selected")});
  e.currentTarget.classList.add("selected");
}

function removeToDo(evt){
  var uuid = evt.currentTarget.id;
  uuid = uuid.replace("todo-uuid-", "");

  todos = todos.filter((el)=> el.uuid != uuid);

  saveData();
  evt.currentTarget.parentElement.remove();
}

function displayToDos(project) {
    var todoContainer = document.querySelector(".todo-container");
    var todosToDisplay = todos.filter((td) => td.project === project);
    todosToDisplay.forEach((item) => {
        var todoDiv = document.createElement("div");
        todoDiv.className = "todo-card";
        Object.keys(item).filter((key) => key != "uuid").forEach((key) => {
            var keySpan = document.createElement("span");
            keySpan.className = key;
            keySpan.innerHTML = `<b>${key.replace(/([a-z])([A-Z])/g, '$1 $2')}:</b> ${item[key]}`;
            todoDiv.appendChild(keySpan);
        })
        var doneBtn = document.createElement("button");
        doneBtn.textContent = "Mark Done";
        doneBtn.id = `todo-uuid-${item.uuid}`;
        doneBtn.addEventListener("click", removeToDo);
        todoDiv.appendChild(doneBtn);
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
  displayToDos("default");
}

function clearPage(){

  var projectSelectList = document.getElementById("todo-project-name");
  projectSelectList.replaceChildren();
  
  var projectList = document.querySelector(".projects");
  projectList.replaceChildren();

  var todoContainer = document.querySelector(".todo-container");
  todoContainer.replaceChildren();
}