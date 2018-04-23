import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import { navBarActions, mainViewActions } from '../../_actions';
import { mainViewConstants, CUSTOMIMAGEBUTTON } from '../../_constants'
import $ from 'jquery';

const { Quill, Mixin, Toolbar, Delta } = ReactQuill;

class MainViewComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: "",
            nodeSelected: ""
        }

        this.dispatch = this.props.dispatch;

        // create quill ref
        this.quillRef = null;
        this.reactQuillRef = null;

        // bind functions
        this.handleChange = this.handleChange.bind(this)
        this.customButtonAction = this.customButtonAction.bind(this);
        this.attachQuillRefs = this.attachQuillRefs.bind(this);
        this.save = this.save.bind(this);
    }


    /* update component on props change */
    componentWillReceiveProps(nextProps, nextState) {

        const selected = this.state.nodeSelected
        // set cursor on header selected
        if (nextProps.selectedTreeNode !== selected) {
            const quill = this.reactQuillRef.getEditor();
            var length = quill.getLength();
            var text = quill.getText(0, length);
            let a = text.indexOf(nextProps.selectedTreeNode);
            a = a == -1 || a == 0 ? 0 : a;
            quill.setSelection(a, 0);
            this.setState({ nodeSelected: nextProps.selectedTreeNode })
        }

        // invoke save method
        if (nextProps.isSaved == true) {
            this.save();
            this.dispatch(navBarActions.isSaved(false));
        }


        /*use jquery to scroll
            var target = $("#" + nextProps.selectedTreeNode);
            if (target.length) {
                event.preventDefault();
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - 40
                }, 300);
            }
        */

        return false;
    }

    componentDidMount() {
       
        ///////////////////////* create a custom button *////////////////////
       
        const customButton = CUSTOMIMAGEBUTTON;
        let button = ReactDOMServer.renderToStaticMarkup(customButton)
        var numberOfEditorButtons = $(".ql-toolbar").children().length;
        var lastButton = $(".ql-toolbar").children().eq(numberOfEditorButtons - 1);
        lastButton.after(button);
        lastButton = $(".ql-toolbar").children().eq(numberOfEditorButtons);
        lastButton.bind("click", this.customButtonAction);

        /////////////////////////////////////////////////////////////////////

         // create quill ref
         this.attachQuillRefs();

         /* fix text area to min height
            $(".ql-container").css("min-height", "75vh");
         */
    }

    componentWillMount() {
        const { selected } = this.props;
        this.dispatch(mainViewActions.displayCurrentSelection(selected));
    }

    handleChange(value) {
        this.setState({ text: value })
    }

    customButtonAction(value) {
        const quill = this.quillRef;
        var range = quill.getSelection();
        let position = range ? range.index : 0;
        quill.insertEmbed(position, 'image', '');
    }

    attachQuillRefs() {
        const quillRef = this.reactQuillRef.getEditor();
        if (quillRef != null) this.quillRef = quillRef;
    }

    save() {
        const quill = this.quillRef;
        var delta = quill.container.firstChild.innerHTML
        var editorHtml = $(".ql-editor").find('h1,h2,h3,h4');
        this.dispatch(mainViewActions.setTree(editorHtml));
    }

    render() {
        const placeholder = 'Enter your text here'
        const { testEdit } = this.props;
        const { text } = this.state
        return (
            <div className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                <div className="text-editor text-editor-size">
                    <div id="toolbar"></div>
                    <ReactQuill
                        ref={(el) => { this.reactQuillRef = el }}
                        style={{ height: '78vh' }}
                        onChange={this.handleChange}
                        placeholder={placeholder}
                        modules={mainViewConstants.EDITOR.modules}
                        formats={mainViewConstants.EDITOR.formats}
                        value={this.state.text}
                        theme={"snow"} // pass false to use minimal theme
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { tree, navBar } = state;
    const selectedTreeNode = tree.selected || '';
    const isSaved = navBar.save;
    return {
        selectedTreeNode,
        isSaved
    };
}

const MainView = connect(mapStateToProps)(MainViewComponent);
export { MainView as MainViewComponent };


