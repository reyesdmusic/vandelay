
const warehouses = require('../../mockData/warehouses.json');

const allWarehousesReducer = (state = warehouses, action) => {
    switch (action.type) {
        default:
            return state;
        }
}

export default allWarehousesReducer;