
import React from 'react';
import { connect } from 'react-redux';
import { modelService_del } from '../_services';
import Dropzone from 'react-dropzone';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class SelectPicModelComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = { files: [] };

    }

    onDrop(files) {
        modelService_del.uploadPic(files[0]).then(response => {
            response
        })
    }

    addPic() {
        this
    }

    componentDidUpdate() {

    }

    componentDidMount() {

    }

    render() {
        const divStyle = {
            maxHeight: '70vh',
            overflow: 'scroll',
            overflowX: 'hidden',
            overflowY: 'auto',
        };
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                <ModalHeader>Insert Picture</ModalHeader>
                <ModalBody style={divStyle}>
                    <div className="dropzone">
                        <Dropzone multiple={false} onDrop={this.onDrop.bind(this)}>
                            <p>Dropping files here, or click to select files to upload.</p>
                        </Dropzone>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.addPic.bind(this)}>Apply</Button>
                    <Button color="secondary" onClick={() => this.props.toggle(true, "ADD_IMG")}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }

}

function mapStateToProps(state) {
    return {
    };
}

const Model = connect(mapStateToProps)(SelectPicModelComponent);
export { Model as SelectPicModel };

