const devicesHTML = document.getElementById('devicesList');
const alerts = document.getElementById('alerts');

//modal elements
const form = document.getElementById('form');
const zoneModal = document.getElementById('zones');
const nameModal = document.getElementById('name');
const typeModal = document.getElementById('deviceType');
const idModal = document.getElementById('id');
const btnAdd = document.getElementById('addDevice');
const alertModal = document.getElementById('alertModal');

//Buttons

let btnsDelete = null;
let btnsEdit = null;

let devices = [
    {
        zone: 'Living room',
        name: 'beo play sound',
        deviceType: 'player',
        id: 'PS-122'
    }
];

function addDeviceModal(e) {
    e.preventDefault();
    if (zoneModal.value && nameModal.value && typeModal.value && idModal.value) {

        let newDevice = {
            zone: zoneModal.vale,
            name: nameModal.value,
            deviceType: typeModal.value,
            id: idModal.value
        }

        devices.push(newDevice);
        listDevices();
        showAlert(alerts, 'Device saved', 'alert-success', 2000);
    } else {
        showAlert(alertModal, 'Empty fields, please fill the form', 'alert-danger', 3000);
    }
}

function listDevices() {
    let listDevicesHtml = devices.map((device, index) => `
    <tr>
        <th class="title1" scope="row">${index + 1}</th>
        <td>${device.name}</td>
        <td>${device.zone}</td>
        <td>@${device.id}</td>
        <td>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-primary ico edit"><i
                        class="fas fa-pencil-alt"></i></button>
                <button type="button" class="btn btn-danger delete"><i class="fas fa-trash-alt"></i></button>
            </div>
        </td>
    </tr>
    `).join('');

    devicesHTML.innerHTML = listDevicesHtml;

    btnsDelete = document.getElementsByClassName("delete");
    Array.from(btnsDelete).forEach(element => {
        element.onclick = deleteItem;
    });

    btnsEdit = document.getElementsByClassName("edit");
    Array.from(btnsEdit).forEach(element => {
        element.onclick = editItem;
    });
}

function deleteItem(e) { // DELETE INFO
    e.preventDefault();
    index = e.target.dataset.index;
    devices.splice(index, 1);
    listDevices();
}
function editItem(e) { // DELETE INFO
    e.preventDefault();
    index = e.target.dataset.index;
    devices.splice(index, 1);
    listDevices();
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

listDevices();

btnAdd.onclick = addDeviceModal;