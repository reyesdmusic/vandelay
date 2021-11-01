import { forwardRef, useEffect} from 'react';
import MaterialTable from "material-table";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ToolTip from '@mui/material/Tooltip';
import { useSelector, useDispatch } from 'react-redux';
import { setFactoryDetail, setWarehouseDetail, setInventoryDetail, setMachineDetail, setActiveDetailClass } from '../redux/actions'

// Primary table is displayed as a side bar on larger screens
// Primary Data is either Warehouse data or Factory data
export default function PrimaryTable({ type }) {
  const isWarehouse = type === 'Warehouses';

  const dispatch = useDispatch();

  const primaryData = useSelector(state => isWarehouse ? state.allWarehousesReducer : state.allFactoriesReducer);
  const secondaryData = useSelector(state => isWarehouse ? state.allInventoryReducer : state.allMachinesReducer);
  
  const fieldId = isWarehouse ? 'warehouseId' : 'factoryId';
  const fieldName = isWarehouse ? 'warehouseName' : 'factoryName';

  useEffect(() => {

    // on compnent did mount, set first row as active
    const firstRowEl = document.querySelector('tr[path="0"]');
    firstRowEl.classList.add('active-row');

    // on component did mount, set the primary data and secondary data to first items in arrays
    if (isWarehouse) {
      dispatch(setWarehouseDetail(0, primaryData))
      dispatch(setInventoryDetail(0, secondaryData))
    } else {
      dispatch(setFactoryDetail(0, primaryData))
      dispatch(setMachineDetail(0, secondaryData))
    }

    // remove extra space element in primary table header
    const tableHeaderSpacingEl = document.querySelector('.MTableToolbar-spacer-7');
    if (tableHeaderSpacingEl) {
      tableHeaderSpacingEl.remove();
    }

    // add class to search input
    const searchInputEl = document.querySelector('.table-container .MuiFormControl-root.MuiTextField-root.MTableToolbar-searchField-10');
    if (searchInputEl) {
      searchInputEl.classList.add('primary-search-input');
    }
  }, [])

  return (
      <div className='table-container'>
        <h2 class="primary">{type.toUpperCase()}</h2>
        <MaterialTable
          title=""
          columns={[
            {
              title: "ID",
              field: fieldId,
              width: "15%",
              render: rowData => {
                const id = isWarehouse ? rowData.warehouseId : rowData.factoryId
                return (
                  <div>
                    <div>{id}</div>
                  </div>)
              }
            },
            {
              title: "Name",
              field: fieldName,
              width: "85%",
              render: rowData => {
                const { warehouseName, warehouseAddress, warehouseDescription, factoryName, factoryAddress, factoryDescription } = rowData
                const addressData = warehouseAddress || factoryAddress
                const { streetLine1, streetLine2, city, stateProvince, zipPostalCode, country } = addressData
                const name = warehouseName || factoryName
                const address = `${streetLine1}${streetLine2 ? ` ${streetLine2}` : ''}`
                const description = warehouseDescription || factoryDescription
                const cityStateCountry = `${city}, ${stateProvince} ${zipPostalCode} ${country}`
                return (
                  <div>
                    <div>
                      <span className="primary">{name}</span>
                      <ToolTip title={description} placement="right-start" arrow>
                        <InfoOutlinedIcon fontSize="small" className="info-icon" />
                      </ToolTip>
                    </div>
                    <div className="fs-p75">
                      <div>{address}</div>
                      <div>{cityStateCountry}</div>
                    </div>
                  </div>)
              }
            }
          ]}
          data={primaryData}
          options={{ pageSize: 10 }}
          onRowClick={(event, rowData) => {
            const prevActiveEl = document.querySelector('.active-row')
            if (prevActiveEl) {
              prevActiveEl.classList.remove('active-row')
            }
            const rowId = rowData.tableData.id
            const rowEl = document.querySelector(`tr[path="${rowId}"]`)
            if (rowEl) {
              rowEl.classList.add('active-row')
            }
            
            if (isWarehouse) {
              dispatch(setWarehouseDetail(rowData[fieldId], primaryData))
              dispatch(setInventoryDetail(rowData[fieldId], secondaryData))
            } else {
              dispatch(setFactoryDetail(rowData[fieldId], primaryData))
              dispatch(setMachineDetail(rowData[fieldId], secondaryData))
            }

            dispatch(setActiveDetailClass())
            
            event.stopPropagation();
          }}
          icons={{
            Clear: forwardRef((props, ref) => <ClearIcon {...props} ref={ref} />),
            Search: forwardRef((props, ref) => <SearchIcon {...props} ref={ref} />),
            ResetSearch: forwardRef((props, ref) => <ClearIcon {...props} ref={ref} />),
            FirstPage: forwardRef((props, ref) => <FirstPageIcon {...props} ref={ref} />),
            LastPage: forwardRef((props, ref) => <LastPageIcon {...props} ref={ref} />),
            NextPage: forwardRef((props, ref) => <ArrowForwardIosIcon {...props} ref={ref} />),
            PreviousPage: forwardRef((props, ref) => <ArrowBackIosIcon {...props} ref={ref} />),
            SortArrow: forwardRef((props, ref) => <KeyboardArrowDownIcon {...props} ref={ref} />),
          }}
        />
      </div>
  );
}

