
import React from 'react';
import { connect } from 'react-redux';
import { modelService_bl } from '../_services';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem } from 'reactstrap';

class SelectLinkModelComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            positionToSend: -1,
            treeData: []
        };
        this.returnNodeLinks = this.returnNodeLinks.bind(this);
        this.setLink = this.setLink.bind(this);
        this.add = this.add.bind(this);
    }

    /* update component on props change */
    componentWillReceiveProps(nextProps, nextState) {
        this.setState({
            positionToSend: -1,
        });

        const treeData = nextProps.treeData;
        if (treeData != undefined) {
            modelService_bl.constructModelTreeData(treeData).then(response => {
                this.setState({ treeData: response })
            })
        }
        return false;

    }

    componentDidUpdate() {

    }

    componentDidMount() {

    }

    returnNodeLinks() {

        var returnEle = this.state.treeData.map((ele, index) => {
            const divStyle = {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                paddingLeft: ele.order + 'em'
            };

            return <ListGroupItem onClick={() => this.setLink(ele.position)} tag="button" action key={index} className="selectLinkModelLine" style={divStyle} title={ele.name}>{ele.name}</ListGroupItem>;
        });
        return <ListGroup>{returnEle}</ListGroup>;
    }

    setLink(elePosition) {
        this.setState({
            positionToSend: elePosition
        });
    }

    add() {
        if (this.state.positionToSend != -1)
            this.props.add(this.state.positionToSend);
        this.props.toggle(true,"LINK")
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
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                <ModalHeader>Select Header</ModalHeader>
                <ModalBody style={divStyle}>
                    {returnNodeLinks}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.add}>Apply</Button>
                    <Button color="secondary" onClick={() => this.props.toggle(true,"LINK")}>Cancel</Button>
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

