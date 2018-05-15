import { combineReducers } from 'redux';

import { loader } from './loader.reducer';
import { tree } from './tree.reducer';
import { mainView } from './mainView.reducer';
import { navBar } from './navBar.reducer';
const rootReducer = combineReducers({
  loader,
  tree,
  mainView,
  navBar
});

export default rootReducer;