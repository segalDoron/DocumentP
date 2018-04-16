
import React from 'react';
import { connect } from 'react-redux';
import { mainViewActions } from '../../_actions';
import ReactQuill from 'react-quill';
import $ from 'jquery';

const Editor = {
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            ['link', 'image'],
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean']
        ]
    }
};

class MainViewComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = { text: "" } // You can also pass a Quill Delta here
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        $(".ql-container").css("min-height", "75vh");
    }

    componentWillMount() {
        const { dispatch, selected } = this.props;
        dispatch(mainViewActions.displayCurrentSelection(selected));
    }

    handleChange(value) {
        this.setState({ text: value })
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
                        <ReactQuill style={{ height: 'inherit' }}
                            onChange={this.handleChange}
                            placeholder={placeholder}
                            modules={Editor.modules}
                            formats={Editor.formats}
                            value={this.state.text}
                            theme={"snow"} // pass false to use minimal theme
                        />
                    </div>
                }
                {!testEdit &&
                    <div>{this.state.text}</div>}
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


