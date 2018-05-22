
import React from 'react';
import { connect } from 'react-redux';
import { modelService_bl } from '../_services';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem } from 'reactstrap';

class SelectLinkModelComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            positionToSend: -1,
            treeData: [],
            activeEle: null
        };
        this.returnNodeLinks = this.returnNodeLinks.bind(this);
        this.setLink = this.setLink.bind(this);
        this.add = this.add.bind(this);
        this.onModelClose = this.onModelClose.bind(this);
    }

    /* update component on props change */
    componentWillReceiveProps(nextProps, nextState) {
        const treeData = nextProps.treeData;
        if (treeData != undefined) {
            modelService_bl.constructModelTreeData(treeData).then(response => {
                this.setState({ treeData: response })
            })
        }
        return false;
    }

    returnNodeLinks() {
        var returnEle = this.state.treeData.map((ele, index) => {
            const divStyle = {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                paddingLeft: ele.order + 'em'
            };

            return <ListGroupItem onClick={(e) => this.setLink(e, ele.position)} tag="button" action key={index} className="selectLinkModelLine" style={divStyle} title={ele.name}>{ele.name}</ListGroupItem>;
        });
        return <ListGroup>{returnEle}</ListGroup>;
    }

    setLink(event, elePosition) {
        this.state.activeEle != null ? this.state.activeEle.classList.remove('active') : null;
        event.target.classList.add('active');
        this.setState({ activeEle: event.target })
        this.setState({
            positionToSend: elePosition
        });
    }

    add() {
        if (this.state.positionToSend != -1) {
            let quill = this.props.quillRef.getEditor();
            let range = quill.getSelection();
            let text = quill.getText(range.index, range.length);
            quill.deleteText(range.index, range.length);
            quill.clipboard.dangerouslyPasteHTML(range.index, '<a href="#' + this.state.positionToSend + '?" ><b>' + text + '</b></a>');
        }
        this.props.toggle("CLOSE_LINK_MODULE")
    }

    onModelClose() {
        this.setState({ positionToSend: -1, activeEle: null })
    }


    render() {
        const returnNodeLinks = this.returnNodeLinks();
        const divStyle = {
            maxHeight: '70vh',
            overflow: 'scroll',
            overflowX: 'hidden',
            overflowY: 'auto',
        };
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} onClosed={this.onModelClose}>
                <ModalHeader>Select Header</ModalHeader>
                <ModalBody style={divStyle}>
                    {returnNodeLinks}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.add}>Apply</Button>
                    <Button color="secondary" onClick={() => this.props.toggle("CLOSE_LINK_MODULE")}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }

}

function mapStateToProps(state) {
    const { tree } = state
    const treeData = tree.treeData;
    return {
        treeData
    };
}

const Model = connect(mapStateToProps)(SelectLinkModelComponent);
export { Model as SelectLinkModel };

