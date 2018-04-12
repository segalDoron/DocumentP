import React from 'react';
import { Link } from 'react-router-dom';

class NBar extends React.Component {
  constructor(props) {
    super(props);    
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <form className="form-inline">
            <button className="btn btn-sm btn-outline-secondary m-r-15" type="button">First button</button>
            <button className="btn btn-sm btn-outline-secondary m-r-15" type="button">Second button</button>
            <button className="btn btn-sm btn-outline-secondary m-r-15" type="button">Third button</button>
            <button className="btn btn-sm btn-outline-secondary m-r-15" type="button">Fourth button</button>
          </form>
          <form className="form-inline">
            <Link to="/login">Logout</Link>
          </form>
        </nav>
      </div>
    );
  }
}

export default NBar;