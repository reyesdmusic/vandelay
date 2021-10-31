import '../App.css';
import Table from './common/Table';
import DetailSection from './common/DetailSection';

function PageContainer({ type }) {
  return (
    <div className="display-flex">
      <Table type={type} />
      <DetailSection className="detail-section" type={type}/>
    </div>
  );
}

export default PageContainer;
