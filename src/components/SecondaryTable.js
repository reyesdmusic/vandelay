import { forwardRef, useState } from 'react';
import MaterialTable from "material-table";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
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
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItem, deleteMachine, editItem, editMachine, addItem, addMachine, setActiveDetailClass } from '../redux/actions'

// Secondary table displays Inventory or Machine data
// CRUD functionality is enabled within this component
export default function SecondaryTable({ config }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("Success!");
  const [editData, setEditData] = useState({});

  const { 
    isWarehouse,
    primaryReducer,
    secondaryReducer,
    primaryIdKey, 
    secondaryNameKey, 
    secondaryIdKey, 
    secondaryTableTitle,
    inputFields 
  } = config;

  const dispatch = useDispatch();
  
  // secondaryDetail is either the Inventory Detail or the Machine Detail
  // Set the properties based on whether we are in Warehouse mode or Factory mode
  const primaryData = useSelector(state => state[primaryReducer]);
  const secondaryData = useSelector(state => state[secondaryReducer]);
  const detailId = useSelector(state => state.detailIdReducer);
  const primaryDetail = primaryData[detailId]
  const secondaryDetail = secondaryData[detailId];

  const handleClickOpen = ({ rowData, actionType }) => {
    setEditData(rowData);

    switch (actionType) {
      case 'edit':
        setOpenEditModal(true);
        break;
      case 'delete':
        setOpenDeleteModal(true);
        break;
      case 'add':
        setOpenAddModal(true);
        break;
      default:
        break;
    }
  };

  const handleDelete = () => {
    if (isWarehouse) {
      dispatch(deleteItem(detailId, editData[secondaryIdKey]));
      const snackBarMessage = `Item ID: ${editData[secondaryIdKey]} has been successfully deleted.`
      setSnackBarMessage(snackBarMessage)
    } else {
      dispatch(deleteMachine(detailId, editData[secondaryIdKey]));
      const snackBarMessage = `Machine ID: ${editData[secondaryIdKey]} has been successfully deleted.`
      setSnackBarMessage(snackBarMessage)
    }
    const actionType = 'delete';
    handleClose(actionType);
  };

  const handleEdit = (e) => {

    // Grab all the form inputs from the modal and store its values in an object
    // Use that object as payload for API call
    const formEl = e.target.parentNode.parentNode;
    const inputs = formEl.querySelectorAll('input');
    const originalIds = { originalPrimaryId: detailId, originalSecondaryId: editData[secondaryIdKey] };
    const newFields = {};
    inputs.forEach(input => newFields[input.parentNode.parentNode.dataset.key] = input.type === 'number' ? +input.value : input.value);
    const editObj = { originalIds, newFields };

    if (isWarehouse) {
      dispatch(editItem(editObj));
      const snackBarMessage = `Item ID: ${editData[secondaryIdKey]} has been successfully edited and saved!`;
      setSnackBarMessage(snackBarMessage);
    } else {
      dispatch(editMachine(editObj));
      const snackBarMessage = `Machine ID: ${editData[secondaryIdKey]} has been successfully edited and saved!`;
      setSnackBarMessage(snackBarMessage);
    }
    const actionType = 'edit';
    handleClose(actionType);
  };

  const handleAdd = (e) => {

    // Grab all the form inputs from the modal and store its values in an object
    // Use that object as payload for API call
    const formEl = e.target.parentNode.parentNode;
    const inputs = formEl.querySelectorAll('input');
    const newFields = { [primaryIdKey]: detailId };
    inputs.forEach(input => newFields[input.parentNode.parentNode.dataset.key] = input.type === 'number' ? +input.value : input.value);
    const addObj = { newFields };

    if (isWarehouse) {
      dispatch(addItem(addObj));
      const snackBarMessage = `${newFields.itemName} ID: ${newFields.itemId} has been successfully added to Warehouse ${detailId}.`;
      setSnackBarMessage(snackBarMessage);
    } else {
      dispatch(addMachine(addObj));
      const snackBarMessage = `${newFields.machineName} ID: ${newFields.machineId} has been successfully added to Factory ${detailId}.`;
      setSnackBarMessage(snackBarMessage);
    }
    const actionType = 'add';
    handleClose(actionType);
  };

  const handleClose = (actionType, isCancel) => {
    switch (actionType) {
      case 'edit':
        setOpenEditModal(false);
        break;
      case 'delete':
        setOpenDeleteModal(false);;
        break;
      case 'add':
        setOpenAddModal(false);
        break;
      default:
        break;
    }
    if (isCancel) return;
    setOpenSnackBar(true);
    dispatch(setActiveDetailClass());
  }

  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  }

  let columns = [];
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
    ];
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
    ];
  }

  return (
      <div className="m-1 secondary-table">
        <Snackbar
          open={openSnackBar} 
          autoHideDuration={4000} 
          onClose={handleCloseSnackBar} 
          anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
          }}>
          <Alert onClose={handleCloseSnackBar} severity="success" >
            {snackBarMessage}
          </Alert>
        </Snackbar>
         <Dialog open={openAddModal}>
          <DialogTitle>ADD NEW {isWarehouse ? 'ITEM' : 'MACHINE'}</DialogTitle>
            <DialogContent>
            {inputFields.map((field) => {
              return <TextField
              key={field.name}
              margin="dense"
              id={field.name}
              label={field.label}
              type={field.dataType}
              data-key={field.dataKey}
              fullWidth
              variant="standard"
            />
            })}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose('add', true)}>CANCEL</Button>
            <Button onClick={handleAdd}>SAVE</Button>
          </DialogActions>  
        </Dialog>
        <Dialog
          open={openDeleteModal}
          onClose={() => handleClose('delete')}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <span className="dialog-warning fs-1p25">Are you sure you want to remove {editData[secondaryNameKey]} (ID: {editData[secondaryIdKey]})?</span>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose('delete', true)}>NO</Button>
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
            <Button onClick={() => handleClose('edit', true)}>CANCEL</Button>
            <Button onClick={handleEdit}>SAVE</Button>
          </DialogActions>  
        </Dialog>
        <MaterialTable
          title={ secondaryTableTitle }
          columns={ columns }
          data={ secondaryDetail }
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
            },
            {
              icon: forwardRef((props, ref) => <AddIcon {...props} ref={ref} />),
              tooltip: `${isWarehouse ? 'ADD ITEM' : 'ADD MACHINE'}`,
              isFreeAction: true,
              onClick: (event, rowData) => {
                const actionType = 'add'
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