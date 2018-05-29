import React from 'react';
import { connect } from 'react-redux';
import Floppy from 'react-icons/lib/fa/floppy-o';
import FaEye from 'react-icons/lib/fa/eye';
import FaEdit from 'react-icons/lib/fa/edit';
import FaPrint from 'react-icons/lib/fa/print'
import { navBarActions, loaderActions } from '../../_actions';
import { Row, Col } from 'reactstrap';



class NBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { view: true, clicked: 1 }

    this.save = this.save.bind(this);
    this.changeViewState = this.changeViewState.bind(this);
    this.returnView = this.returnView.bind(this);
    this.print = this.print.bind(this);
  }

  save() {
    const { dispatch } = this.props;
    let user = navBarActions.getUser();
    dispatch(loaderActions.show(true));
    dispatch(navBarActions.save(this.state.clicked, user))
    this.setState({ clicked: this.state.clicked == 1 ? 2 : 1 })
  }

  changeViewState(state) {
    this.setState({ view: state })
    const { dispatch } = this.props;
    dispatch(navBarActions.changeViewState(state));
  }

  print(){
    navBarActions.print();
  }

  returnView(view) {
    let ele;
    if (view) {
      return (
        <Row className="bg-secondary">
          <Col xs="2">
            <ul className="nav">
              < li className="nav-item">
                <a className="nav-link" > <button type="button" className="btn btn-light" onClick={this.print}  ><FaPrint /><span className="p-l-10">Print</span></button></a>
              </li>
            </ul>
          </Col>
          <Col>
            <ul className="nav">
              <li className="nav-item">
                <a className="nav-link" > <button type="button" className="btn btn-light" onClick={() => this.changeViewState(false)} ><FaEdit /><span className="p-l-10">edit</span></button></a>
              </li>
            </ul>
          </Col>
        </Row>
      );
    }
    else {
      return (
        <Row className="bg-secondary">
          <Col xs="2">
            <ul className="nav">
              < li className="nav-item">
                <a className="nav-link" > <button type="button" className="btn btn-light" onClick={this.print}  ><FaPrint /><span className="p-l-10">Print</span></button></a>
              </li>
            </ul>
          </Col>
          <Col>
            <ul className="nav">
              <li className="nav-item">
                <a className="nav-link" > <button type="button" className="btn btn-light" onClick={() => this.changeViewState(true)} ><FaEye /><span className="p-l-10">view</span></button></a>
              </li>
              < li className="nav-item">
                <a className="nav-link" > <button type="button" className="btn btn-light" onClick={this.save}  ><Floppy /><span className="p-l-10">save</span></button></a>
              </li>
            </ul>
          </Col>
        </Row>
      );
    }
  }

  render() {
    const { view } = this.state
    const navbarElement = this.returnView(view)

    return (
      <div>
        {navbarElement}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {

  };
}

const NBar = connect(mapStateToProps)(NBarComponent);
export { NBar as NBarComponent };
