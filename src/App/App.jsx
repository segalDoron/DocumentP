import React from 'react';
import { Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { HomePage } from '../HomePage';
import { appService_del } from '../_services';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-quill/dist/quill.snow.css';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initData: {
                userName: '',
                projectName: ''
            }
        };
    }

    componentWillMount() {
        appService_del.getInitParams();
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.onUnloadCleanup)
    }
    onUnloadCleanup() {
        sessionStorage.clear();
        window.removeEventListener('beforeunload', this.onUnloadCleanup)
        return "unloading";
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