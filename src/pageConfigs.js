const warehouses = require('./mockData/warhouses.json')
const factories = require('./mockData/factories.json')
const inventory = require('./mockData/inventory.json')
const machines = require('./mockData/machines.json')

const pageConfigs = [
    {
        name: 'Warehouses',
        url: '/warehouses',
        primaryData: warehouses,
        secondaryData: inventory
    },
    {
        name: 'Factories',
        url: '/factories',
        primaryData: factories,
        secondaryData: machines
    }
]

export default pageConfigs