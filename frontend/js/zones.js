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

//backend
const url = 'https://devices-backend-juandavidballesteros.vercel.app/zones';

let zones = [];
let zonesDevices = [];

async function listZones() {

    try {

        const data = await fetch(url);
        const dataServer = await data.json();
        if (Array.isArray(dataServer) && dataServer !== undefined) {
            zones = dataServer;
            zones.forEach((zone) => {
                showZoneDevices(zone);
            });
        }
        /* console.log(zones);
        console.log(zonesDevices); */
        if (zones.length > 0) {
            let listZonesHtml = zones.map((zone, index) =>
                `
    <tr>
        <th class="title1" scope="row">${index + 1}</th>
        <td>${zone.name}</td>
        <td>${zone.size}</td>
        <td>${zonesDevices[index]}
        </td>
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
            return;
        }
        let listZonesHtml = `
            <tr>
                <td colspan="5">Zones list is empty</td>
            </tr>
        `
        zonesHTML.innerHTML = listZonesHtml;

    } catch (error) {
        showAlert(alerts, 'Unable to load the data', 'alert-danger', 3000);
        throw error;
    }

}


async function showZoneDevices(zone) {
    zoneDevices = [];
    let list = await listDevicesInZone(zone.name);
    zonesDevices.push(list);
}

async function listDevicesInZone(zoneName) {
    let devices = [];
    try {
        const data = await fetch('https://devices-backend-juandavidballesteros.vercel.app/devices');
        const dataServer = await data.json();
        if (Array.isArray(dataServer) && dataServer !== undefined) {
            devices = dataServer;
        }
        let list = devices.filter((device) => device.zone == zoneName);
        list = list.map((device) => `${device.name}`).join('-');
        return list;
    } catch (error) {
        showAlert(alerts, error, 'alert-danger', 3000);
        throw error;
    }
}

async function addZoneModal(e) {
    e.preventDefault();
    if (sizeModal.value && nameModal.value && idModal.value || sizeModal.value === 'Size' && nameModal.value && idModal.value) {
        let data = {
            size: sizeModal.value,
            name: nameModal.value,
            id: `#${idModal.value}`,
            devices: []
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
                listZones();
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
            listZones();
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
btnAdd.onclick = addZoneModal;
btnCancel.onclick = resetModal;
