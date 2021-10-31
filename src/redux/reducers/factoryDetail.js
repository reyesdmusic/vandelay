const factories = require('../../mockData/factories.json');

const factoryDetailReducer = (state = factories[0], action) => {
    switch (action.type) {
        case 'setFactoryDetail':
            const { id, primaryData } = action.payload
            return state = primaryData[id];
        default:
            return state;
        }
}

export default factoryDetailReducer;