console.log('JS is sourced!');


function fetchAndRenderToDo(){
    console.log('fetching and rendering to do items');
    // axios call to server to get to do's
    axios({
        method: 'GET',
        url: '/todos'
    }).then((response) =>{
        let toDos = response.data; // sets a variable to access the data from the server
        let tasksToDOM = document.getElementById("toDoTable"); // gets location were we will put the toDos
        tasksToDOM.innerHTML = ''; // clears the table for the toDos

        for (let each of toDos){
            if (each.isComplete === true){
                tasksToDOM.innerHTML += `
            <tr class="completed" data-testid="toDoItem">
                <td>${each.text}</td>
                <td><button class="btn btn-primary disabled" onclick="markComplete(${each.id})" data-testid="completeButton">Completed!</button></td>
                <td><button class="btn-danger" onclick="deleteToDo(${each.id})" data-testid="deleteButton">Delete</button></td>
            </tr>
            `
            } else {
                tasksToDOM.innerHTML += `
            <tr data-testid="toDoItem">
                <td>${each.text}</td>
                <td><button class="btn-success" onclick="markComplete(${each.id})" data-testid="completeButton">Mark Complete</button></td>
                <td><button class="btn-danger" onclick="deleteToDo(${each.id})" data-testid="deleteButton">Delete</button></td>
            </tr>
            `
            } 
        }
    })
}
fetchAndRenderToDo(); 

function clearInputs(){
    document.getElementById("toDoInput").value = '';
}

function addToDo(event){
    event.preventDefault(); 
let toDoText= document.getElementById("toDoInput").value; 

axios({
    method: 'POST',
    url: '/todos',
    data: {toDoText}
}).then((response) => {
    clearInputs(); 
    fetchAndRenderToDo(); 
}).catch((error) => {
    console.log('Error in POST route', error);
}); 
}


function deleteToDo(toDOId){
console.log('To do ID is:', toDOId);
axios({
    method: 'DELETE',
    url: `/todos/${toDOId}`
}).then((response) => {
    fetchAndRenderToDo();
}).catch((error) => {
    console.log('deleteToDO broke and this is why:', error);
})
}

function markComplete (toDOId){
    // use axios to make a PUT request to todos/:id
    axios({
        method: 'PUT',
        url: `/todos/${toDOId}`
    }).then((response) => {
        fetchAndRenderToDo(); 
    }).catch((error) => {
        console.log('Error in PUT route:', error);
        alert('Error updating to do to complete'); 
    })
}