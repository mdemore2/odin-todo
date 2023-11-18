function createToDo(title, descprition, project, dueDate, priority) {

}

function createProject(name, todoList){

}

function displayProject(){

}

function displayToDo(){
    
}

const newToDo = document.getElementById("new-todo");
const newProject = document.getElementById("new-project");

const newToDoOpen = document.getElementById("open-new-todo");
const newProjectOpen = document.getElementById("open-new-project");

const newToDoClose = document.getElementById("close-todo");
const newProjectClose = document.getElementById("close-project");

newToDoOpen.addEventListener("click", () => {
    newToDo.showModal();
})

newToDoClose.addEventListener("click", (e) => {
    e.preventDefault();
    newToDo.close();
    //TODO handle data
})

newProjectOpen.addEventListener("click", () => {
    newProject.showModal();
})

newProjectClose.addEventListener("click", (e) => {
    e.preventDefault();
    newProject.close();
    //TODO handle data
})