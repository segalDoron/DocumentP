import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { connect } from 'react-redux';
import { mainViewActions } from '../../_actions';
import ReactQuill from 'react-quill';
import { mainViewConstants, CUSTOMIMAGEBUTTON } from '../../_constants'
import $ from 'jquery';

const { Quill, Mixin, Toolbar, Delta } = ReactQuill;

class MainViewComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = { text: "" } // You can also pass a Quill Delta here

        // create quill ref
        this.quillRef = null;
        this.reactQuillRef = null;

        this.handleChange = this.handleChange.bind(this)
        this.customButtonAction = this.customButtonAction.bind(this);
        this.attachQuillRefs = this.attachQuillRefs.bind(this);
    }


    componentWillReceiveProps(nextProps, nextState) {

        const quill = this.reactQuillRef.getEditor();
        var length = quill.getLength();
        var text = quill.getText(0, length);
        let a = text.indexOf(nextProps.selectedTreeNode);
        a = a == -1 || a == 0 ? 0 : a;
        quill.setSelection(a, 0);


        // use jquery to scroll
        // var target = $("#" + nextProps.selectedTreeNode);
        // if (target.length) {
        //     event.preventDefault();
        //     $('html, body').stop().animate({
        //         scrollTop: target.offset().top - 40
        //     }, 300);
        // }

        return false;
    }

    componentDidMount() {

        // create quill ref
        this.attachQuillRefs();


        // fix text area to min height
        //$(".ql-container").css("min-height", "75vh");


        ///////////////////////* create a custom button *////////////////////
        const customButton = CUSTOMIMAGEBUTTON;
        let button = ReactDOMServer.renderToStaticMarkup(customButton)
        var numberOfEditorButtons = $(".ql-toolbar").children().length;
        var lastButton = $(".ql-toolbar").children().eq(numberOfEditorButtons - 1);
        lastButton.after(button);
        lastButton = $(".ql-toolbar").children().eq(numberOfEditorButtons);
        lastButton.bind("click", this.customButtonAction);

        /////////////////////////////////////////////////////////////////////
    }

    componentWillMount() {
        const { dispatch, selected } = this.props;
        dispatch(mainViewActions.displayCurrentSelection(selected));
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
                        style={{ height: '80vh' }}
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
    const { tree } = state;
    const selectedTreeNode = tree.selected || '';
    return {
        selectedTreeNode
    };
}

const MainView = connect(mapStateToProps)(MainViewComponent);
export { MainView as MainViewComponent };


