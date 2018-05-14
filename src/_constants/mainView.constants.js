
export const mainViewConstants = {
    LINK:"LINK",
    ADD_IMG:"ADD_IMG",
    CURRENT_SELECTION: 'CURRENT_NODE_SELECTION',
    VIEW: 'VIEW',
    SAVE: 'SAVE',
    EDITOR_MODE: 'editorModule',
    VIEWER_MODE: 'viewerModule',

    EDITOR: {
        editorModule: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote'],                                   // add quot and code block
                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],    // list type
                [{ 'script': 'sub' }, { 'script': 'super' }],     // superscript/subscript
                [{ 'indent': '-1' }, { 'indent': '+1' }],         // outdent/indent          
                [{ 'direction': 'rtl' }],                         // text direction
                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{ 'header': [1, 2, 3, 4, false] }],              // number of headers order
                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'font': [] }],                                 // font
                [{ 'align': [] }],                                // align                
            ]
            /*
            for pic
               toolbar: {
                container: [["bold", "italic"]['link']],
                handlers: {
                    // handlers object will be merged with default handlers object
                    'link': function (value) {
                        if (value) {
                            var href = prompt('Enter the URL');
                            this.quill.format('link', href);
                        } else {
                            this.quill.format('link', false);
                        }
                    }
                }
            }
            */
        },
        viewerModule: {
            toolbar: false         
        }
    },

}




export const CUSTOMBUTTONS =
    [
        {
            // add link
            button: `
                    <span class='ql-formats' id="LINK">
                        <button class="ql-link" type="button">
                           <svg viewBox='0 0 18 18'>
                                <line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"></line>
                                <path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"></path> <path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"></path> 
                            </svg>
                        </button>
                    </span>`,
            order: -1,
            handlerName: 'modelToggle'
        },
        {
            // add image
            button: `
                    <span class='ql-formats' id="ADD_IMG">
                        <button class='ql-image' type='button'>
                           <svg viewBox='0 0 18 18'>
                               <rect class='ql-stroke' height='10' width='12' x='3' y='4'></rect>
                               <circle class='ql-fill' cx='6' cy='7' r='1'></circle>
                               <polyline class='ql-even ql-fill' points='5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12'></polyline>
                            </svg>
                        </button>
                    </span>`,
            order: -1,
            handlerName: 'modelToggle'
        },
        {
            // add comment
            button: `
                    <span class="ql-formats" title="Add Comment" id="comment">
                        <button type="button">
                            <svg viewBox="0 -4 40 50" class="ql_edit">
                                <g>
                                    <path d="m20 8.6q-4.6 0-8.5 1.5t-6.3 4.2-2.3 5.7q0 2.5 1.6 4.8t4.4 3.9l2 1.1-0.6 2.1q-0.5 2.1-1.6 3.9 3.4-1.4 6.2-3.8l0.9-0.9 1.3 0.2q1.5 0.1 2.9 0.1 4.6 0 8.5-1.5t6.3-4.2 2.3-5.7-2.3-5.7-6.3-4.2-8.5-1.5z m20 11.4q0 3.9-2.7 7.2t-7.3 5.2-10 1.9q-1.6 0-3.2-0.2-4.5 3.9-10.3 5.4-1.1 0.3-2.6 0.5h-0.1q-0.3 0-0.6-0.2t-0.3-0.6v-0.1q-0.1-0.1 0-0.2t0-0.3 0.1-0.2l0.1-0.2 0.2-0.2 0.2-0.2q0.1-0.1 0.7-0.7t0.7-0.9 0.7-0.9 0.8-1.1 0.6-1.3 0.5-1.7q-3.5-2-5.5-4.9t-2-6.3q0-3.9 2.7-7.2t7.3-5.2 10-1.9 10 1.9 7.3 5.2 2.7 7.2z"></path>
                                </g>
                            </svg>
                        </button>
                    </span>`,
            order: -1,
            handlerName: 'addComment'
        },
        {
            // next comment
            button: `
                    <span class="ql-formats" style="margin-right:0" title="prev comment" id="prevComment">
                        <button type="button">
                             <svg viewBox="0 -4 40 50" class="ql_edit">
                                <g>
                                    <path d="m26.5 12.1q0 0.3-0.2 0.6l-8.8 8.7 8.8 8.8q0.2 0.2 0.2 0.5t-0.2 0.5l-1.1 1.1q-0.3 0.3-0.6 0.3t-0.5-0.3l-10.4-10.4q-0.2-0.2-0.2-0.5t0.2-0.5l10.4-10.4q0.3-0.2 0.5-0.2t0.6 0.2l1.1 1.1q0.2 0.2 0.2 0.5z"></path>
                                </g>
                            </svg>
                        </button>
                    </span>`,
            order: -1,
            handlerName: 'prevComment'
        },
        {
            // prev comment
            button: `
                    <span class="ql-formats" style="margin-right:0" title="next comment" id="nextComment">
                        <button type="button">
                            <svg viewBox="0 -4 40 50" class="ql_edit">
                                <g>
                                    <path d="m26.3 21.4q0 0.3-0.2 0.5l-10.4 10.4q-0.3 0.3-0.6 0.3t-0.5-0.3l-1.1-1.1q-0.2-0.2-0.2-0.5t0.2-0.5l8.8-8.8-8.8-8.7q-0.2-0.3-0.2-0.6t0.2-0.5l1.1-1.1q0.3-0.2 0.5-0.2t0.6 0.2l10.4 10.4q0.2 0.2 0.2 0.5z"></path>
                                </g>
                            </svg>
                        </button>
                    </span>`,
            order: -1,
            handlerName: 'nextComment'
        }
    ]
