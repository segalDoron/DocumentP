import React from 'react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import { viewService_del } from '../../_services';
import { viewerConstants, ViewerCustomButtons } from '../../_constants';
import { ShowAllComments } from '../../Models';
import { EmphBlot } from '../../_helpers/quill_blot';
import $ from 'jquery';

const { Quill, Mixin, Toolbar, Delta } = ReactQuill;

ReactQuill.Quill.register('formats/em', EmphBlot);


class ViewerComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            commentsModelOpen: false,
            text: `componentDidUpdate(prevProps, prevState, snapshot) {
                let prevView = prevState.viewMode == undefined ? false : prevState.viewMode;
                let quillRef = this.reactQuillRef.getEditor();
                if (!this.state.viewMode == prevView) {
                    this.reactQuillRef.getEditor().enable(false);
                    $(".ql-tooltip").remove();
                    if (!this.state.viewMode)
                        this.updateToolBar()                        
                `
            ,
            nodeSelected: "",
            viewMode: true,
            content: Delta,
            lastPosition: 0,
            saved: false,
            saveTrigger: 0,
            commentsArray: [],
            AddComment: true,
            commentPointer: -1,

        }

        this.dispatch = this.props.dispatch;
        this.commentClicked = false;

        // create quill ref
        this.reactQuillRef = null;

        // bind functions
        this.handleChange = this.handleChange.bind(this)
        this.userView = this.userView.bind(this);
        this.scrollTo = this.scrollTo.bind(this);
        this.modelToggle = this.modelToggle.bind(this);
        this.bindLinkToScrollFun = this.bindLinkToScrollFun.bind(this);
        this.save = this.save.bind(this);
        this.prevComment = this.prevComment.bind(this);
        this.nextComment = this.nextComment.bind(this);
        this.addComment = this.addComment.bind(this);
    }

    /* update component on props change */
    componentWillReceiveProps(nextProps, nextState) {

        // set view state
        let nextView = nextProps.viewMode != undefined ? nextProps.viewMode : this.state.viewMode;
        this.setState({ viewMode: nextView })

        //set selected tree node
        let selected = this.state.nodeSelected
        if (nextProps.selectedTreeNode !== selected)
            this.setState({ nodeSelected: nextProps.selectedTreeNode })

        // set save
        if (nextProps.saveTrigger != undefined && nextProps.saveTrigger != this.state.saveTrigger) {
            this.setState({ saved: true })
            this.save()
        }
        this.setState({ saveTrigger: nextProps.saveTrigger })

        //set Comments data
        if (nextProps.commentsArray != undefined) {
            this.setState({ commentsArray: nextProps.commentsArray })
        }

        this.scrollTo(nextProps.selectedTreeNode);

        nextView = null;
        selected = null;
        this.commentClicked = false;

        return false;
    }

    /* Updates component */
    componentDidUpdate(prevProps, prevState, snapshot) {
        let prevView = prevState.viewMode == undefined ? false : prevState.viewMode;
        let quillRef = this.reactQuillRef.getEditor();
        if (!this.state.viewMode == prevView) {
            this.reactQuillRef.getEditor().enable(false);
            $(".ql-tooltip").remove();
            if (!this.state.viewMode)
                this.updateToolBar()

            // enable delete only if it is a comment tag
            this.reactQuillRef.getEditor().keyboard.addBinding({
                key: 8,
            }, (range, context) => {
                this.reactQuillRef.getEditor();
            });

            // disable edit mode when clicked out of a comment
            this.reactQuillRef.getEditor().on('editor-change', (eventName, ...args) => {
                let quillRef = this.reactQuillRef.getEditor();
                if (this.commentClicked) {
                    if (eventName === 'selection-change') {
                        let format = quillRef.getFormat(args[1].index, 1);
                        let endFormat = quillRef.getFormat(args[0].index, 1);
                        let startFormat = quillRef.getFormat(args[0].index == 0 ? 0 : args[0].index - 1, 1);
                        if (!(startFormat['em'] || endFormat['em'])) {
                            quillRef.enable(false);
                            this.commentClicked = false;
                            $('#btn_comment').removeClass("ql-active")
                        }
                    }
                }
            });
        }

        if (this.state.saved) {
            quillRef.setSelection(this.state.lastPosition, 0)
            quillRef.focus();
            this.setState({ saved: false })
        }
        this.bindLinkToScrollFun();

        prevView = null;
        quillRef = null;
    }

    /* Invoke once after component render method finishes */
    componentDidMount() {
        this.bindLinkToScrollFun();
        this.reactQuillRef.getEditor().enable(false);
        document.addEventListener('contextmenu', event => event.preventDefault());
    }

    save() {
        let quill = this.reactQuillRef.getEditor();
        let delta = quill.getContents();
        viewService_del.save(delta);
        let range = quill.getSelection();
        this.setState({ lastPosition: range != null ? range.index : 0 });

        quill = null;
        delta = null;
        range = null;
    }

    handleChange(value) {
        this.setState({ text: value })
    }

    /* update toolbar with custom buttons*/
    updateToolBar() {
        ViewerCustomButtons.forEach(customButton => {
            let numberOfEditorButtons = $(".ql-toolbar").children().length;
            let lastButton = $(".ql-toolbar").children().eq(numberOfEditorButtons - 1);
            lastButton.after(customButton.button);
            lastButton = $(".ql-toolbar").children().eq(numberOfEditorButtons);
            lastButton.bind("click", this[customButton.handlerName]);

            lastButton = null;
            numberOfEditorButtons = null;
        })
    }

    /* remove link redirect and bind to scroll function */
    bindLinkToScrollFun() {
        let action = this.scrollTo
        let anchorList = $("a[target='_blank']");
        anchorList.each(function () {
            $(this).unbind("click", action);
            $(this).removeAttr("target");
            let setTo = $(this).attr('href');
            setTo = parseInt(setTo.slice(1, -1));
            $(this).bind("click", setTo, action);
        });

        action = null;
        anchorList = null;
    }

    /* scroll to quill editor position */
    scrollTo(selectedTreeNode) {
        let scrollTo = selectedTreeNode.data != undefined ? selectedTreeNode.data : selectedTreeNode;
        let quillRef = this.reactQuillRef.getEditor();
        quillRef.setSelection(scrollTo, 0);

        scrollTo = null;
        quillRef = null;
    }

    /* toggle modle view */
    modelToggle(buttonPressed) {
        this.setState({ commentsModelOpen: !this.state.commentsModelOpen })
    }


    addComment() {
        const clicked = !this.commentClicked;
        const quillRef = this.reactQuillRef.getEditor();
        quillRef.enable(clicked);
        let range = quillRef.getSelection();


        if (range && range.length === 0) {
            let startIndex = range.index !== 0 ? range.index - 1 : 0;

            let text = quillRef.getText(startIndex, 1);
            let endFormat = quillRef.getFormat(range.index, 1);
            let startFormat = quillRef.getFormat(startIndex, 1);

            if (clicked && !(startFormat['em'] || endFormat['em'])) {
                quillRef.insertText(range.index, '\n');
                quillRef.insertText(range.index, '\n');
                quillRef.setSelection(range.index + 1, 0);
            }
            if (!(/\S/.test(text))) {
                quillRef.deleteText(startIndex, 2)
            }
            if (clicked)
                quillRef.format('em', clicked);
        }

        !this.commentClicked ? $('#btn_comment').addClass("ql-active") : $('#btn_comment').removeClass("ql-active")
        this.commentClicked = clicked;
    }

    prevComment() {
        if (this.state.commentPointer > 0) {
            let comment = this.state.commentsArray[this.state.commentPointer - 1]
            this.reactQuillRef.getEditor().setSelection(comment.position, 0);
            this.setState({ commentPointer: this.state.commentPointer - 1 })
        }
    }

    nextComment() {
        if (this.state.commentPointer < this.state.commentsArray.length - 1) {
            let comment = this.state.commentsArray[this.state.commentPointer + 1]
            this.reactQuillRef.getEditor().setSelection(comment.position, 0);
            this.setState({ commentPointer: this.state.commentPointer + 1 })
        }
    }

    /* returns element chosen view mode */
    userView(viewMode, save) {
        let height = "";
        let modules = "";
        let placeholder = 'Enter your text here';
        let add = { onChange: () => { } };
        if (!viewMode || save) {
            height = '78vh';
            modules = viewerConstants.EDITOR_MODE
            add.onChange = this.handleChange;
        }
        else {
            height = '88vh';
            modules = viewerConstants.VIEWER_MODE
        }

        return (
            <div>
                <ReactQuill
                    ref={(el) => { this.reactQuillRef = el }}
                    style={{ height: height }}
                    placeholder={placeholder}
                    modules={viewerConstants.EDITOR[modules]}
                    formats={viewerConstants.EDITOR.formats}
                    value={this.state.text}
                    onChange={add.onChange}
                    theme={"snow"}
                />
            </div>
        );
    }

    render() {
        const placeholder = 'Enter your text here'
        const { testEdit } = this.props;
        const { text, viewMode, saveTrigger } = this.state
        const view = this.userView(viewMode, saveTrigger);
        this.bindLinkToScrollFun();
        return (

            <div className="col-md-10 pt-3">
                <div className="text-editor text-editor-size">
                    {view}
                </div>
                <ShowAllComments isOpen={this.state.commentsModelOpen} toggle={this.modelToggle} quillRef={this.reactQuillRef} />
            </div>

        );
    }
}

function mapStateToProps(state) {
    const { tree, navBar, editorView } = state;
    const selectedTreeNode = tree.selected || 0;
    const treeTriggered = tree.nodeTriggered
    const toggleNode = tree.toggleNode
    const viewMode = editorView.viewMode;
    const saveTrigger = editorView.saveTrigger
    const commentsArray = editorView.comments
    return {
        selectedTreeNode,
        viewMode,
        toggleNode,
        saveTrigger,
        treeTriggered,
        commentsArray
    };
}

const Viewer = connect(mapStateToProps)(ViewerComponent);
export { Viewer as ViewerComponent };


