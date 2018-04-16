export const mainViewConstants = {
    CURRENT_SELECTION: 'CURRENT_NODE_SELECTION',
    Editor : {
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],                     // add quot and code block
                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],    // list type
                [{ 'script': 'sub' }, { 'script': 'super' }],     // superscript/subscript
                [{ 'indent': '-1' }, { 'indent': '+1' }],         // outdent/indent          
                [{ 'direction': 'rtl' }],                         // text direction
                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],        // number of headers order
                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'font': [] }],                                 // font
                [{ 'align': [] }],                                // align
                ['link','image'],                                         // add image or link
            ]
        }
    }
}
