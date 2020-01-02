import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
  return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/">Home</NavLink></li>
        <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/articles">Articles</NavLink></li>
      </ul>
    </nav>
  );
}

export default Menu;