import { navBarConstants } from '../_constants';

export function navBar(state = {}, action) {
  switch (action.type) {
    case navBarConstants.IS_SAVE:
      return {
        save: action.state
      };
    default:
      return state
  }
}