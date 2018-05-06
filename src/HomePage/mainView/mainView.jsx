import React from 'react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import { navBarActions, mainViewActions } from '../../_actions';
import { mainViewService_bl } from '../../_services';
import { mainViewConstants, CUSTOMBUTTONS } from '../../_constants';
import { Model } from '../../Model/model'
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
            content: Delta,
            range: {
                index: -1,
                length: -1
            }
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
        this.modelToggle = this.modelToggle.bind(this);
        this.bindLinkToScrollFun = this.bindLinkToScrollFun.bind(this);

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
            this.bindLinkToScrollFun();
            this.reactQuillRef.getEditor().enable(!this.state.viewMode);
            $(".ql-tooltip").remove();
            if (!this.state.viewMode)
                this.updateToolBar()
        }
    }

    /* Invoke once after component render method finishes */
    componentDidMount() {
        this.bindLinkToScrollFun();
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

    /* Add custom link to scroll inside quil editor */
    addLink(elPosition) {
        const quill = this.reactQuillRef.getEditor();
        const { range } = this.state
        var text = quill.getText(range.index, range.length);
        quill.deleteText(range.index, range.length);
        quill.clipboard.dangerouslyPasteHTML(range.index, '<a href="#' + elPosition + '?" ><b>' + text + '</b></a>');
        this.bindLinkToScrollFun();

    }

    /* remove link redirect and bind to scroll function */
    bindLinkToScrollFun() {
        let action = this.scrollTo
        $("a[target='_blank']").each(function () {
            $(this).unbind("click", action);
            $(this).removeAttr("target");
            var setTo = $(this).attr('href');
            setTo = parseInt(setTo.slice(1, -1));
            $(this).bind("click", setTo, action);
        });
    }

    /* scroll to quill editor position */
    scrollTo(selectedTreeNode) {
        let scrollTo = selectedTreeNode.data != undefined ? selectedTreeNode.data : selectedTreeNode;
        const quillRef = this.reactQuillRef.getEditor();
        quillRef.setSelection(scrollTo, 0);
    }

    /* toggle modle view */
    //if pressed form toolbar mast be chars selected
    //if pressed from inside the model will be closed

    modelToggle(buttonPressed) {
        const quill = this.reactQuillRef.getEditor();
        var selectionRange = quill.getSelection();
        buttonPressed = typeof (buttonPressed) === "boolean" ? true : false
        if ((selectionRange && selectionRange.length > 0) || buttonPressed) {
            this.setState({
                modal: !this.state.modal,
                range: selectionRange
            });
        }
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

    render() {
        const placeholder = 'Enter your text here'
        const { testEdit } = this.props;
        const { text, viewMode } = this.state
        const view = this.userView(viewMode);

        return (

            <div className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                <div className="text-editor text-editor-size">
                    {view}
                </div>
                <Model isOpen={this.state.modal} toggle={this.modelToggle} add={this.addLink} />
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


