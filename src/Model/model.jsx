
import React from 'react';
import { connect } from 'react-redux';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem } from 'reactstrap';

class ModelComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            positionToSend: -1
        };
        this.returnNodeLinks = this.returnNodeLinks.bind(this);
        this.setLink = this.setLink.bind(this);
        this.add = this.add.bind(this); 
    }

    /* update component on props change */
    componentWillReceiveProps(nextProps, nextState) {
        this.setState({
            positionToSend: -1
        });
    }

    componentDidUpdate() {

    }

    componentDidMount() {

    }

    returnNodeLinks() {
        return (
            <ListGroup>
                <ListGroupItem onClick={() => this.setLink(1)} tag="button" action>Cras justo odio</ListGroupItem>
                <ListGroupItem onClick={() => this.setLink(2)} tag="button" action>Dapibus ac facilisis in</ListGroupItem>
                <ListGroupItem onClick={() => this.setLink(3)} tag="button" action>Morbi leo risus</ListGroupItem>
                <ListGroupItem onClick={() => this.setLink(4)} tag="button" action>Porta ac consectetur ac</ListGroupItem>
            </ListGroup>
        );
    }

    setLink(elePosition) {
        this.setState({
            positionToSend: elePosition
        });
    }

    add() {
        if (this.state.positionToSend != -1)
            this.props.add(this.state.positionToSend);
        this.props.toggle(true)
    }


    render() {
        const returnNodeLinks = this.returnNodeLinks();
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                <ModalHeader>Modal title</ModalHeader>
                <ModalBody>
                    {returnNodeLinks}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.add}>Apply</Button>
                    <Button color="secondary" onClick={() => this.props.toggle(true)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }

}

function mapStateToProps(state) {
    return {
    };
}

const Model = connect(mapStateToProps)(ModelComponent);
export { Model as Model };

