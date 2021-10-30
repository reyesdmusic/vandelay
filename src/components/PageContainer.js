import '../App.css';
import Table from './common/Table';
import DetailSection from './common/DetailSection';
import { useState } from 'react';

function PageContainer({ name, primaryData, secondaryData }) {
  const [primaryDetail, setPrimaryDetail] = useState(primaryData[0])
  const [secondaryDetail, setSecondaryDetail] = useState(secondaryData["0"])

  function setDetails (newPrimaryDetail, newSecondaryDetail) {
    setSecondaryDetail(newSecondaryDetail)
    setPrimaryDetail(newPrimaryDetail)
  }
  return (
    <div className="display-flex">
      <Table primaryData={primaryData} secondaryData={secondaryData} name={name} setDetails={setDetails} />
      <DetailSection className="detail-section" primaryDetail={primaryDetail} secondaryDetail={secondaryDetail} />
    </div>
  );
}

export default PageContainer;
