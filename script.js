// getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector (".todoList");
const deleteAllBtn = document.querySelector (".footer button");

inputBox.onkeyup = () => {
    let userData = inputBox.value; //getting value entered by user
    if (userData.trim() !=0){//if entered values aren't only spaces
        addBtn.classList.add("active");//activate the add button
    }else{
        addBtn.classList.remove("active");//deactivate the add button
    }
}

displayTasks();//calling displayTasks function

// if user clicks on the add button
addBtn.onclick = () => {
    let userData = inputBox.value;//getting value entered by user
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if (getLocalStorage == null){//if local storage is null
        listArr = []; //create blank array
    }else{
        listArr = JSON.parse(getLocalStorage);//transforming json string into a js object
    }
    listArr.push(userData); //pushing or adding user data
    localStorage.setItem("New Todo",JSON.stringify(listArr));//transforming js object into a json string
    displayTasks(); //calling displayTasks function
    addBtn.classList.remove("active");//deactivate the add button
}
// function to add task list inside ul 
function displayTasks(){
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if (getLocalStorage == null){//if local storage is null
        listArr = []; //create blank array
    }else{
        listArr = JSON.parse(getLocalStorage);//transforming json string into a js object
    }
    const pendingNumber = document.querySelector(".pendingNumber");
    pendingNumber.textContent = listArr.length; //passing the length value in pendingNumber
    if(listArr.length > 0){//if array length is greater than 0
        deleteAllBtn.classList.add("active");//activate the clearall button
    }else{
        deleteAllBtn.classList.remove("active");//deactivate the clearall button
    }
    let newLiTag = '';
    listArr.forEach ((element, index) => {
        newLiTag += `<li>${element}<span onclick="deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag;//adding new li tag inside ul tag
    inputBox.value = "";//leave input field blank once task is added
}

//delete task function
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); //delete the particular indexed li
    // update local storage after removing the li
    localStorage.setItem("New Todo",JSON.stringify(listArr));//transforming js object into a json string
    displayTasks(); //calling displayTasks function
}

//delete all tasks function
deleteAllBtn.onclick = ()=>{
    listArr = [];//empty the array
    // update local storage after removing all tasks
    localStorage.setItem("New Todo",JSON.stringify(listArr));//transforming js object into a json string
    displayTasks(); //calling displayTasks function
}