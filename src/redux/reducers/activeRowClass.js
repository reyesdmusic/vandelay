const activeRowClassReducer = (state = true, action) => {
    switch (action.type) {
        default:
            return !state;
        }
}

export default activeRowClassReducer;