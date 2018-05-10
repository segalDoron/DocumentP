import React from 'react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import { mainViewService_bl, mainViewService_del } from '../../_services';
import { mainViewConstants, CUSTOMBUTTONS } from '../../_constants';
import { SelectLinkModel } from '../../Models'
import $ from 'jquery';



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
            save: 0,
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
        this.addComment = this.addComment.bind(this);
        this.scrollTo = this.scrollTo.bind(this);
        this.addLink = this.addLink.bind(this);
        this.modelToggle = this.modelToggle.bind(this);
        this.bindLinkToScrollFun = this.bindLinkToScrollFun.bind(this);
        this.save = this.save.bind(this);

    }


    /* update component on props change */
    componentWillReceiveProps(nextProps, nextState) {

        this.setState({ viewMode: nextProps.viewMode, save: nextProps.saveTrigger })
        const selected = this.state.nodeSelected

        //set selected tree node
        if (nextProps.selectedTreeNode !== selected)
            this.setState({ nodeSelected: nextProps.selectedTreeNode })

        this.scrollTo(nextProps.selectedTreeNode);

        if (nextProps.saveTrigger != undefined) this.save()

        return false;
    }

    /* Updates component */
    componentDidUpdate(prevProps, prevState, snapshot) {
        const prevView = prevState.viewMode == undefined ? false : prevState.viewMode;
        if (!this.state.viewMode == prevView) {
            this.reactQuillRef.getEditor().enable(!this.state.viewMode);
            $(".ql-tooltip").remove();
            if (!this.state.viewMode)
                this.updateToolBar()
        }
        this.bindLinkToScrollFun();
    }

    /* Invoke once after component render method finishes */
    componentDidMount() {
        this.bindLinkToScrollFun();
        this.reactQuillRef.getEditor().enable(!this.state.viewMode);
    }

    save() {
        const quill = this.reactQuillRef.getEditor();
        var range = quill.getSelection();
        quill.setSelection(range.index, 0);
        var delta = quill.getContents();
        mainViewService_del.save(delta);
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
        // this.bindLinkToScrollFun();

    }

    /* remove link redirect and bind to scroll function */
    bindLinkToScrollFun() {
        let action = this.scrollTo
        let anchorList = $("a[target='_blank']");
        anchorList.each(function () {
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
        const { text, viewMode, save } = this.state
        const view = this.userView(viewMode, save);
        this.bindLinkToScrollFun();
        return (

            <div className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                <div className="text-editor text-editor-size">
                    {view}
                </div>
                <SelectLinkModel isOpen={this.state.modal} toggle={this.modelToggle} add={this.addLink} />
            </div>

        );
    }
}

function mapStateToProps(state) {
    const { tree, navBar, mainView } = state;
    const selectedTreeNode = tree.selected || 0;
    const toggleNode = tree.toggleNode
    const viewMode = mainView.viewMode;
    const saveTrigger = mainView.saveTrigger
    return {
        selectedTreeNode,
        viewMode,
        toggleNode,
        saveTrigger
    };
}

const MainView = connect(mapStateToProps)(MainViewComponent);
export { MainView as MainViewComponent };


