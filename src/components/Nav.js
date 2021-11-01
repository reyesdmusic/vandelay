import { Link } from 'react-router-dom';

function Nav({ pages }) {
  const addClickedClass = e => {
    const prevActiveEl = document.querySelector('.active-link')
    if (prevActiveEl) {
      prevActiveEl.classList.remove('active-link')
    }
    const linkEl = e.target
    linkEl.classList.add('active-link')
  }

  return (
    <nav>
      <Link to="/warehouses">
        <h3>Vandelay</h3>
      </Link>
      <ul className="nav-links">
        {pages.map(({ type, url }) => <Link to={url} onClick={addClickedClass} key={type}><li>{type}</li></Link>)}
      </ul>
    </nav>
  );
}

export default Nav;
