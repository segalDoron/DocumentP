import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { tree } from './tree.reducer';
import { mainView } from './mainView.reducer';
import { navBar } from './navBar.reducer';
const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  tree,
  mainView,
  navBar
});

export default rootReducer;