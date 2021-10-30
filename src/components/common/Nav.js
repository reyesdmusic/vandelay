import '../../App.css';
import { Link } from 'react-router-dom';

function Nav({ pages }) {
  return (
    <nav>
      <Link to="/warehouses">
        <h3>Vandelay</h3>
      </Link>
      <ul className="nav-links">
        {pages.map(({ name, url }) => <Link to={url} key={name}><li>{name}</li></Link>)}
      </ul>
    </nav>
  );
}

export default Nav;
