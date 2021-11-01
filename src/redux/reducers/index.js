import allWarehousesReducer from './allWarehouses';
import allFactoriesReducer from './allFactories';
import allInventoryReducer from './allInventory';
import allMachinesReducer from './allMachines';
import detailIdReducer from './detailId';
import activeRowClassReducer from './activeRowClass';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    allWarehousesReducer,
    allFactoriesReducer,
    allInventoryReducer,
    allMachinesReducer,
    detailIdReducer,
    activeRowClassReducer
})

export default allReducers;
