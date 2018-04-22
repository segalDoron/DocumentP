import React from 'react';

export const mainViewConstants = {
    CURRENT_SELECTION: 'CURRENT_NODE_SELECTION',
    EDITOR: {
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
                ['link', 'image'],                                         // add image or link
            ]
        }
    }
}


export const CUSTOMIMAGEBUTTON =
    React.createElement('span', { className: 'ql-formats' },
        React.createElement('button', { className: 'ql-image', type: "button" },
            React.createElement('svg', { viewBox: "0 0 18 18" },
                [
                    React.createElement('rect', { className: "ql-stroke", height: "10", width: "12", x: "3", y: "4", key: 1 }),
                    React.createElement('circle', { className: "ql-fill", cx: "6", cy: "7", r: "1", key: 1 }),
                    React.createElement('polyline', { className: "ql-even ql-fill", points: "5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12", key: 1 }),
                ]
            )
        )
    );

