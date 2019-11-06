import { combineReducers } from 'redux-starter-kit'
import navReducer from "./features/nav/navSlice";
import roundReducer from "./features/questions/roundSlice";

const rootReducer = combineReducers({
    nav: navReducer,
    round: roundReducer
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer

