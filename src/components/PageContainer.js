import '../App.css';
import PrimaryTable from './PrimaryTable';
import DetailSection from './DetailSection';

function PageContainer({ config }) {
  return (
    <div className="display-flex">
      <PrimaryTable config={config} />
      <DetailSection className="detail-section" config={config} />
    </div>
  );
}

export default PageContainer;
