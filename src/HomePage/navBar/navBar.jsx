import React from 'react';
import { Link } from 'react-router-dom';

class NBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav className="navbar navbar-dark sticky-top bg-secondary flex-md-nowrap p-0">
        <form className="form-inline navbar-brand col-sm-3 col-md-2 mr-0">
          <span className="badge badge-light  m-r-15">
            <button type="button" style={{ fontWeight: '700' }}>First button</button>
          </span>
          <span className="badge badge-light  m-r-15">
            <button type="button" style={{ fontWeight: '700' }}>Second button</button>
          </span>
          <span className="badge badge-light  m-r-15">
            <button type="button" style={{ fontWeight: '700' }}>Third button</button>
          </span>
          <span className="badge badge-light  m-r-15">
            <button type="button" style={{ fontWeight: '700' }}>Fourth button</button>
          </span>
        </form>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <Link to="/login">Logout</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NBar;