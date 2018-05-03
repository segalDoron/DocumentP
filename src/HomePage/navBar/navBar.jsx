import React from 'react';
import { connect } from 'react-redux';
import Floppy from 'react-icons/lib/fa/floppy-o';
import FaEye from 'react-icons/lib/fa/eye';
import FaEdit from 'react-icons/lib/fa/edit';
import { navBarActions } from '../../_actions';


class NBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { view: true }

    this.save = this.save.bind(this);
    this.changeViewState = this.changeViewState.bind(this);
  }

  save() {
    const { dispatch } = this.props;
    dispatch(navBarActions.isSaved(true));
  }

  changeViewState(state) {
    this.setState({ view: state })
    const { dispatch } = this.props;
    dispatch(navBarActions.changeViewState(state));
  }


  render() {
    const { view } = this.state
    return (
      <ul className="nav bg-secondary">
        <li className="nav-item">
          <a className="nav-link active">  <button type="button" className="btn btn-light">Light</button></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" >  <button type="button" className="btn btn-light">Light</button></a>
        </li>
        {view &&
          <li className="nav-item">
            <a className="nav-link" > <button type="button" className="btn btn-light" onClick={() => this.changeViewState(false)} ><FaEdit /><span className="p-l-10">edit</span></button></a>
          </li>
        }
        {!view &&
          < li className="nav-item">
            <a className="nav-link" > <button type="button" className="btn btn-light" onClick={this.save}  ><Floppy /><span className="p-l-10">save</span></button></a>
          </li>
        }
        {!view &&
          <li className="nav-item">
            <a className="nav-link" > <button type="button" className="btn btn-light" onClick={() => this.changeViewState(true)} ><FaEye /><span className="p-l-10">view</span></button></a>
          </li>
        }
      </ul >
    );
  }
}


function mapStateToProps(state) {
  return {

  };
}

const NBar = connect(mapStateToProps)(NBarComponent);
export { NBar as NBarComponent };
