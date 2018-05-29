import { combineReducers } from 'redux';

import { loader } from './loader.reducer';
import { tree } from './tree.reducer';
import { view } from './view.reducer';
import { navBar } from './navBar.reducer';
const rootReducer = combineReducers({
  loader,
  tree,
  view,
  navBar
});

export default rootReducer;