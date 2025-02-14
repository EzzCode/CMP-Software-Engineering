function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.setAttribute('name', 'delete');
        deleteButton.setAttribute('id', item.id);
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button
document.getElementById('submit').addEventListener('click', createEmployee);

// TODO
// add event listener to delete button
document.getElementById('dataTable').addEventListener('click', (e) => {
  if (e.target.name === 'delete') {
    deleteEmployee(e.target.id);
  }
});



// TODO
function createEmployee (){
  // get data from input field
  // send data to BE
  // call fetchEmployees
  const name = document.getElementById('name').value;
  const id = document.getElementById('id').value;
  if (!id || !name) {
    return;
  }
  event.preventDefault();


  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, name })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    fetchEmployees();
  })
  .catch(error => console.error('Error:', error));
  document.getElementById('name').value = '';
  document.getElementById('id').value = '';
}

// TODO
function deleteEmployee (id){
  event.preventDefault();
  // get id
  // send id to BE
  // call fetchEmployees
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: 'DELETE'
  })
  .then(res => res.json())
  .then(data => {
    console.log('Employee deleted:', data);
    fetchEmployees();
  })
  .catch(error => console.error('Error:', error));
}

fetchEmployees()
