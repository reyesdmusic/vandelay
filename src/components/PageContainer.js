import '../App.css';
import PrimaryTable from './PrimaryTable';
import DetailSection from './DetailSection';

function PageContainer({ type }) {
  return (
    <div className="display-flex">
      <PrimaryTable type={type} />
      <DetailSection className="detail-section" type={type}/>
    </div>
  );
}

export default PageContainer;
