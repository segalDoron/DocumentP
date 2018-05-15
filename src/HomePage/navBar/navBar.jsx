import React from 'react';
import { connect } from 'react-redux';
import Floppy from 'react-icons/lib/fa/floppy-o';
import FaEye from 'react-icons/lib/fa/eye';
import FaEdit from 'react-icons/lib/fa/edit';
import { navBarActions, loaderAction } from '../../_actions';



class NBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { view: true, clicked: 1 }

    this.save = this.save.bind(this);
    this.changeViewState = this.changeViewState.bind(this);
  }

  save() {
    const { dispatch } = this.props;
    dispatch(loaderAction.show(true));
    dispatch(navBarActions.save(this.state.clicked))
    this.setState({ clicked: this.state.clicked == 1 ? 2 : 1 })
  }

  changeViewState(state) {
    this.setState({ view: state })
    const { dispatch } = this.props;
    dispatch(navBarActions.changeViewState(state));
  }


  render() {
    const { view } = this.state
    return (
      <ul className="nav bg-secondary p-l-16_P" style={{ paddingLeft: '16.5%' }}>   
        {view &&
          <li className="nav-item">
            <a className="nav-link" > <button type="button" className="btn btn-light" onClick={() => this.changeViewState(false)} ><FaEdit /><span className="p-l-10">edit</span></button></a>
          </li>
        }        
        {!view &&
          <li className="nav-item">
            <a className="nav-link" > <button type="button" className="btn btn-light" onClick={() => this.changeViewState(true)} ><FaEye /><span className="p-l-10">view</span></button></a>
          </li>
        }
        {!view &&
          < li className="nav-item">
            <a className="nav-link" > <button type="button" className="btn btn-light" onClick={this.save}  ><Floppy /><span className="p-l-10">save</span></button></a>
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
