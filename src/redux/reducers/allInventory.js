
const inventory = require('../../mockData/inventory.json');

const allInventoryReducer = (state = inventory, action) => {
    switch (action.type) {
        case 'deleteItem':
            const { primaryId, secondaryId } = action.payload
            const inventoryDetail = state[primaryId]
            const newInventoryDetail = inventoryDetail.filter(item => item.itemId !== secondaryId)
            state[primaryId] = newInventoryDetail
            return state;
        default:
            return state;
        }
}

export default allInventoryReducer;