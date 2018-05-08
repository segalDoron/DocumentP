import React from 'react';
import { Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import './App.css';


class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            dispatch(alertActions.clear());
        });
    }

    render() {
        return (
            <div>
                <HomePage />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 