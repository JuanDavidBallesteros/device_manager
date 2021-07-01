const devicesHTML = document.getElementById('devicesList');
const alerts = document.getElementById('alerts');
let hiddenElement = document.getElementById('index');

//modal elements
const form = document.getElementById('form');
const zoneModal = document.getElementById('zone');
const nameModal = document.getElementById('name');
const typeModal = document.getElementById('deviceType');
const idModal = document.getElementById('id');
const btnAdd = document.getElementById('addDevice');
const alertModal = document.getElementById('alertModal');

let devices = [
    {
        zone: 'Living room',
        name: 'Beo play sound',
        deviceType: 'Player',
        id: 'PS-122'
    }
];

function addDeviceModal(e) {
    e.preventDefault();
    if (zoneModal.value && nameModal.value && typeModal.value && idModal.value) {
        let newDevice = {
            zone: zoneModal.value,
            name: nameModal.value,
            deviceType: typeModal.value,
            id: idModal.value
        }
        if (btnAdd.innerHTML === 'Save') {
            devices.push(newDevice);
            listDevices();
            $('#exampleModal').modal('hide'); //or  $('#IDModal').modal('toggle');
            showAlert(alerts, 'Device saved', 'alert-success', 2000);
        } else if(btnAdd.innerHTML === 'Update'){
            devices[hiddenElement] = newDevice;
            listDevices();
            $('#exampleModal').modal('hide'); //or  $('#IDModal').modal('toggle');
            showAlert(alerts, 'Device updated', 'alert-success', 2000);
            btnAdd.innerHTML = 'Save';
        }

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
                <button type="button" class="btn btn-primary ico edit" data-index=${index} onclick="editItem(this)"><i
                        class="fas fa-pencil-alt"></i></button>
                <button type="button" class="btn btn-danger delete" data-index=${index} onclick="deleteItem(this)"><i 
                        class="fas fa-trash-alt"></i></button>
            </div>
        </td>
    </tr>
    `).join('');

    devicesHTML.innerHTML = listDevicesHtml;
}

function deleteItem(element) { // DELETE INFO
    index = element.dataset.index;
    console.log(index);
    devices.splice(index, 1);
    listDevices();
}
function editItem(element) { // EDIT INFO
    index = element.dataset.index;
    hiddenElement = index;

    $('#exampleModal').modal('show');

    zoneModal.value = devices[index].zone;
    nameModal.value = devices[index].name;
    typeModal.value = devices[index].deviceType;
    idModal.value = devices[index].id;

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

listDevices();

btnAdd.onclick = addDeviceModal;
