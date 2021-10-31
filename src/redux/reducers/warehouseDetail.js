const warehouses = require('../../mockData/warehouses.json');

const warehouseDetailReducer = (state = warehouses[0], action) => {
    switch (action.type) {
        case 'setWarehouseDetail':
            const { id, primaryData } = action.payload
            return state = primaryData[id];
        default:
            return state;
        }
}

export default warehouseDetailReducer;