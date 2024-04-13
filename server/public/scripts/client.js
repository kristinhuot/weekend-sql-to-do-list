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
                <td>${each.isComplete}</td>
                <td><button>Delete</button></td>
            </tr>
            `
        }
    })
}
fetchAndRenderToDo(); 