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
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItem, deleteMachine, editItem, editMachine } from '../redux/actions'

export default function SecondaryTable({ type }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editData, setEditData] = useState({});
  const dispatch = useDispatch()
  const isWarehouse = type === 'Warehouses'
  const secondaryDetail = useSelector(state => isWarehouse ? state.inventoryDetailReducer : state.machineDetailReducer);
  const title = isWarehouse ? 'INVENTORY ITEMS' : 'MACHINES'
  const primaryIdKey = isWarehouse ? 'warehouseId' : 'factoryId'
  const secondaryIdKey = isWarehouse ? 'itemId' : 'machineId'
  const secondaryNameKey = isWarehouse ? 'itemName' : 'machineName'
  const handleClickOpen = ({ event, rowData, actionType }) => {
    setEditData(rowData);
    if (actionType === 'delete') {
      setOpenDeleteModal(true);
    } else {
      setOpenEditModal(true);
    }
    
  };

  const handleDelete = () => {
    if (isWarehouse) {
      dispatch(deleteItem(editData[primaryIdKey], editData[secondaryIdKey]))
    } else {
      dispatch(deleteMachine(editData[primaryIdKey], editData[secondaryIdKey]))
    }
    const actionType = 'delete'
    handleClose(actionType);
  };

  const handleEdit = (e) => {
    const formEl = e.target.parentNode.parentNode
    const inputs = formEl.querySelectorAll('input')
    const originalIds = { originalPrimaryId: editData[primaryIdKey], originalSecondaryId: editData[secondaryIdKey] }
    const newFields = {}
    inputs.forEach(input => newFields[input.parentNode.parentNode.dataset.key] = input.type === 'number' ? +input.value : input.value)
    const editObj = { originalIds, newFields }
    if (isWarehouse) {
      dispatch(editItem(editObj))
    } else {
      dispatch(editMachine(editObj))
    }
    const actionType = 'edit'
    handleClose(actionType);
  };

  const handleClose = (actionType) => {
    if (actionType === 'delete') {
      setOpenDeleteModal(false);
    } else {
      setOpenEditModal(false);
    }
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

  let inputFields

  if (isWarehouse) {
    inputFields = [
      { dataKey: 'warehouseId', dataType: 'number', label: 'Warehouse ID'},
      { dataKey: 'itemId', dataType: 'number', label: 'Item ID'},
      { dataKey: 'itemSKU', dataType: 'number', label: 'Item SKU'},
      { dataKey: 'itemQuantity', dataType: 'number', label: 'Item Quantity'},
      { dataKey: 'itemName', dataType: 'text', label: 'Item Name'},
      { dataKey: 'itemDescription', dataType: 'text', label: 'Description'}
    ]
  } else {
    inputFields = [
      { dataKey: 'factoryId', dataType: 'number', label: 'Factory ID'},
      { dataKey: 'machineId', dataType: 'number', label: 'Machine ID'},
      { dataKey: 'machineName', dataType: 'text', label: 'Machine Name'},
      { dataKey: 'machineDescription', dataType: 'text', label: 'Description'}
    ]
  }

  return (
      <div className="m-1 secondary-table">
        <Dialog
          open={openDeleteModal}
          onClose={() => handleClose('delete')}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to remove {editData[secondaryNameKey]} (ID: {editData[secondaryIdKey]})?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose('delete')}>NO</Button>
            <Button onClick={handleDelete} autoFocus>YES, REMOVE</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openEditModal} onClose={() => handleClose('edit')}>
          <DialogTitle>EDIT {editData[secondaryNameKey]} (ID: {editData[secondaryIdKey]})</DialogTitle>
            <DialogContent>
            {inputFields.map((field) => {
              return <TextField
              key={field.name}
              margin="dense"
              id={field.name}
              label={field.label}
              defaultValue={editData[field.dataKey]}
              type={field.dataType}
              data-key={field.dataKey}
              fullWidth
              variant="standard"
            />
            })}
            
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose('edit')}>CANCEL</Button>
            <Button onClick={handleEdit}>SAVE</Button>
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
                const actionType = 'delete'
                handleClickOpen({event, rowData, actionType})
              }
            },
            {
              icon: forwardRef((props, ref) => <EditIcon {...props} ref={ref} />),
              tooltip: "Edit",
              onClick: (event, rowData) => {
                const actionType = 'edit'
                handleClickOpen({event, rowData, actionType})
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