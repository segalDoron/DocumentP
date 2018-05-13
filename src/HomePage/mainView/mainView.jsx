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
            lastPosition: -1,
            saved: false,
            saveTrigger: 0,
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

        // set view state
        const nextView = nextProps.viewMode != undefined ? nextProps.viewMode : this.state.viewMode;
        this.setState({ viewMode: nextView })

        //set selected tree node
        const selected = this.state.nodeSelected
        if (nextProps.selectedTreeNode !== selected)
            this.setState({ nodeSelected: nextProps.selectedTreeNode })

        // set save
        if (nextProps.saveTrigger != undefined && nextProps.saveTrigger != this.state.saveTrigger) {
            this.setState({ saved: true })
            this.save()
        }
        this.setState({ saveTrigger: nextProps.saveTrigger })

        this.scrollTo(nextProps.selectedTreeNode);

        return false;
    }

    /* Updates component */
    componentDidUpdate(prevProps, prevState, snapshot) {
        const prevView = prevState.viewMode == undefined ? false : prevState.viewMode;
        const quillRef = this.reactQuillRef.getEditor();
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
    }

    /* Invoke once after component render method finishes */
    componentDidMount() {
        this.bindLinkToScrollFun();
        this.reactQuillRef.getEditor().enable(!this.state.viewMode);

    }

    save() {
        const quill = this.reactQuillRef.getEditor();
        var delta = quill.getContents();
        mainViewService_del.save(delta);
        var range = quill.getSelection();
        this.setState({ lastPosition: range.index });

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
                quill.clipboard.dangerouslyPasteHTML(position, '<iframe width="250" height="250"  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Cochlospermum_regium_%28yellow_cotton_tree%29_flower.jpg/250px-Cochlospermum_regium_%28yellow_cotton_tree%29_flower.jpg" ></iframe >')
            )
    }

    /* Add custom link to scroll inside quil editor */
    addLink(elPosition) {
        const quill = this.reactQuillRef.getEditor();
        const { range } = this.state
        var text = quill.getText(range.index, range.length);
        quill.deleteText(range.index, range.length);
        quill.clipboard.dangerouslyPasteHTML(range.index, '<a href="#' + elPosition + '?" ><b>' + text + '</b></a>');
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
        const { text, viewMode, saveTrigger } = this.state
        const view = this.userView(viewMode, saveTrigger);
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
    const treeTriggered = tree.nodeTriggered
    const toggleNode = tree.toggleNode
    const viewMode = mainView.viewMode;
    const saveTrigger = mainView.saveTrigger
    return {
        selectedTreeNode,
        viewMode,
        toggleNode,
        saveTrigger,
        treeTriggered
    };
}

const MainView = connect(mapStateToProps)(MainViewComponent);
export { MainView as MainViewComponent };


