import React from 'react';
import { connect } from 'react-redux';
import Floppy from 'react-icons/lib/fa/floppy-o';
import { navBarActions } from '../../_actions';


class NBarComponent extends React.Component {
  constructor(props) {
    super(props);

    this.save = this.save.bind(this);
  }

  save() {
    const { dispatch } = this.props;
    dispatch(navBarActions.isSaved(true));
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
          <a className="nav-link" > <button type="button" className="btn btn-light" onClick={this.save} ref={(c) => this.button = c} ><Floppy /><span className="p-l-10">save</span></button></a>
        </li>
      </ul>
    );
  }
}


function mapStateToProps(state) {
  return {

  };
}

const NBar = connect(mapStateToProps)(NBarComponent);
export { NBar as NBarComponent };
