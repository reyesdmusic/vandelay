const inventory = require('../../mockData/inventory.json');

const inventoryDetailReducer = (state = inventory[0], action) => {
    switch (action.type) {
        case 'addItem': {
            const { newFields } = action.payload
            const newState = [...state, newFields]
            state = [...newState]
            return state;
        }
        case 'editItem': {
            const { originalIds, newFields } = action.payload
            const newState = [...state]
            const itemIndex = newState.findIndex(item => item.itemId === originalIds.originalSecondaryId)
            newState[itemIndex] = {...newFields}
            state = [...newState]
            return state;
        }
        case 'deleteItem': {
            const { secondaryId } = action.payload
            const inventoryDetail = state
            const newInventoryDetail = inventoryDetail.filter(item => item.itemId !== secondaryId)
            state = newInventoryDetail
            return state;
        }
        case 'setInventoryDetail': {
            const { id, secondaryData } = action.payload
            return state = secondaryData[id];
        }
        default:
            return state;
        }
}

export default inventoryDetailReducer;