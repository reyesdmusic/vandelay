const detailIdReducer = (state = 0, action) => {
    switch (action.type) {
        case 'setDetailId': {
            const { id } = action.payload
            state = id
            return state;
        }
        default:
            return state;
        }
}

export default detailIdReducer;