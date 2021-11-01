import { Link } from 'react-router-dom';

function Nav({ pages }) {
  const addClickedClass = e => {

    // Remove active class from previously active link
    const prevActiveEl = document.querySelector('.active-link')
    if (prevActiveEl) {
      prevActiveEl.classList.remove('active-link')
    }
    const linkEl = e.target

    // When clicking on Logo, set active class to Warehouses link
    if (linkEl.classList.contains("logo-link")) {
      const warehousesLink = document.getElementById('warehouses-link')
      warehousesLink.classList.add('active-link')
    } else {
      // Add active class to clicked link
      linkEl.classList.add('active-link')
    }
  }

  return (
    <nav>
      <Link onClick={addClickedClass} className="logo-link" to="/vandelay/warehouses">
        <h3 className="logo-link">VANDELAY</h3>
      </Link>
      <ul className="nav-links">
        {pages.map(({ type, url }) => <Link to={url} onClick={addClickedClass} key={type} className={type === 'Warehouses'? 'active-link' : ''} id={`${type.toLowerCase()}-link`}><li>{type.toUpperCase()}</li></Link>)}
      </ul>
    </nav>
  );
}

export default Nav;
