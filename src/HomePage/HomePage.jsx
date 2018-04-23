import React from 'react';
import { connect } from 'react-redux';
import { NBarComponent } from './navBar/navBar';
import { TreeComponent } from './tree/tree';
import { MainViewComponent } from './mainView/mainView';

import { userActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
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
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };