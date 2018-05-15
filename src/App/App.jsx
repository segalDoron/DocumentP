import React from 'react';
import { Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { HomePage } from '../HomePage';
import './App.css';


class App extends React.Component {
    constructor(props) {
        super(props);
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