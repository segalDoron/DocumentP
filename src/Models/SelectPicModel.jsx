
import React from 'react';
import { connect } from 'react-redux';
import { modelService_del } from '../_services';
import Dropzone from 'react-dropzone';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Preview = (props) => {
    return (
        (props.file) ?
            <img className="dragAndDropImg" src={props.file.preview} /> : <div></div>
    );
}

class SelectPicModelComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = { file: File };

        this.addPic = this.addPic.bind(this);
        this.cancel = this.cancel.bind(this);
        this.onDrop = this.onDrop.bind(this);

    }

    // drop handler
    onDrop(files) {
        if (files.length > 0)
            this.setState({ file: files[0] });
    }

    // on apply save and insert pic by response path
    addPic() {
        const file = this.state.file
        modelService_del.uploadPic(file)
            .then(response => {
                this.props.addImgToEditor(response);
                this.setState({ file: File })
                this.props.toggle(true, "ADD_IMG")
            })
            .catch(error => {
                alert("There has been a problem uploading this file");
                this.setState({ file: File })
                this.props.toggle(true, "ADD_IMG");
            })
    }

    cancel() {
        this.setState({ file: File })
        this.props.toggle(true, "ADD_IMG")
    }

    render() {
        // can not add class to reactstrap model.
        // style need to be add inline
        const modelHeight = { height: '55vh' };
        const modelWidth = { maxWidth: '50%' };
        const disableDrag = {
            WebkitUserUelect: 'none', /* Safari, Chrome */
            khtmlUserSelect: 'none', /* Konqueror */
            MozUserSelect: 'none', /* Firefox */
            msUserUelect: 'none', /* IE */
            userSelect: 'none', /* CSS3 */
            WebkitUserDrag: 'none'
        }

        const hasFile = this.state.file.size > 0 ? true : false
        return (
            <Modal style={modelWidth} isOpen={this.props.isOpen}>
                <ModalHeader style={disableDrag}>Insert Picture</ModalHeader>
                <ModalBody style={modelHeight}>
                    <div className="dropzone">
                        <Dropzone disableClick={true} className="dragDropArea" activeClassName="activeDrop" multiple={false} onDrop={this.onDrop}  >
                            {!hasFile && <p className="dragAndDropPlacHolder" unselectable="on">Drag and Drop your file here </p>}
                            {hasFile && <Preview file={this.state.file} />}
                        </Dropzone>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.addPic}>Apply</Button>
                    <Button color="secondary" onClick={this.cancel}>Cancel</Button>
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

