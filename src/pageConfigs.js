const pageConfigs = [
    {
        type: 'Warehouses',
        url: '/vandelay/warehouses',
        primaryIdKey: 'warehouseId',
        primaryNameKey: 'warehouseName',
        secondaryIdKey: 'itemId',
        secondaryNameKey: 'itemName',
        primaryReducer: 'allWarehousesReducer',
        secondaryReducer: 'allInventoryReducer',
        primaryDetailReducer: 'warehouseDetailReducer',
        secondaryDetailReducer: 'inventoryDetailReducer',
        secondaryTableTitle: 'INVENTORY ITEMS',
        inputFields: [
            { dataKey: 'itemId', dataType: 'number', label: 'Item ID'},
            { dataKey: 'itemSKU', dataType: 'number', label: 'Item SKU'},
            { dataKey: 'itemQuantity', dataType: 'number', label: 'Item Quantity'},
            { dataKey: 'itemName', dataType: 'text', label: 'Item Name'},
            { dataKey: 'itemDescription', dataType: 'text', label: 'Description'}
        ],
        isWarehouse:  true
    },
    {
        type: 'Factories',
        url: '/vandelay/factories',
        primaryIdKey: 'factoryId',
        primaryNameKey: 'factoryName',
        secondaryIdKey: 'machineId',
        secondaryNameKey: 'machineName',
        primaryReducer: 'allFactoriesReducer',
        secondaryReducer: 'allMachinesReducer',
        primaryDetailReducer: 'factoryDetailReducer',
        secondaryDetailReducer: 'machineDetailReducer',
        secondaryTableTitle: 'MACHINES',
        inputFields: [
            { dataKey: 'machineId', dataType: 'number', label: 'Machine ID'},
            { dataKey: 'machineName', dataType: 'text', label: 'Machine Name'},
            { dataKey: 'machineDescription', dataType: 'text', label: 'Description'}
        ], 
        isWarehouse: false
    }
]

export default pageConfigs