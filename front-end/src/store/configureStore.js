import {createBrowserHistory} from "history";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {connectRouter, routerMiddleware} from "connected-react-router";
import thunkMiddleware from "redux-thunk";

import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import usersReducer from "./reducers/usersReducer";
import categoriesReducer from "./reducers/categoriesReducer";
import itemsReducer from "./reducers/itemsReducer";


export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
	router: connectRouter(history),
	users: usersReducer,
	categories: categoriesReducer,
	items: itemsReducer
});

const middleware = [
	thunkMiddleware,
	routerMiddleware(history)
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedState = loadFromLocalStorage();

const store = createStore(rootReducer, persistedState, enhancers);

store.subscribe(() => {
	saveToLocalStorage({
		users: {
			user: store.getState().users.user
		}
	})
});

export default store;