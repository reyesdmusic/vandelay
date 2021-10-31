import { forwardRef } from 'react';
import MaterialTable from "material-table";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItem, deleteMachine } from '../../redux/actions'

export default function SecondaryTable({ type }) {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const dispatch = useDispatch()
  const isWarehouse = type === 'Warehouses'
  const secondaryDetail = useSelector(state => isWarehouse ? state.inventoryDetailReducer : state.machineDetailReducer);
  const title = isWarehouse ? 'INVENTORY ITEMS' : 'MACHINES'
  const primaryIdKey = isWarehouse ? 'warehouseId' : 'factoryId'
  const secondaryIdKey = isWarehouse ? 'itemId' : 'machineId'
  const secondaryNameKey = isWarehouse ? 'itemName' : 'machineName'

  const handleClickOpen = ({ event, rowData }) => {
    setEditData(rowData);
    setOpen(true);
  };

  const handleDelete = () => {
    if (isWarehouse) {
      dispatch(deleteItem(editData[primaryIdKey], editData[secondaryIdKey]))
    } else {
      dispatch(deleteMachine(editData[primaryIdKey], editData[secondaryIdKey]))
    }
    
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to remove {editData[secondaryNameKey]} (ID: {editData[secondaryIdKey]})?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>NO</Button>
            <Button onClick={handleDelete} autoFocus>YES, REMOVE</Button>
          </DialogActions>
        </Dialog>
        <MaterialTable
          title={ title }
          columns={ columns }
          data={ secondaryDetail }
          options={{ pageSize: 5, actionsColumnIndex: -1 }}
          localization={{
            header: {
                actions: 'ACTIONS'
            }
        }}
          actions={[
            {
              icon: forwardRef((props, ref) => <DeleteIcon {...props} ref={ref} />),
              tooltip: "Delete",
              onClick: (event, rowData) => {
                handleClickOpen({event, rowData})
              }
            }
          ]}
          icons={{
            Add: forwardRef((props, ref) => <AddIcon {...props} ref={ref} />),
            Delete: forwardRef((props, ref) => <DeleteIcon {...props} ref={ref} />),
            Edit: forwardRef((props, ref) => <EditIcon {...props} ref={ref} />),
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