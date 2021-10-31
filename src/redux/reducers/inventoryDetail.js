
const inventory = require('../../mockData/inventory.json');

const inventoryDetailReducer = (state = inventory[0], action) => {
    switch (action.type) {
        case 'deleteItem':
            const { secondaryId } = action.payload
            const inventoryDetail = state
            const newInventoryDetail = inventoryDetail.filter(item => item.itemId !== secondaryId)
            state = newInventoryDetail
            return state;
        case 'setInventoryDetail':
            const { id, secondaryData } = action.payload
            return state = secondaryData[id];
        default:
            return state;
        }
}

export default inventoryDetailReducer;