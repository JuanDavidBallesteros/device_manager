const devicesHTML = document.getElementById('devicesList');
const alerts = document.getElementById('alerts');
const addDeviceBtn = document.getElementById('addDeviceButton');
let hiddenElement = document.getElementById('index');

//modal elements
const form = document.getElementById('form');
const zoneModal = document.getElementById('zoneDevices');
const nameModal = document.getElementById('name');
const typeModal = document.getElementById('deviceType');
const idModal = document.getElementById('id');
const btnAdd = document.getElementById('addDevice');
const btnCancel = document.getElementById('cancelDevice');
const alertModal = document.getElementById('alertModal');

//backend
const url = 'https://devices-backend-juandavidballesteros.vercel.app/devices';

let devices = [];

async function loadZones() {
    let zoneOptionsHTML = '';
    let zones = [];
    try {

        const dataZones = await fetch('https://devices-backend-juandavidballesteros.vercel.app/zones');
        const serverZones = await dataZones.json();
        if (Array.isArray(serverZones) && serverZones !== undefined) {
            zones = serverZones;
            //serverZones.sort(serverZones.name);
        }
        if (zones.length > 0) {
            zoneOptionsHTML = zones.map((zone, index) =>
                `
                    <option value='${zone.name}'>${zone.name}</option>
                `
            ).join('');
            zoneModal.innerHTML = `
            <option value=''>Zones</option>
            ${zoneOptionsHTML}
        `
            return;
        }
        zoneModal.innerHTML = `
            <option value=''>Add Zones</option>
        `
    } catch (error) {
        throw error;
    }
}

async function listDevices() {
    try {
        const data = await fetch(url);
        const dataServer = await data.json();
        if (Array.isArray(dataServer) && dataServer !== undefined) {
            devices = dataServer;
        }

        if (devices.length > 0) {
            let listDevicesHtml = devices.map((device, index) => `
    <tr>
        <th class="title1" scope="row">${index + 1}</th>
        <td>${device.name}</td>
        <td>${device.zone}</td>
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

            devicesHTML.innerHTML = listDevicesHtml;
            return;
        }
        let listDevicesHtml = `
            <tr>
                <td colspan="5">Devices list is empty</td>
            </tr>
        `
        devicesHTML.innerHTML = listDevicesHtml;

    } catch (error) {
        showAlert(alerts, 'Unable to load the data', 'alert-danger', 3000);
        throw error;
    }
}

async function addDeviceModal(e) {
    e.preventDefault();
    if (zoneModal.value && nameModal.value && typeModal.value && idModal.value ||
        zoneModal.value === 'Zone' && typeModal.value === 'Device Type' ||
        zoneModal.value === 'Add Zones') {
        let newDevice = {
            zone: zoneModal.value,
            name: nameModal.value,
            deviceType: typeModal.value,
            id: `#${idModal.value}`
        };
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
                body: JSON.stringify(newDevice),
                mode: 'cors',
            });
            if (response.ok) {
                if (saveAlert) {
                    showAlert(alerts, 'Device saved', 'alert-success', 2000);
                } else {
                    showAlert(alerts, 'Device updated', 'alert-success', 2000);
                }
                $('#exampleModal').modal('hide'); //or  $('#IDModal').modal('toggle');
                listDevices();
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


async function deleteItem(element) { // DELETE INFO
    index = element.dataset.index;
    const urlToSend = `${url}/${index}`;
    try {
        const response = await fetch(urlToSend, {
            method: 'DELETE',
        });
        if (response.ok) {
            listDevices();
        }
    } catch (error) {
        showAlert(alerts, error, 'alert-danger', 3000);
        throw error;
    }
}

function editItem(element) { // EDIT INFO
    loadZones();
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

function resetModal() {
    btnAdd.innerHTML = 'Save';
    zoneModal.value = 'Zone';
    nameModal.value = '';
    typeModal.value = 'Device Type';
    idModal.value = '';
}

listDevices();

resetModal();

form.onsubmit = addDeviceModal;
btnAdd.onclick = addDeviceModal;
btnCancel.onclick = resetModal;
addDeviceButton.onclick = loadZones;

