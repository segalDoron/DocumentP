import React from 'react';
import { Link } from 'react-router-dom';
import Floppy from 'react-icons/lib/fa/floppy-o';


class NBar extends React.Component {
  constructor(props) {
    super(props);

    this.save = this.save.bind(this);
  }

  save() {
    console.log("save");
  }



  render() {
    return (
      <ul className="nav bg-secondary">
        <li className="nav-item">
          <a className="nav-link active">  <button type="button" className="btn btn-light">Light</button></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" >  <button type="button" className="btn btn-light">Light</button></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" > <button type="button" className="btn btn-light" onClick={this.save}><Floppy /><span className="p-l-10">save</span></button></a>
        </li>
      </ul>
    );
  }
}

export default NBar;