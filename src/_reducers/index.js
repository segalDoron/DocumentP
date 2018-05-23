import { combineReducers } from 'redux';

import { loader } from './loader.reducer';
import { tree } from './tree.reducer';
import { editorView } from './editorView.reducer';
import { navBar } from './navBar.reducer';
const rootReducer = combineReducers({
  loader,
  tree,
  editorView,
  navBar
});

export default rootReducer;