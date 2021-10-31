
const inventory = require('../../mockData/inventory.json');

const allInventoryReducer = (state = inventory, action) => {
    switch (action.type) {
        case 'addItem':{
            const { newFields } = action.payload
            const newAllInventory = {...state}
            newAllInventory[newFields.warehouseId] = [...newAllInventory[newFields.warehouseId], newFields]
            state = { ...newAllInventory }
            return state;
        }
        case 'editItem': {
            const { originalIds, newFields } = action.payload
            const { originalPrimaryId, originalSecondaryId } = originalIds
            const newAllInventory = {...state}

            const itemIndex = newAllInventory[originalPrimaryId].findIndex(item => item.itemId === originalSecondaryId)
            
            const newInventoryDetail = [...newAllInventory[originalPrimaryId]]
            newInventoryDetail[itemIndex] = {...newFields}

            newAllInventory[originalPrimaryId] = [...newInventoryDetail]

            state = {...newAllInventory}
            return state;
        }
        case 'deleteItem': {
            const { primaryId, secondaryId } = action.payload
            const inventoryDetail = state[primaryId]
            const newInventoryDetail = inventoryDetail.filter(item => item.itemId !== secondaryId)
            state[primaryId] = newInventoryDetail
            return state;
        }
        default:
            return state;
        }
}

export default allInventoryReducer;