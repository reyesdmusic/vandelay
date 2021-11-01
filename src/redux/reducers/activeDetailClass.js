const activeDetailClassReducer = (state = false, action) => {
    switch (action.type) {
        case 'setActiveDetailClass': {
            return !state;
        }
        default:
            return state;
        }
}

export default activeDetailClassReducer;