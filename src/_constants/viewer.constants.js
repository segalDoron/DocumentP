
export const viewerConstants = {
    VIEW: 'VIEW',
    SAVE: 'SAVE',
    EDITOR_MODE: 'editModule',
    VIEWER_MODE: 'viewModule',

    EDITOR: {
        editModule: {
            toolbar: []
        },
        viewModule: {
            toolbar: false
        }
    },

}


export const ViewerCustomButtons =
    [            
        {
            // add comment
            button: `
                    <span class="ql-formats" title="Add Comment" id="comment">
                        <button type="button" class="ql_edit" id="btn_comment">
                            <svg viewBox="0 -4 40 50">
                                <path class="ql-fill" d="m20 8.6q-4.6 0-8.5 1.5t-6.3 4.2-2.3 5.7q0 2.5 1.6 4.8t4.4 3.9l2 1.1-0.6 2.1q-0.5 2.1-1.6 3.9 3.4-1.4 6.2-3.8l0.9-0.9 1.3 0.2q1.5 0.1 2.9 0.1 4.6 0 8.5-1.5t6.3-4.2 2.3-5.7-2.3-5.7-6.3-4.2-8.5-1.5z m20 11.4q0 3.9-2.7 7.2t-7.3 5.2-10 1.9q-1.6 0-3.2-0.2-4.5 3.9-10.3 5.4-1.1 0.3-2.6 0.5h-0.1q-0.3 0-0.6-0.2t-0.3-0.6v-0.1q-0.1-0.1 0-0.2t0-0.3 0.1-0.2l0.1-0.2 0.2-0.2 0.2-0.2q0.1-0.1 0.7-0.7t0.7-0.9 0.7-0.9 0.8-1.1 0.6-1.3 0.5-1.7q-3.5-2-5.5-4.9t-2-6.3q0-3.9 2.7-7.2t7.3-5.2 10-1.9 10 1.9 7.3 5.2 2.7 7.2z"></path>
                            </svg>
                        </button>
                    </span>`,
            order: -1,
            handlerName: 'addComment'
        },
        {
            // open comments module
            button: `
                    <span class="ql-formats" title="Open All Comment" id="VIEW_COMMENTS">
                        <button type="button" class="ql_edit">
                            <svg viewBox="0 -4 40 50" class="ql_edit">
                                <path d="m14.3 20q0 1.2-0.9 2t-2 0.9-2-0.9-0.8-2 0.8-2 2-0.9 2 0.9 0.9 2z m8.6 0q0 1.2-0.9 2t-2 0.9-2-0.9-0.9-2 0.9-2 2-0.9 2 0.9 0.9 2z m8.5 0q0 1.2-0.8 2t-2 0.9-2-0.9-0.9-2 0.9-2 2-0.9 2 0.9 0.8 2z m-11.4-11.4q-4.6 0-8.5 1.5t-6.3 4.2-2.3 5.7q0 2.5 1.6 4.8t4.4 3.9l2 1.1-0.6 2.1q-0.5 2.1-1.6 3.9 3.4-1.4 6.2-3.8l0.9-0.9 1.3 0.2q1.5 0.1 2.9 0.1 4.6 0 8.5-1.5t6.3-4.2 2.3-5.7-2.3-5.7-6.3-4.2-8.5-1.5z m20 11.4q0 3.9-2.7 7.2t-7.3 5.2-10 1.9q-1.6 0-3.2-0.2-4.5 3.9-10.3 5.4-1.1 0.3-2.6 0.5h-0.1q-0.3 0-0.6-0.2t-0.3-0.6v-0.1q-0.1-0.1 0-0.2t0-0.3 0.1-0.2l0.1-0.2 0.2-0.2 0.2-0.2q0.1-0.1 0.7-0.7t0.7-0.9 0.7-0.9 0.8-1.1 0.6-1.3 0.5-1.7q-3.5-2-5.5-4.9t-2-6.3q0-2.9 1.6-5.5t4.2-4.6 6.4-3.1 7.8-1.1 7.8 1.1 6.3 3.1 4.3 4.6 1.6 5.5z"></path>
                            </svg>
                        </button>
                    </span>`,
            order: -1,
            handlerName: 'modelToggle'
        },
        {
            // next comment
            button: `
                    <span class="ql-formats" style="margin-right:0" title="prev comment" id="prevComment">
                        <button type="button">
                             <svg viewBox="0 -4 40 50" class="ql_edit">
                                <path d="m26.5 12.1q0 0.3-0.2 0.6l-8.8 8.7 8.8 8.8q0.2 0.2 0.2 0.5t-0.2 0.5l-1.1 1.1q-0.3 0.3-0.6 0.3t-0.5-0.3l-10.4-10.4q-0.2-0.2-0.2-0.5t0.2-0.5l10.4-10.4q0.3-0.2 0.5-0.2t0.6 0.2l1.1 1.1q0.2 0.2 0.2 0.5z"></path>
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
                                <path d="m26.3 21.4q0 0.3-0.2 0.5l-10.4 10.4q-0.3 0.3-0.6 0.3t-0.5-0.3l-1.1-1.1q-0.2-0.2-0.2-0.5t0.2-0.5l8.8-8.8-8.8-8.7q-0.2-0.3-0.2-0.6t0.2-0.5l1.1-1.1q0.3-0.2 0.5-0.2t0.6 0.2l10.4 10.4q0.2 0.2 0.2 0.5z"></path>
                            </svg>
                        </button>
                    </span>`,
            order: -1,
            handlerName: 'nextComment'
        }
    ]
