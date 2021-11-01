import SecondaryTable from './SecondaryTable';
import { useSelector, useDispatch } from 'react-redux';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button';
import { setActiveDetailClass } from '../redux/actions';


// Detail section appears to the right of the sidebar on larger screens and toggles in and out of view on smaller screens
// Primary Data (either Warehouse or Factory data) is displayed at the top
// Secondary Data (either Inventory or Machines) is displayed within SecondaryTable
function DetailSection({ config }) {
  const { primaryDetailReducer } = config;

  const dispatch = useDispatch();

  const primaryDetail = useSelector(state => state[primaryDetailReducer]);
  const activeDetailClass = useSelector(state => state.activeDetailClassReducer);
  const { warehouseId, warehouseName, warehouseAddress, warehouseDescription, factoryId, factoryName, factoryAddress, factoryDescription } = primaryDetail;
  const addressData = warehouseAddress || factoryAddress;
  const primaryId = warehouseId || factoryId;
  const { buildingName, streetLine1, streetLine2, city, stateProvince, zipPostalCode, country } = addressData;
  const name = warehouseName || factoryName;
  const address = `${streetLine1}${streetLine2 ? ` ${streetLine2}` : ''}`;
  const cityStateCountry = `${city}, ${stateProvince} ${zipPostalCode} ${country}`;
  const description = warehouseDescription || factoryDescription;

  

  return (
    <section className={`detail-section flex-column-center ${activeDetailClass ? 'active' : ''}`}>
      <div id="back-button" className="flex-start m-p75">
        <Button onClick={() => dispatch(setActiveDetailClass())}><ArrowBackIosIcon /></Button>
      </div>
      <h2>{name} (ID: {primaryId || "0"})</h2>
      <b>{buildingName}</b>
      <span>{address}</span>
      <span>{cityStateCountry}</span>
      <span className="m-1 w-50-percent align-self-center">{description}</span>
      <SecondaryTable primaryId={primaryId} config={config} />
    </section>
  );
}

export default DetailSection;
