
const machines = require('../../mockData/machines.json');

const allMachinesReducer = (state = machines, action) => {
    switch (action.type) {
        case 'deleteMachine':
            const { primaryId, secondaryId } = action.payload
            const machineDetail = state[primaryId]
            const newMachineDetail = machineDetail.filter(item => item.machineId !== secondaryId)
            state[primaryId] = newMachineDetail
            return state;
        default:
            return state;
        }
}

export default allMachinesReducer;