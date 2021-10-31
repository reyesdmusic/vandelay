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