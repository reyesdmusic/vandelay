const axios = require('axios');
const fs = require('fs');

const warehouses = []

function getRandomInt(max = 1000) {
    return Math.floor(Math.random() * max);
}

function getAddress (name) {
    const buildingName = `${getRandomInt()} ${name}`
    const streetLine1 = `${getRandomInt(10000)} ${direction[getRandomInt(direction.length)]} ${getRandomInt(5000)} ${getRandomInt(2) > 2 ? 'Ave' : 'St'}`
    const streetLine2 =`${getRandomInt(10) > 5 ? `Suite ${getRandomInt(500)}` : ''}`
    const city = `${getRandomInt(2) > 1 ? 'Orlando' : 'Miami'}`
    const stateProvince = 'Florida'
    const zipPostalCode = `3${getRandomInt(9)}${getRandomInt(9)}${getRandomInt(9)}${getRandomInt(9)}`
    const country = 'USA'
    const address = {
        buildingName,
        streetLine1,
        streetLine2,
        city,
        stateProvince,
        zipPostalCode,
        country
    }
    return address
}

async function getText (length = 30) {
    let words
    try {
        const res = await axios.get('http://asdfast.beobit.net/api/', { params: { type: 'word', length: getRandomInt(length) } })
        words = res.data.text
    } catch (err) {
        words = 'In business for over a decade.'
    } 
    return words   
}

const direction = ['N', 'NW', 'NE', 'S', 'SW', 'SE', 'E', 'W']
const names = ['Pruitt', 'Calamine', 'CoBuild', 'Talbott', 'Suarez', 'Miller & Sons', 'Ellsworth', 'Patel', 'South River', 'North Star', 'West End', 'East Broad', 'Jerry', 'Benes', 'Kramer', 'Costanza', 'Newman']
const llc = ['Inc', 'LLC', 'Co', 'Corporation', 'Industries', 'Manufacuring']


async function getWarehouses () {
    for (let i = 0; i <= 50; i++) {
        const warehouseId = i
        const warehouseName = `${getRandomInt() > 500 ? names[getRandomInt(names.length)] : getRandomInt()} ${llc[getRandomInt(llc.length)]}`
        const warehouseDescription = await getText()
        // const address = getAddress(warehouseName)
        // const { 
        //     buildingName,
        //     streetLine1,
        //     streetLine2,
        //     city,
        //     stateProvince,
        //     zipPostalCode,
        //     country
        // } = address
        // const warehouseAddress = `${buildingName}, ${streetLine1} ${streetLine2} ${city}, ${stateProvince} ${zipPostalCode} ${country}`
        const warehouseAddress = getAddress(warehouseName)
        const warehouse = {
            warehouseId,
            warehouseName,
            warehouseDescription,
            warehouseAddress
        }
        const doesExist = oldWarehouse => oldWarehouse.warehouseName === warehouse.warehouseName
        if (warehouses.some(doesExist)) warehouse.warehouseName = `${getRandomInt()} ${warehouse.warehouseName}`
        warehouses.push(warehouse)
    }

    fs.writeFile('warhouses.json', JSON.stringify(warehouses), 'utf8', err => err ? console.log(err) : '');
}

async function getInventory () {
    const inventory = {}
    for (let i = 0; i <= 50; i++) {
        const warehouseId = i
        for (let subI = 0; subI <= getRandomInt(100); subI++) {

            const itemId = subI
            const itemSKU = getRandomInt(500000)
            const itemQuantity = getRandomInt(500000)
            let itemName = await getText(1)
            itemName = itemName.split(' ')[0]
            const itemDescription = await getText(10)
            const inventoryItem = {
                warehouseId,
                itemId,
                itemSKU,
                itemQuantity,
                itemName,
                itemDescription
            }
            if (inventory[warehouseId]) {
                inventory[warehouseId] = [...inventory[warehouseId], inventoryItem]
            } else {
                inventory[warehouseId] = [inventoryItem]
            }
        }
    }
    fs.writeFile('inventory.json', JSON.stringify(inventory), 'utf8', err => err ? console.log(err) : '');
    
}

async function getMachines () {
    const machines = {}
    for (let i = 0; i <= 50; i++) {
        const factoryId = i
        for (let subI = 0; subI <= getRandomInt(100); subI++) {

            const machineId = subI
            let machineName = await getText(1)
            machineName = machineName.split(' ')[0]
            const machineDescription = await getText(5)
            const machine = {
                factoryId,
                machineId,
                machineName,
                machineDescription
            }
            if (machines[factoryId]) {
                machines[factoryId] = [...machines[factoryId], machine]
            } else {
                machines[factoryId] = [machine]
            }
        }
    }
    fs.writeFile('machines.json', JSON.stringify(machines), 'utf8', err => err ? console.log(err) : '');
    
}

async function getFactories () {
    const factories = []
    for (let i = 0; i <= 50; i++) {
        const factoryId = i
        const factoryName = `${getRandomInt() > 500 ? names[getRandomInt(names.length)] : getRandomInt()} Factory ${llc[getRandomInt(llc.length)]}`
        const factoryDescription = await getText()
        const factoryAddress = getAddress(factoryName)
        const factory = {
            factoryId,
            factoryName,
            factoryDescription,
            factoryAddress
        }
        const doesExist = oldFactory => oldFactory.factoryName === factory.factoryName
        if (factories.some(doesExist)) factory.factoryName = `${getRandomInt()} ${factory.factoryName}`
        factories.push(factory)
    }

    fs.writeFile('factories.json', JSON.stringify(factories), 'utf8', err => err ? console.log(err) : '');
}

// getMachines()
// getFactories()
// getWarehouses()
getInventory()

