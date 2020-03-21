import {
	CREATE_ITEM_FAILURE,
	FETCH_ITEM_FAILURE,
	FETCH_ITEM_SUCCESS,
	FETCH_ITEMS_FAILURE,
	FETCH_ITEMS_SUCCESS
} from "../actions/itemsActions";

const initialState = {
	items: [],
	itemsError: null,
	item: null,
	itemError: null,
	createItemError: null
};

const itemsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_ITEMS_SUCCESS:
			return {...state, items: action.items};
		case FETCH_ITEMS_FAILURE:
			return {...state, itemsError: action.error};
		case FETCH_ITEM_SUCCESS:
			return {...state, item: action.item};
		case FETCH_ITEM_FAILURE:
			return {...state, itemError: action.error};
		case CREATE_ITEM_FAILURE:
			return {...state, createItemError: action.error};
		default:
			return state;
	}
};

export default itemsReducer;