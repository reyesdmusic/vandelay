import './App.css';
import Nav from './components/common/Nav';
import PageContainer from './components/PageContainer'
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import pageConfigs from './pageConfigs';
import warehouses from  './mockData/warhouses.json'
import inventory from  './mockData/inventory.json'
import factories from  './mockData/factories.json'
import machines from  './mockData/machines.json'

function App() {
  const [allWarehouses, setAllWarehouses] = useState(warehouses)
  const [allInventory, setAllInventory] = useState(inventory)
  const [warehouseDetail, setWarehouseDetail] = useState(allWarehouses[0])
  const [inventoryDetail, setInventoryDetail] = useState(allInventory[0])
  const [allFactories, setAllFactories] = useState(factories)
  const [allMachines, setAllMachines] = useState(machines)
  const [factoryDetail, setFactoryDetail] = useState(allFactories[0])
  const [machineDetail, setMachineDetail] = useState(allMachines[0])


  const warehouseCRUD = {
    getWarehouseDetail: async (id) => {
      try {
        setWarehouseDetail({ ...allWarehouses[id] })
      } catch (err) {
        console.error(err)
      }
    }
  }

  const factoryCRUD = {
    getFactoryDetail: async (id) => {
      try {
        setFactoryDetail({ ...allFactories[id] })
      } catch (err) {
        console.error(err)
      }
    }
  }

  const inventoryCRUD = {
    deleteItem: async (itemId, warehouseId) => {
      try {
        const newInventoryDetail = allInventory[warehouseId].filter(item => item.itemId !== itemId)
        const newAllInventory = allInventory
        newAllInventory[warehouseId] = newInventoryDetail
        setAllInventory({ ...newAllInventory })
        setInventoryDetail([ ...newInventoryDetail ])
      } catch (err) {
        console.error(err)
      }
    },
    getInventoryDetail: async (warehouseId = 0) => {
      try {
        const newInventoryDetail = allInventory[warehouseId]
        setInventoryDetail([ ...newInventoryDetail ])

      } catch (err) {
        console.error(err)
      } 
    }
  }

  const machineCRUD = {
    deleteMachine: async (machineId, factoryId) => {
      try {
        const newMachineDetail = allMachines[factoryId].filter(machine => machine.machineId !== machineId)
        const newAllMachines = allMachines
        newAllMachines[factoryId] = newMachineDetail
        setAllMachines({ ...newAllMachines })
        setMachineDetail([ ...newMachineDetail ])
      } catch (err) {
        console.error(err)
      }
    },
    getMachineDetail: async (factoryId = 0) => {
      try {
        const newMachineDetail = allMachines[factoryId]
        setMachineDetail([ ...newMachineDetail ])

      } catch (err) {
        console.error(err)
      } 
    }
  }

  function setDetails (newPrimaryId, type) {
    console.log({newPrimaryId, type})
    if (type === 'Warehouses') {
      warehouseCRUD.getWarehouseDetail(newPrimaryId)
      inventoryCRUD.getInventoryDetail(newPrimaryId)
    } else {
      factoryCRUD.getFactoryDetail(newPrimaryId)
      machineCRUD.getMachineDetail(newPrimaryId)
    }
    
  }

  return (
    <Router>
      <div className="App">
        <Nav pages={pageConfigs} />
        <Switch>
          <Route exact path="/">
            <Redirect to="/warehouses" />
          </Route>
          {pageConfigs.map(({ type, url }) => (
            <Route
              key={type} 
              path={url} 
              render={props => (
                <PageContainer { ...props } 
                  type={type} 
                  setDetails={setDetails}
                  allPrimaryData={type === 'Warehouses' ? allWarehouses : allFactories}
                  primaryDetail={type === 'Warehouses' ? warehouseDetail : factoryDetail}
                  secondaryDetail={type === 'Warehouses' ? inventoryDetail : machineDetail}
                  primaryCRUD={type === 'Warehouses' ? warehouseCRUD : factoryCRUD} 
                  secondaryCRUD={type === 'Warehouses' ? inventoryCRUD : machineCRUD} 
                />)}
            />))}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
