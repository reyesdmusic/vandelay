export const setFactoryDetail = (id, primaryData) => {
    return {
        type: 'setFactoryDetail',
        payload: { id, primaryData }
    }
};

export const setWarehouseDetail = (id, primaryData) => {
    return {
        type: 'setWarehouseDetail',
        payload: { id, primaryData }
    }
};

export const setMachineDetail = (id, secondaryData) => {
    return {
        type: 'setMachineDetail',
        payload: { id, secondaryData }
    }
};

export const setInventoryDetail = (id, secondaryData) => {
    return {
        type: 'setInventoryDetail',
        payload: { id, secondaryData }
    }
};

export const deleteItem = (primaryId, secondaryId) => {
    return {
        type: 'deleteItem',
        payload: { primaryId, secondaryId }
    }
};

export const deleteMachine = (primaryId, secondaryId) => {
    return {
        type: 'deleteMachine',
        payload: { primaryId, secondaryId }
    }
};

export const editMachine = (editObj) => {
    return {
        type: 'editMachine',
        payload: editObj
    }
};

export const editItem = (editObj) => {
    return {
        type: 'editItem',
        payload: editObj
    }
};

export const addMachine = (addObj) => {
    return {
        type: 'addMachine',
        payload: addObj
    }
};

export const addItem = (addObj) => {
    return {
        type: 'addItem',
        payload: addObj
    }
};

export const setActiveDetailClass = () => {
    return {
        type: 'setActiveDetailClass'
    }
};