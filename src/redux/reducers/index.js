import allWarehousesReducer from './allWarehouses';
import allFactoriesReducer from './allFactories';
import allInventoryReducer from './allInventory';
import allMachinesReducer from './allMachines';
import factoryDetailReducer from './factoryDetail';
import warehouseDetailReducer from './warehouseDetail';
import inventoryDetailReducer from './inventoryDetail';
import machineDetailReducer from './machineDetail';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    allWarehousesReducer,
    allFactoriesReducer,
    allInventoryReducer,
    allMachinesReducer,
    factoryDetailReducer,
    warehouseDetailReducer,
    inventoryDetailReducer,
    machineDetailReducer

})

export default allReducers;
