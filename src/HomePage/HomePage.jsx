import React from 'react';
import { connect } from 'react-redux';
import { homeAction } from '../_actions'
import { NBarComponent } from './navBar/navBar';
import { TreeComponent } from './tree/tree';
import { Loader } from '../_components';
import { homeConstants } from '../_constants'
import { EditorViewComponent } from './editorView/editorView';
import { ViewerComponent } from './viewer/viewer';
import { ReactDOM } from 'react-dom';

import { Button } from 'reactstrap';

class HomePage extends React.Component {

    constructor() {
        super();
        this.state = {
            editorMode: false,
            viewerMode: true,
        };
        this.click = this.click.bind(this);
    }
    componentWillReceiveProps(nextProps, nextState) {
        let user = homeAction.getUser();
        if (user != null && user.role) {
            user.role == homeConstants.EDITOR ?
                this.setState({ editorMode: true, viewerMode: false }) :
                this.setState({ editorMode: false, viewerMode: true });
        }
    }

    click() {
        this.setState({ editorMode: !this.state.editorMode, viewerMode: !this.state.viewerMode })
    }

    render() {
        const { editorMode, viewerMode } = this.state
        return (
            <div>
                <Loader />
                <div>
                    <NBarComponent />
                    <Button color="danger" style={{ margin: '7px 0 0 17.5%' }} onClick={this.click}>change user permission</Button>{' '}
                    <div className="container-fluid">
                        <div className="row">
                            <TreeComponent />
                            {editorMode &&
                                <EditorViewComponent />
                            }
                            {
                                viewerMode &&
                                <ViewerComponent />
                            }
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