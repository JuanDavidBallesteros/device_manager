const zonesHTML = document.getElementById('zonesList');
const alerts = document.getElementById('alerts');
let hiddenElement = document.getElementById('index');

//modal elements
const form = document.getElementById('form');
const sizeModal = document.getElementById('size');
const nameModal = document.getElementById('name');
const idModal = document.getElementById('id');

const btnAdd = document.getElementById('addModal');
const btnCancel = document.getElementById('cancel');
const alertModal = document.getElementById('alertModal');

let zones = [
    {
        name: 'Living Room',
        size: '15 to 30 mts',
        id: 'A-23',
        devices: []
    }
];

function addDeviceModal(e) {
    e.preventDefault();
    if (sizeModal.value && nameModal.value && idModal.value || sizeModal.value === 'Size' && nameModal.value && idModal.value) {
        let data = {
            size: sizeModal.value,
            name: nameModal.value,
            id: `#${idModal.value}`,
            devices: []
        }
        if (btnAdd.innerHTML === 'Save') {
            zones.push(data);
            listZones();
            $('#exampleModal').modal('hide'); //or  $('#IDModal').modal('toggle');
            showAlert(alerts, 'Device saved', 'alert-success', 2000);
            resetModal();
        } else if(btnAdd.innerHTML === 'Update'){
            zones[hiddenElement] = data;
            listZones();
            $('#exampleModal').modal('hide'); //or  $('#IDModal').modal('toggle');
            showAlert(alerts, 'Device updated', 'alert-success', 2000);
            resetModal();
        }

    } else {
        showAlert(alertModal, 'Empty fields, please fill the form', 'alert-danger', 3000);
    }
}

function listZones() {
    let listZonesHtml = zones.map((device, index) => `
    <tr>
        <th class="title1" scope="row">${index + 1}</th>
        <td>${device.name}</td>
        <td>${device.size}</td>
        <td>${device.devices}</td>
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

    zonesHTML.innerHTML = listZonesHtml;
}

function deleteItem(element) { // DELETE INFO
    index = element.dataset.index;
    console.log(index);
    zones.splice(index, 1);
    listZones();
}

function editItem(element) { // EDIT INFO
    index = element.dataset.index;
    hiddenElement = index;

    $('#exampleModal').modal('show');

    sizeModal.value = zones[index].size;
    nameModal.value = zones[index].name;
    idModal.value = zones[index].id;

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
    sizeModal.value = 'Size';
    nameModal.value = '';
    idModal.value = '';
}

listZones();
resetModal();
btnAdd.onclick = addDeviceModal;
btnCancel.onclick = resetModal;
