import {
	FETCH_CATEGORIES_FAILURE,
	FETCH_CATEGORIES_SUCCESS,
	FETCH_CATEGORY_FAILURE,
	FETCH_CATEGORY_SUCCESS
} from "../actions/categoriesActions";

const initialState = {
	categories: [],
	categoriesError: null,
	category: null,
	categoryError: null
};

const categoriesReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_CATEGORIES_SUCCESS:
			return {...state, categories: action.categories};
		case FETCH_CATEGORIES_FAILURE:
			return {...state, categoriesError: action.error};
		case FETCH_CATEGORY_SUCCESS:
			return {...state, category: action.category};
		case FETCH_CATEGORY_FAILURE:
			return {...state, categoryError: action.error};
		default:
			return state;
	}
};

export default categoriesReducer;