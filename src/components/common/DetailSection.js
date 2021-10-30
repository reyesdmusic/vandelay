import '../../App.css';
import SecondaryTable from './SecondaryTable';

function DetailSection({ primaryDetail, secondaryDetail }) {
  const { warehouseName, warehouseAddress, warehouseDescription, factoryName, factoryAddress, factoryDescription } = primaryDetail
  const addressData = warehouseAddress || factoryAddress
  const { buildingName, streetLine1, streetLine2, city, stateProvince, zipPostalCode, country } = addressData
  const name = warehouseName || factoryName
  const address = `${streetLine1}${streetLine2 ? ` ${streetLine2}` : ''}`
  const cityStateCountry = `${city}, ${stateProvince} ${zipPostalCode} ${country}`
  const description = warehouseDescription || factoryDescription
  console.log({primaryDetail})

  return (
    <section className="detail-section flex-column-center">
      <h2>{name}</h2>
      <b>{buildingName}</b>
      <span>{address}</span>
      <span>{cityStateCountry}</span>
      <span className="m-1">{description}</span>
      <SecondaryTable secondaryDetail={secondaryDetail} />
    </section>
  );
}

export default DetailSection;
