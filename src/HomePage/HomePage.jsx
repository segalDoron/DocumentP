import React from 'react';
import { connect } from 'react-redux';
import { NBarComponent } from './navBar/navBar';
import { TreeComponent } from './tree/tree';
import { MainViewComponent } from './mainView/mainView';
import { ReactDOM } from 'react-dom';

import { userActions } from '../_actions';

class HomePage extends React.Component {

    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    render() {
        const { user, users } = this.props;
        return (
            <div>
                <NBarComponent />
                <div className="container-fluid">
                    <div className="row">
                        <TreeComponent />
                        <MainViewComponent />
                    </div>
                </div>
            </div >
        );
    }
}

function mapStateToProps(state) {
    return {
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };