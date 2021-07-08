const adminsHTML = document.getElementById('adminsList');
const alerts = document.getElementById('alerts');
let hiddenElement = document.getElementById('index');

//modal elements
const form = document.getElementById('form');
const lastNameModal = document.getElementById('lastName');
const nameModal = document.getElementById('name');
const idModal = document.getElementById('id');

const btnAdd = document.getElementById('addModal');
const btnCancel = document.getElementById('cancel');
const alertModal = document.getElementById('alertModal');

let admins = [
    {
        name: 'Camilo',
        lastName: 'Perez',
        id: '239002',
    }
];

function addDeviceModal(e) {
    e.preventDefault();
    if (lastNameModal.value && nameModal.value && idModal.value) {
        let data = {
            lastName: lastNameModal.value,
            name: nameModal.value,
            id: idModal.value,
        }
        if (btnAdd.innerHTML === 'Save') {
            admins.push(data);
            listAdmins();
            $('#exampleModal').modal('hide'); //or  $('#IDModal').modal('toggle');
            showAlert(alerts, 'Device saved', 'alert-success', 2000);
            resetModal();
        } else if(btnAdd.innerHTML === 'Update'){
            admins[hiddenElement] = data;
            listAdmins();
            $('#exampleModal').modal('hide'); //or  $('#IDModal').modal('toggle');
            showAlert(alerts, 'Device updated', 'alert-success', 2000);
            resetModal();
        }

    } else {
        showAlert(alertModal, 'Empty fields, please fill the form', 'alert-danger', 3000);
    }
}

function listAdmins() {
    let listAdminsHtml = admins.map((device, index) => `
    <tr>
        <th class="title1" scope="row">${index + 1}</th>
        <td>${device.name}</td>
        <td>${device.lastName}</td>
        <td>${device.id}</td>
        <td>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-primary ico edit" data-index=${index} onclick="editItem(this)"><i
                        class="fas fa-pencil-alt"></i></button>
                <button type="button" class="btn btn-danger delete" data-index=${index} onclick="deleteItem(this)"><i 
                        class="fas fa-trash-alt"></i></button>
            </div>
        </td>
    </tr>
    `).join('');

    adminsHTML.innerHTML = listAdminsHtml;
}

function deleteItem(element) { // DELETE INFO
    index = element.dataset.index;
    console.log(index);
    admins.splice(index, 1);
    listAdmins();
}

function editItem(element) { // EDIT INFO
    index = element.dataset.index;
    hiddenElement = index;

    $('#exampleModal').modal('show');

    lastNameModal.value = admins[index].size;
    nameModal.value = admins[index].name;
    idModal.value = admins[index].id;

    btnAdd.innerHTML = 'Update';
}

function showAlert(alert, ms, type, time) {
    alert.classList.remove(`d-none`);
    alert.classList.add(type);
    alert.innerText = ms;

    setTimeout(() => {
        return hideAlert(alert, type)
    }, time);
}

function hideAlert(alert, type) {
    alert.classList.add('d-none');
    alert.classList.remove(`${type}`);
    alert.innerText = '';
}

function resetModal() {
    btnAdd.innerHTML = 'Save';
    lastNameModal.value = '';
    nameModal.value = '';
    idModal.value = '';
}

listAdmins();
resetModal();
btnAdd.onclick = addDeviceModal;
btnCancel.onclick = resetModal;
