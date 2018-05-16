import React from 'react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import { mainViewService_del } from '../../_services';
import { mainViewConstants, CUSTOMBUTTONS } from '../../_constants';
import { SelectLinkModel, SelectPicModel } from '../../Models';
import { EmphBlot } from '../../_helpers/quill_blot';
import $ from 'jquery';

const { Quill, Mixin, Toolbar, Delta } = ReactQuill;

ReactQuill.Quill.register('formats/em', EmphBlot);


class MainViewComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            LinkModalOpen: false,
            imgModelOpen: false,
            text: "",
            nodeSelected: "",
            viewMode: true,
            content: Delta,
            lastPosition: -1,
            saved: false,
            saveTrigger: 0,
            comments: []
        }

        this.dispatch = this.props.dispatch;

        // create quill ref
        this.reactQuillRef = null;

        // bind functions
        this.handleChange = this.handleChange.bind(this)
        this.addImageHandler = this.addImageHandler.bind(this);
        this.userView = this.userView.bind(this);
        this.scrollTo = this.scrollTo.bind(this);
        this.addLink = this.addLink.bind(this);
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
        if (nextProps.comments != undefined) {
            this.setState({ comments: nextProps.comments })
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
        mainViewService_del.save(delta);
        let range = quill.getSelection();
        this.setState({ lastPosition: range != null ? range.index : 0 });

        quill = null;
        delta = null;
        range = null;
    }

    /*
    componentWillMount() {
        let { selected } = this.props;
        this.dispatch(mainViewActions.displayCurrentSelection(selected));
    }
    */

    handleChange(value) {
        this.setState({ text: value })
    }

    /* update toolbar with custom buttons*/
    updateToolBar() {
        CUSTOMBUTTONS.forEach(customButton => {
            let numberOfEditorButtons = $(".ql-toolbar").children().length;
            let lastButton = $(".ql-toolbar").children().eq(numberOfEditorButtons - 1);
            lastButton.after(customButton.button);
            lastButton = $(".ql-toolbar").children().eq(numberOfEditorButtons);
            lastButton.bind("click", this[customButton.handlerName]);

            lastButton = null;
            numberOfEditorButtons = null;
        })
    }

    /* custom image handler */
    addImageHandler(value) {
        let quill = this.reactQuillRef.getEditor();
        let range = quill.getSelection();
        let position = range ? range.index : 0;
        quill.insertText(position, '\n');
        quill.clipboard.dangerouslyPasteHTML(position + 1, '<iframe width="250" height="250"  src="' + value + '" ></iframe >')

        quill = null;
        range = null;
        position = null;

    }

    /* Add custom link to scroll inside quil editor */
    addLink(elPosition) {
        let quill = this.reactQuillRef.getEditor();
        let range = this.state.range;
        let text = quill.getText(range.index, range.length);
        quill.deleteText(range.index, range.length);
        quill.clipboard.dangerouslyPasteHTML(range.index, '<a href="#' + elPosition + '?" ><b>' + text + '</b></a>');

        quill = null;
        range = null;
        text = null;
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
    modelToggle(buttonPressed, type) {
        let modelType = type == undefined ? buttonPressed.currentTarget.id : type;
        buttonPressed = typeof (buttonPressed) === "boolean" ? true : false;

        if (modelType == mainViewConstants.LINK) {
            let quill = this.reactQuillRef.getEditor();
            let selectionRange = quill.getSelection();
            if ((selectionRange && selectionRange.length > 0) || buttonPressed) {
                this.setState({
                    LinkModalOpen: !this.state.LinkModalOpen,
                    range: selectionRange
                });
            }
        }
        else if (modelType == mainViewConstants.ADD_IMG || buttonPressed) {
            this.setState({
                imgModelOpen: !this.state.imgModelOpen,
            });
        }
    }


    addComment() {
        let range = this.reactQuillRef.getEditor().getSelection();
        if (range) {
            this.reactQuillRef.getEditor().format('em', true);
        }
        range = null;
    }

    prevComment() {
    }

    nextComment() {
    }

    /* returns element chosen view mode */
    userView(viewMode, save) {
        let height = "";
        let modules = "";
        let placeholder = 'Enter your text here';
        let add = { onChange: () => { } };
        if (!viewMode || save) {
            height = '78vh';
            modules = mainViewConstants.EDITOR_MODE
            add.onChange = this.handleChange;
        }
        else {
            height = '88vh';
            modules = mainViewConstants.VIEWER_MODE
        }

        return (
            <div>
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
                <SelectLinkModel isOpen={this.state.LinkModalOpen} toggle={this.modelToggle} add={this.addLink} />
                <SelectPicModel isOpen={this.state.imgModelOpen} toggle={this.modelToggle} addImgToEditor={this.addImageHandler} />
            </div>

        );
    }
}

function mapStateToProps(state) {
    const { tree, navBar, mainView } = state;
    const selectedTreeNode = tree.selected || 0;
    const treeTriggered = tree.nodeTriggered
    const toggleNode = tree.toggleNode
    const viewMode = mainView.viewMode;
    const saveTrigger = mainView.saveTrigger
    const comments = mainView.comments
    return {
        selectedTreeNode,
        viewMode,
        toggleNode,
        saveTrigger,
        treeTriggered,
        comments
    };
}

const MainView = connect(mapStateToProps)(MainViewComponent);
export { MainView as MainViewComponent };


