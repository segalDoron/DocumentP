import React from 'react';
import { connect } from 'react-redux';
import { NBarComponent } from './navBar/navBar';
import { TreeComponent } from './tree/tree';
import { Loader } from '../_components'
import { MainViewComponent } from './mainView/mainView';
import { ReactDOM } from 'react-dom';

class HomePage extends React.Component {

    constructor() {
        super();
        this.state = {};
    }
    
    componentDidMount() {     
    }

    render() {
        const { user, users } = this.props;
        return (
            <div>
                <Loader />
                <div>
                    <NBarComponent />
                    <div className="container-fluid">
                        <div className="row">
                            <TreeComponent />
                            <MainViewComponent />
                        </div>
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