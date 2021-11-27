
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import { PhotoReducer } from "./Redux/reducer";

const rootReducer = combineReducers({
    PhotoReducer
})

const composedEnhancer =
 (typeof window !== "undefined" &&
         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
            compose;

const enhencer = composedEnhancer(applyMiddleware(thunk))
export const store = createStore(rootReducer, enhencer);


