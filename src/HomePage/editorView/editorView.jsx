import React from 'react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import { viewService_del } from '../../_services';
import { editorViewConstants, EditorCustomButtons } from '../../_constants';
import { SelectLinkModel, SelectPicModel, ShowAllComments } from '../../Models';
import { EmphBlot } from '../../_helpers/quill_blot';
import $ from 'jquery';

const { Quill, Mixin, Toolbar, Delta } = ReactQuill;

ReactQuill.Quill.register('formats/em', EmphBlot);


class EditorViewComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            LinkModalOpen: false,
            imgModelOpen: false,
            commentsModelOpen: false,
            text: "",
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

        return false;
    }

    /* Updates component */
    componentDidUpdate(prevProps, prevState, snapshot) {
        let prevView = prevState.viewMode == undefined ? false : prevState.viewMode;
        let quillRef = this.reactQuillRef.getEditor();
        if (!this.state.viewMode == prevView) {
            quillRef.enable(!this.state.viewMode);
            $(".ql-tooltip").remove();
            if (!this.state.viewMode)
                this.updateToolBar()
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

    // upload data before the components upload
    componentWillMount() {

    }

    /* Invoke once after component render method finishes */
    componentDidMount() {
        this.bindLinkToScrollFun();
        this.reactQuillRef.getEditor().enable(!this.state.viewMode);
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
        EditorCustomButtons.forEach(customButton => {
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
    //if pressed form toolbar mast be chars selected
    //if pressed from inside the model will be closed
    modelToggle(buttonPressed) {
        let modelType = typeof buttonPressed == "object" ? buttonPressed.currentTarget.id : buttonPressed;

        switch (modelType) {
            case editorViewConstants.LINK:
                let quill = this.reactQuillRef.getEditor();
                let selectionRange = quill.getSelection();
                if ((selectionRange && selectionRange.length > 0)) { this.setState({ LinkModalOpen: true }); }
                break;
            case editorViewConstants.CLOSE_LINK_MODULE:
                this.setState({ LinkModalOpen: false });
                break;
            case editorViewConstants.ADD_IMG:
                this.setState({ imgModelOpen: !this.state.imgModelOpen, });
                break;

            case editorViewConstants.VIEW_COMMENTS:
                this.setState({ commentsModelOpen: !this.state.commentsModelOpen })
                break;
        }
    }

    addComment() {
        let range = this.reactQuillRef.getEditor().getSelection();
        if (range) {
            this.reactQuillRef.getEditor().format('em', this.state.AddComment);
        }

        this.state.AddComment ? $('#btn_comment').addClass("ql-active") : $('#btn_comment').removeClass("ql-active")
        this.setState({ AddComment: !this.state.AddComment })
        range = null;
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
            modules = editorViewConstants.EDITOR_MODE
            add.onChange = this.handleChange;
        }
        else {
            height = '88vh';
            modules = editorViewConstants.VIEWER_MODE
        }

        return (
            <div>
                <ReactQuill
                    ref={(el) => { this.reactQuillRef = el }}
                    style={{ height: height }}
                    placeholder={placeholder}
                    modules={editorViewConstants.EDITOR[modules]}
                    formats={editorViewConstants.EDITOR.formats}
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
                <SelectLinkModel isOpen={this.state.LinkModalOpen} toggle={this.modelToggle} add={this.addLink} quillRef={this.reactQuillRef} />
                <SelectPicModel isOpen={this.state.imgModelOpen} toggle={this.modelToggle} quillRef={this.reactQuillRef} />
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

const EditorView = connect(mapStateToProps)(EditorViewComponent);
export { EditorView as EditorViewComponent };


