
import React from 'react';
import { connect } from 'react-redux';
import { mainViewActions } from '../../_actions';
import ReactQuill from 'react-quill';

const Editor = {
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
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

    componentWillMount() {
        const { dispatch, selected } = this.props;
        dispatch(mainViewActions.displayCurrentSelection(selected));
    }

    handleChange(value) {
        this.setState({ text: value })
    }

    render() {
        return (
            <div className="text-editor text-editor-size">
                <div id="toolbar"></div>
                <ReactQuill style={{ height: '100%' }}
                    onChange={this.handleChange}
                    placeholder={this.props.placeholder}
                    modules={Editor.modules}
                    formats={Editor.formats}
                    theme={"snow"} // pass false to use minimal theme
                />
            </div>

        );
    }
}

function mapStateToProps(state) {
   
}

const MainView = connect(mapStateToProps)(MainViewComponent);
export { MainView as MainViewComponent };
