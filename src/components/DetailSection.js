import SecondaryTable from './SecondaryTable';
import { useSelector, useDispatch } from 'react-redux';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button';
import { setActiveDetailClass } from '../redux/actions'


function DetailSection({ type }) {
  const dispatch = useDispatch()
  const isWarehouse = type === 'Warehouses'
  const primaryDetail = useSelector(state => isWarehouse ? state.warehouseDetailReducer : state.factoryDetailReducer);
  const activeDetailClass = useSelector(state => state.activeDetailClassReducer);
  const { warehouseId, warehouseName, warehouseAddress, warehouseDescription, factoryId, factoryName, factoryAddress, factoryDescription } = primaryDetail
  const addressData = warehouseAddress || factoryAddress
  const primaryId = warehouseId || factoryId
  const { buildingName, streetLine1, streetLine2, city, stateProvince, zipPostalCode, country } = addressData
  const name = warehouseName || factoryName
  const address = `${streetLine1}${streetLine2 ? ` ${streetLine2}` : ''}`
  const cityStateCountry = `${city}, ${stateProvince} ${zipPostalCode} ${country}`
  const description = warehouseDescription || factoryDescription

  

  return (
    <section className={`detail-section flex-column-center ${activeDetailClass ? 'active' : ''}`}>
      <div id="back-button" className="flex-start">
        <Button onClick={() => dispatch(setActiveDetailClass())}><ArrowBackIosIcon /></Button>
      </div>
      <h2>{name}</h2>
      <b>{buildingName}</b>
      <span>{address}</span>
      <span>{cityStateCountry}</span>
      <span className="m-1">{description}</span>
      <SecondaryTable type={type} primaryId={primaryId} />
    </section>
  );
}

export default DetailSection;
