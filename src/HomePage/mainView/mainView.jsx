import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { connect } from 'react-redux';
import { mainViewActions } from '../../_actions';
import ReactQuill  from 'react-quill';
import { mainViewConstants } from '../../_constants'
import $ from 'jquery';



class MainViewComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = { text: "" } // You can also pass a Quill Delta here

        // create quill ref
        this.quillRef = null;
        this.reactQuillRef = null;

        this.handleChange = this.handleChange.bind(this)
        this.customeButtomAction = this.customeButtomAction.bind(this);
        this.attachQuillRefs = this.attachQuillRefs.bind(this);
    }


    componentDidMount() {

        // create cuill ref
        this.attachQuillRefs();


        // fix text area to min height
        //$(".ql-container").css("min-height", "75vh");


        ///////////////////////* create a custom button *////////////////////
        const customeButtom =
            React.createElement('span', { className: 'ql-formats' },
                React.createElement('button', { className: 'ql-image', type: "button", onClick: this.customeButtomAction },
                    React.createElement('svg', { viewBox: "0 0 18 18" },
                        [
                            React.createElement('rect', { className: "ql-stroke", height: "10", width: "12", x: "3", y: "4", key: 1 }),
                            React.createElement('circle', { className: "ql-fill", cx: "6", cy: "7", r: "1", key: 1 }),
                            React.createElement('polyline', { className: "ql-even ql-fill", points: "5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12", key: 1 }),
                        ]
                    )
                )
            );

        let button = ReactDOMServer.renderToStaticMarkup(customeButtom)



        var numberOfEditorButtons = $(".ql-toolbar").children().length;
        var lastButton = $(".ql-toolbar").children().eq(numberOfEditorButtons - 1);
        lastButton.after(button);

        lastButton = $(".ql-toolbar").children().eq(numberOfEditorButtons);
        lastButton.bind("click", this.customeButtomAction);

        /////////////////////////////////////////////////////////////////////
    }

    componentDidUpdate () {
        this.attachQuillRefs();
      }

    componentWillMount() {
        const { dispatch, selected } = this.props;
        dispatch(mainViewActions.displayCurrentSelection(selected));
    }

    handleChange(value) {
        this.setState({ text: value })
    }

    customeButtomAction(value) {
        var range = this.quillRef.getSelection();
        let position = range ? range.index : 0;
        this.quillRef.insertEmbed(position, 'image', 'data:image/jpeg;base64,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');
    }

    attachQuillRefs() {
        // Ensure React-Quill reference is available:
        if (typeof this.reactQuillRef.getEditor !== 'function') return;
        // Skip if Quill reference is defined:
        if (this.quillRef != null) return;
        
        const quillRef = this.reactQuillRef.getEditor();
        if (quillRef != null) this.quillRef = quillRef;
      }

    render() {
        const placeholder = 'Enter your text here'
        const { testEdit } = this.props;
        const { text } = this.state
        return (
            <div className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                {testEdit &&
                    <div className="text-editor text-editor-size">
                        <div id="toolbar"></div>
                        <ReactQuill
                            ref={(el) => { this.reactQuillRef = el }}
                            style={{ height: '80vh' }}
                            onChange={this.handleChange}
                            placeholder={placeholder}
                            modules={mainViewConstants.Editor.modules}
                            formats={mainViewConstants.Editor.formats}
                            value={this.state.text}
                            theme={"snow"} // pass false to use minimal theme
                        />
                    </div>
                }
                {!testEdit &&
                    <div style={{ border: '1px solid #ccc' }}>
                        {/* {this.state.text} */}

                    </div>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { edit } = state;
    const testEdit = true;
    return {
        testEdit
    };
}

const MainView = connect(mapStateToProps)(MainViewComponent);
export { MainView as MainViewComponent };


