
const machines = require('../../mockData/machines.json');

const allMachinesReducer = (state = machines, action) => {
    switch (action.type) {
        case 'editMachine': {
            const { originalIds, newFields } = action.payload
            const { originalPrimaryId, originalSecondaryId } = originalIds
            const newAllInventory = {...state}

            const itemIndex = newAllInventory[originalPrimaryId].findIndex(item => item.machineId === originalSecondaryId)
            
            const newInventoryDetail = [...newAllInventory[originalPrimaryId]]
            newInventoryDetail[itemIndex] = {...newFields}

            newAllInventory[originalPrimaryId] = [...newInventoryDetail]

            state = {...newAllInventory}
            return state;
        }
        case 'deleteMachine': {
            const { primaryId, secondaryId } = action.payload
            const machineDetail = state[primaryId]
            const newMachineDetail = machineDetail.filter(item => item.machineId !== secondaryId)
            state[primaryId] = newMachineDetail
            return state;
        }
        default:
            return state;
        }
}

export default allMachinesReducer;