
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

        this.state = {
            file: File,
            nestedModal: false,
            nestedModalText: ''
        };

        this.addPic = this.addPic.bind(this);
        this.cancel = this.cancel.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.toggleNested = this.toggleNested.bind(this);
        this.onModelClose = this.onModelClose.bind(this);

    }

    // drop handler
    onDrop(files) {
        if (files.length > 0)
            this.setState({ file: files[0] });
    }


    // on apply save and insert pic by response path
    addPic() {
        const file = this.state.file
        if (file.size > 0) {
            modelService_del.uploadPic(file)
                .then(response => {
                    const quill = this.props.quillRef.getEditor()
                    quill.focus();
                    let range = quill.getSelection();
                    let position = range ? range.index : 0;
                    quill.insertText(position, '\n');
                    quill.clipboard.dangerouslyPasteHTML(position + 1, '<iframe width="250" height="250"  src="' + response + '" ></iframe >')
                    this.props.toggle("ADD_IMG")
                })
                .catch(error => {
                    this.toggleNested(error);
                })
        }
        else this.toggleNested("Please Add a file first");
    }

    toggleNested(msg) {
        const errorMsg = typeof msg == "string" ? msg : ''
        this.setState({
            nestedModal: !this.state.nestedModal, nestedModalText: errorMsg
        });
    }

    onModelClose() {
        this.setState({ file: File })
    }

    cancel() {
        this.props.toggle("ADD_IMG")
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
            <Modal style={modelWidth} toggle={this.toggle} isOpen={this.props.isOpen} onClosed={this.onModelClose}>
                <ModalHeader style={disableDrag}>Insert Picture</ModalHeader>
                <ModalBody style={modelHeight}>
                    <div className="dropzone">
                        <Dropzone className="dragDropArea" activeClassName="activeDrop" multiple={false} onDrop={this.onDrop}  >
                            {!hasFile && <p className="dragAndDropPlacHolder" unselectable="on">Click here or Drag and Drop your file here </p>}
                            {hasFile && <Preview file={this.state.file} />}
                        </Dropzone>
                    </div>
                    <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested}>
                        <ModalBody>{this.state.nestedModalText}</ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggleNested}>Dismiss</Button>
                        </ModalFooter>
                    </Modal>
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

