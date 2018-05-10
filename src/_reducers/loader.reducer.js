import { loaderConstants } from '../_constants';

export function loader(state = {}, action) {
  switch (action.type) {
    case loaderConstants.SHOW_LOADER:
      return {
        showLoader: action.show
      };
    default:
      return state
  }
}