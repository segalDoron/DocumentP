import ReactQuill from 'react-quill';

const { Quill } = ReactQuill;

let Inline = ReactQuill.Quill.import('blots/inline');
export class EmphBlot extends Inline {
    static create(value) {
        let node = super.create();
        node.setAttribute('id', 'comment');
        return node;
    }
}
EmphBlot.blotName = 'em';
EmphBlot.tagName = 'em';
EmphBlot.className = 'custom-em';

