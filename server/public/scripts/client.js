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
            tasksToDOM.innerHTML += `
            <tr data-testid="toDoItem">
                <td>${each.text}</td>
                <td><button onclick="markComplete(${each.id})" data-testid="completeButton">Mark Complete</button></td>
                <td><button onclick="deleteToDo(${each.id})" data-testid="deleteButton">Delete</button></td>
            </tr>
            `
        }
    })
}
fetchAndRenderToDo(); 

function addToDo(event){
    event.preventDefault(); 
let toDoText= document.getElementById("toDoInput").value

axios({
    method: 'POST',
    url: '/todos',
    data: {toDoText}
}).then((response) => {
    newToDo = ''; 
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

function markToDoComplete (toDOId){
    // use axios to make a PUT request to todos/:id
    axios({
        method: 'PUT'
        url: `/todos/${toDOId}`,
        data: {
        isComplete: isComplete
        }
    }).then((response) => {
        fetchAndRenderToDo(); 
    }).catch((error) => {
        console.log('Error in PUT route:', error);
        alert('Error updating to do to complete'); 
    })
}