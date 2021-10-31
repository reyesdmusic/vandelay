const factories = require('../../mockData/factories.json');

const allFactoriesReducer = (state = factories, action) => {
    switch (action.type) {
        default:
            return state;
        }
}

export default allFactoriesReducer;