import { forwardRef } from 'react';
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

export default function BasicTable({ primaryData, secondaryData, name, setDetails }) {
  const isWarehouse = primaryData[0].warehouseId || primaryData[0].warehouseId === 0
  console.log({isWarehouse, primaryData})
  const fieldId = isWarehouse ? 'warehouseId' : 'factoryId'
  const fieldName = isWarehouse ? 'warehouseName' : 'factoryName'

  return (
      <div className='table-container'>
        <MaterialTable
          title={name}
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
                const { buildingName, streetLine1, streetLine2, city, stateProvince, zipPostalCode, country } = addressData
                const name = warehouseName || factoryName
                const address = `${buildingName} ${streetLine1}${streetLine2 ? ` ${streetLine2}` : ''}`
                const description = warehouseDescription || factoryDescription
                const cityStateCountry = `${city}, ${stateProvince} ${zipPostalCode} ${country}`
                return (
                  <div>
                    <div>
                      <span>{name}</span>
                      <ToolTip title={description} placement="right-start" arrow>
                        <InfoOutlinedIcon fontSize="small" className="info-icon" />
                      </ToolTip>
                    </div>
                    <div className="fs-p75 secondary">
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
            console.log(document, event)
            // Get your id from rowData and use with link.
            const secondaryDetail = secondaryData[rowData[fieldId]]
            setDetails(rowData, secondaryDetail)
            console.log(rowData.warehouseId)
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

