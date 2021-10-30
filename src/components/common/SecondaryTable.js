import { forwardRef } from 'react';
import MaterialTable from "material-table";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';

export default function SecondaryTable({ secondaryDetail }) {
  
  console.log({secondaryDetail})
  const isWarehouse = secondaryDetail[0].warehouseId || secondaryDetail[0].warehouseId === 0
  const title = isWarehouse ? 'INVENTORY ITEMS' : 'MACHINES'

  let columns = []
  if (isWarehouse) {
    columns = [
      {
        title: "ID",
        field: "itemId",
        width: "12%"
      },
      {
        title: "SKU",
        field: "itemSKU",
        width: "15%"
      },
      {
        title: "QUANTITY",
        field: "itemQuantity",
        width: "15%"
      },
      {
        title: "NAME",
        field: "itemName",
        width: "18%"
      },
      {
        title: "DESCRIPTION",
        field: "itemDescription",
        width: "40%"
      }
    ]
  } else {
    columns = [
      {
        title: "ID",
        field: "machineId",
        width: "15%"
      },
      {
        title: "NAME",
        field: "machineName",
        width: "15%",
      },
      {
        title: "DESCRIPTION",
        field: "machineDescription",
        width: "70%"
      }
    ]
  }
  return (
      <div className="m-1 secondary-table">
        <MaterialTable
          title={title}
          columns={columns}
          data={ secondaryDetail }
          options={{ pageSize: 5 }}
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