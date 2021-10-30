import '../App.css';
import Table from './common/Table';
import DetailSection from './common/DetailSection';

function PageContainer({ type, primaryCRUD, secondaryCRUD, setDetails, allPrimaryData, primaryDetail, secondaryDetail }) {

  return (
    <div className="display-flex">
      <Table primaryData={allPrimaryData} setDetails={setDetails} type={type} />
      <DetailSection className="detail-section" primaryDetail={primaryDetail} secondaryDetail={secondaryDetail} secondaryCRUD={secondaryCRUD} type={type}/>
    </div>
  );
}

export default PageContainer;
