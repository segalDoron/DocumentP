import React from 'react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import { navBarActions, mainViewActions } from '../../_actions';
import { mainViewService_bl } from '../../_services';
import { mainViewConstants, CUSTOMBUTTONS } from '../../_constants';
import $ from 'jquery';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem } from 'reactstrap';


const { Quill, Mixin, Toolbar, Delta } = ReactQuill;

class MainViewComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            text: "",
            nodeSelected: "",
            viewMode: true,
            content: Delta
        }

        this.dispatch = this.props.dispatch;

        // create quill ref
        this.reactQuillRef = null;

        // bind functions
        this.handleChange = this.handleChange.bind(this)
        this.addImageHandler = this.addImageHandler.bind(this);
        this.userView = this.userView.bind(this);
        this.save = this.save.bind(this);
        this.addComment = this.addComment.bind(this);
        this.scrollTo = this.scrollTo.bind(this);
        this.addLink = this.addLink.bind(this);
        this.toggle = this.toggle.bind(this);
        this.returnNodeLinks = this.returnNodeLinks.bind(this);
        this.setLink = this.setLink.bind(this);

    }


    /* update component on props change */
    componentWillReceiveProps(nextProps, nextState) {

        this.setState({ viewMode: nextProps.viewMode })
        const selected = this.state.nodeSelected

        //set selected tree node
        if (nextProps.selectedTreeNode !== selected)
            this.setState({ nodeSelected: nextProps.selectedTreeNode })

        this.scrollTo(nextProps.selectedTreeNode);

        // invoke save method
        if (nextProps.isSaved == true) {
            this.save();
            this.dispatch(navBarActions.isSaved(false));
        }

        return false;
    }

    /* Updates component */
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.state.viewMode == prevProps.viewMode) {
            this.updateToolBar()
            this.reactQuillRef.getEditor().enable(!this.state.viewMode);
            $(".ql-tooltip").remove();
        }
    }

    /* Invoke once after component render method finishes */
    componentDidMount() {
        this.reactQuillRef.getEditor().enable(!this.state.viewMode);
    }

    /*
    componentWillMount() {
        const { selected } = this.props;
        this.dispatch(mainViewActions.displayCurrentSelection(selected));
    }
    */

    handleChange(value) {
        this.setState({ text: value })
    }

    save() {
        // var editorHtml = $(".ql-editor").find('h1,h2,h3,h4');
        var quill = this.reactQuillRef.getEditor();
        const innerHtml = quill.container.children[0].children
        this.dispatch(mainViewActions.setTree(innerHtml));
    }

    /* update toolbar with custom buttons*/
    updateToolBar() {
        CUSTOMBUTTONS.forEach(customButton => {
            var numberOfEditorButtons = $(".ql-toolbar").children().length;
            var lastButton = $(".ql-toolbar").children().eq(numberOfEditorButtons - 1);
            lastButton.after(customButton.button);
            lastButton = $(".ql-toolbar").children().eq(numberOfEditorButtons);
            lastButton.bind("click", this[customButton.handlerName]);
        })
    }

    /* custom image handler */
    addImageHandler(value) {
        const quill = this.reactQuillRef.getEditor();
        var range = quill.getSelection();
        let position = range ? range.index : 0;
        mainViewService_bl.importPic()
            .then(response =>
                quill.insertEmbed(position, 'image', 'https://i2.wp.com/www.i879.com/hanablog/wp-content/uploads/2014/09/orangerose2.jpg')
            )
    }

    addLink() {
        const quill = this.reactQuillRef.getEditor();
        this.toggle();
        var range = quill.getSelection();
        if (range.length > 0) {
            var text = quill.getText(range.index, range.length);
            let position = range.index;
            quill.deleteText(range.index, range.length);
            quill.clipboard.dangerouslyPasteHTML(position, '<a href="' + position + '" target="_blank"><b>' + text + '</b></a>');
            let action = this.scrollTo
            $("a>strong").each(function (index) {
                $(this).bind("click", position, action);
            });
        }
    }

    scrollTo(selectedTreeNode) {
        let scrollTo = selectedTreeNode.data != undefined ? selectedTreeNode.data : selectedTreeNode;
        const quillRef = this.reactQuillRef.getEditor();
        quillRef.setSelection(scrollTo, 0);
    }

    addComment() {
        const quill = this.reactQuillRef.getEditor();
        var range = quill.getSelection();
        let position = range ? range.index : 0;
        quill.insertText(position, '☑')
    }

    prevComment() {
    }

    nextComment() {
    }

    /* returns element chosen view mode */
    userView(viewMode) {
        let height = "";
        let modules = "";
        let placeholder = 'Enter your text here';
        let add = { onChange: () => { } };
        if (viewMode) {
            height = '88vh';
            modules = mainViewConstants.VIEWER_MODE
        }
        else {
            height = '78vh';
            modules = mainViewConstants.EDITOR_MODE
            add.onChange = this.handleChange;

        }

        return (
            <ReactQuill
                ref={(el) => { this.reactQuillRef = el }}
                style={{ height: height }}
                placeholder={placeholder}
                modules={mainViewConstants.EDITOR[modules]}
                formats={mainViewConstants.EDITOR.formats}
                value={this.state.text}
                onChange={add.onChange}
                theme={"snow"}
            />
        );
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
        return Promise.resolve('blabla');
    }

    returnNodeLinks() {
        let a = this;
        return (
            <ListGroup>
                <ListGroupItem onClick={this.setLink} tag="button" action>Cras justo odio</ListGroupItem>
                <ListGroupItem onClick={this.setLink} tag="button" action>Dapibus ac facilisis in</ListGroupItem>
                <ListGroupItem onClick={this.setLink} tag="button" action>Morbi leo risus</ListGroupItem>
                <ListGroupItem onClick={this.setLink} tag="button" action>Porta ac consectetur ac</ListGroupItem>
            </ListGroup>
        );
    }

    setLink() {
        let a = 1;
        this.toggle();
    }

    render() {
        const placeholder = 'Enter your text here'
        const { testEdit } = this.props;
        const { text, viewMode } = this.state
        const view = this.userView(viewMode);
        const returnNodeLinks = this.returnNodeLinks();
        return (

            <div className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                <div className="text-editor text-editor-size">
                    {view}
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader>Modal title</ModalHeader>
                    <ModalBody>
                        {returnNodeLinks}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>

        );
    }
}

function mapStateToProps(state) {
    const { tree, navBar, mainView } = state;
    const selectedTreeNode = tree.selected || 0;
    const toggleNode = tree.toggleNode
    const isSaved = navBar.save;
    const viewMode = mainView.viewMode == undefined ? true : mainView.viewMode;
    return {
        selectedTreeNode,
        isSaved,
        viewMode,
        toggleNode
    };
}

const MainView = connect(mapStateToProps)(MainViewComponent);
export { MainView as MainViewComponent };


