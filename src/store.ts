import { configureStore } from 'redux-starter-kit'

import rootReducer from './rootReducer'
import { setPath } from 'features/nav/navSlice';

const store = configureStore({
  reducer: rootReducer
})

// @ts-ignore
if (process.env.NODE_ENV === 'development' && module.hot) {
  // @ts-ignore
    module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default
    store.replaceReducer(newRootReducer)
  })
}

export type AppDispatch = typeof store.dispatch

export default store


window.onpopstate = function(event:any) {
  console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
  store.dispatch(setPath(event.state));
};