export const setDetailId = (id) => {
    return {
        type: 'setDetailId',
        payload: { id }
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