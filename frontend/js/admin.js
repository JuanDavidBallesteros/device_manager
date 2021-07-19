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

let admins = [];

//backend
const url = 'https://devices-backend-juandavidballesteros.vercel.app/administrators';

async function addAmdinModal(e) {
    e.preventDefault();
    if (lastNameModal.value && nameModal.value && idModal.value) {
        let data = {
            lastName: lastNameModal.value,
            name: nameModal.value,
            id: idModal.value,
        }
        try {
            let method = 'POST';
            let urlToSend = url;
            let saveAlert = true;
            if (btnAdd.innerHTML === 'Update') {
                method = 'PUT';
                urlToSend = `${url}/${hiddenElement}`;
                saveAlert = false;
            }
            let response = await fetch(urlToSend, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                mode: 'cors',
            });
            if (response.ok) {
                if (saveAlert) {
                    showAlert(alerts, 'Device saved', 'alert-success', 2000);
                } else {
                    showAlert(alerts, 'Device updated', 'alert-success', 2000);
                }
                $('#exampleModal').modal('hide'); //or  $('#IDModal').modal('toggle');
                listAdmins();
                resetModal();
            }
        } catch (error) {
            showAlert(alerts, error, 'alert-danger', 3000);
            throw error;
        }
    } else {
        showAlert(alertModal, 'Empty fields, please fill the form', 'alert-danger', 3000);
    }
}

async function listAdmins() {
    try {
        const data = await fetch(url);
        const dataServer = await data.json();
        if (Array.isArray(dataServer) && dataServer !== undefined) {
            admins = dataServer;
        }

        if (admins.length > 0) {
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
            return;
        }
        let listAdminsHtml = `
            <tr>
                <td colspan="5">Admins list is empty</td>
            </tr>
        `
        adminsHTML.innerHTML = listAdminsHtml;

    } catch (error) {
        showAlert(alerts, 'Unable to load the data', 'alert-danger', 3000);
        throw error;
    }
}

async function deleteItem(element) { // DELETE INFO
    index = element.dataset.index;
    const urlToSend = `${url}/${index}`;
    try {
        const response = await fetch(urlToSend, {
            method: 'DELETE',
        });
        if (response.ok) {
            listAdmins();
        }
    } catch (error) {
        showAlert(alerts, error, 'alert-danger', 3000);
        throw error;
    }
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
btnAdd.onclick = addAmdinModal;
btnCancel.onclick = resetModal;
