
import React from 'react';
import { connect } from 'react-redux';
import { } from '../_services';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, Tooltip } from 'reactstrap';

class ShowAllCommentsComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            positionToSend: -1,
            comments: [],
            tooltipOpen: []
        };

        this.cancel = this.cancel.bind(this);
        this.returnComments = this.returnComments.bind(this);
        this.goTo = this.goTo.bind(this);
        this.toggle = this.toggle.bind(this);
    }


    /* update component on props change */
    componentWillReceiveProps(nextProps, nextState) {
        this.setState({ positionToSend: -1 });

        if (nextProps.commentsArray != undefined) {
            let temp = [];
            for (let index = 0; index < nextProps.commentsArray.length; index++) temp.push({ i: index, open: false })
            this.setState({ comments: nextProps.commentsArray, tooltipOpen: temp })
        }
        return false;
    }

    cancel() {
        this.props.toggle("VIEW_COMMENTS")
    }

    toggle(target) {
        let tempArray = this.state.tooltipOpen;
        tempArray[target].open = !tempArray[target].open
        this.setState({ tooltipOpen: tempArray });
    }

    returnComments() {
        var returnEle = this.state.comments.map((ele, index) => {
            const divStyle = {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            };

            return (
                <ListGroupItem
                    id={"ele" + index}
                    onClick={() => this.goTo(ele.position)}
                    tag="button" action key={index}
                    className="selectLinkModelLine"
                    style={divStyle}>{index + 1 + "." + ele.text}
                    <Tooltip placement="top" isOpen={this.state.tooltipOpen[index].open} autohide={false} target={"ele" + index} toggle={() => this.toggle(index)}>
                        {"Creator:" + ele.name + " Project:ele.project"}
                    </Tooltip>
                </ListGroupItem>
            );
        });

        return <ListGroup>{returnEle}</ListGroup>;
    }

    goTo(elePosition) {
        this.props.quillRef.getEditor().setSelection(elePosition, 0);
        this.props.toggle("VIEW_COMMENTS")
    }

    render() {
        // can not add class to reactstrap model.
        // style need to be add inline
        const divStyle = {
            maxHeight: '70vh',
            overflow: 'scroll',
            overflowX: 'hidden',
            overflowY: 'auto',
        };
        const modelWidth = { maxWidth: '60%' };
        const returnComments = this.returnComments();

        return (
            <Modal style={modelWidth} isOpen={this.props.isOpen} toggle={this.props.toggle}>
                <ModalHeader>Select Comment to navigate</ModalHeader>
                <ModalBody style={divStyle}>
                    {returnComments}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.cancel}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }

}

function mapStateToProps(state) {
    const commentsArray = state.mainView.comments
    return {
        commentsArray
    };
}

const Model = connect(mapStateToProps)(ShowAllCommentsComponent);
export { Model as ShowAllComments };

