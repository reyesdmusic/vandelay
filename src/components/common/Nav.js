import '../../App.css';
import { Link } from 'react-router-dom';

function Nav({ pages }) {
  return (
    <nav>
      <Link to="/warehouses">
        <h3>Vandelay</h3>
      </Link>
      <ul className="nav-links">
        {pages.map(({ type, url }) => <Link to={url} key={type}><li>{type}</li></Link>)}
      </ul>
    </nav>
  );
}

export default Nav;
