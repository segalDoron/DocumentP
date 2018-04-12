import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NBar from './navBar/navBar';
import {TreeComponent} from './tree/tree';

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
                <div>
                    <NBar />
                </div>
                <div className="container-fluid">
                    <div className="row p-t-20">
                        <div className="col-6 col-sm-2 light tree-container"> <TreeComponent /></div>                       
                        <div className="col-6 col-sm-10 light tree-container">.col-6 .col-sm-10</div>
                        {/* <div class="w-100 d-none d-md-block"></div> */}
                    </div>
                </div>               
            </div>
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