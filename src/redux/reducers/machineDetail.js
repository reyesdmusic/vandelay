const machines = require('../../mockData/machines.json');

const machineDetailReducer = (state = machines[0], action) => {
    switch (action.type) {
        case 'deleteMachine':
            const { secondaryId } = action.payload
            const machineDetail = state
            const newMachineDetail = machineDetail.filter(item => item.machineId !== secondaryId)
            state = newMachineDetail
            return state;
        case 'setMachineDetail':
            const { id, secondaryData } = action.payload
            return state = secondaryData[id];
        default:
            return state;
        }
}

export default machineDetailReducer;