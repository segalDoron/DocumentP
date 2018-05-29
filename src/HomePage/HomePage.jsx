import React from 'react';
import { ReactDOM } from 'react-dom';
import { connect } from 'react-redux';
import { homeAction, loaderActions } from '../_actions'
import { homeConstants } from '../_constants';
import { Loader } from '../_components';
import { EditorViewComponent, ViewerComponent, NBarComponent, TreeComponent, } from './index';

import { Button } from 'reactstrap';

class HomePage extends React.Component {

    constructor() {
        super();
        this.state = {
            loading: true,
            editorMode: false,
            viewerMode: true,
        };
        this.click = this.click.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(loaderActions.show(true));
        homeAction.getInitParams()
            .then(response => {
                let user = response;
                if (user != null && user.role) {
                    user.role == homeConstants.EDITOR ?
                        this.setState({ editorMode: true, viewerMode: false, loading: false }) :
                        this.setState({ editorMode: false, viewerMode: true, loading: false });
                    this.props.dispatch(homeAction.getComment(user));
                }
            });
    }

    click() {
        this.setState({ editorMode: !this.state.editorMode, viewerMode: !this.state.viewerMode })
    }

    render() {
        const { editorMode, viewerMode } = this.state
        const loading = this.state.loading;
        return (
            <div>
                <Loader />
                {
                    loading && <div style={{ margin: '20px 0 0 20px' }}> Loading...</div>
                }
                {
                    !loading &&
                    <div>
                        <NBarComponent />
                        
                            {/* for debug, switch between users permissions */}
                            {/* <Button color="danger" style={{ margin: '7px 0 0 17.5%' }} onClick={this.click}>change user permission</Button>{' '} */}
                       
                        
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
                }
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