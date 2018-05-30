import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';

// for debug purposes:

// To console log redux action stats :
// 1. Add this line to the current file - const loggerMiddleware = createLogger();
// 2. Add loggerMiddleware const to the store
//      applyMiddleware(
//           thunkMiddleware,
//           loggerMiddleware
//       )


// To enable work with ReduxDev tool on chrome:
// 1. Download on chrome the ReduxDev extension
// 2. Add this line to the current file - const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// 3. replace content of store with -
//      rootReducer,
//           composeEnhancers(
//                 applyMiddleware(
//                   thunkMiddleware        
//                  )
//            )


export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware        
    )
);