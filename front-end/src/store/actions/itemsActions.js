import {push} from 'connected-react-router';

import axiosApi from "../../axiosApi";

export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS';
export const FETCH_ITEMS_FAILURE = 'FETCH_ITEMS_FAILURE';

export const CREATE_ITEM_SUCCESS = 'CREATE_ITEM_SUCCESS';
export const CREATE_ITEM_FAILURE = 'CREATE_ITEM_FAILURE';

export const FETCH_ITEM_SUCCESS = 'FETCH_ITEM_SUCCESS';
export const FETCH_ITEM_FAILURE = 'FETCH_ITEM_FAILURE';

export const fetchItemsSuccess = items => ({type: FETCH_ITEMS_SUCCESS, items});
export const fetchItemsFailure = error => ({type: FETCH_ITEMS_FAILURE, error});

export const createItemSuccess = () => ({type: CREATE_ITEM_SUCCESS});
export const createItemFailure = error => ({type: CREATE_ITEM_FAILURE, error});

export const fetchItemSuccess = item => ({type: FETCH_ITEM_SUCCESS, item});
export const fetchItemFailure = error => ({type: FETCH_ITEM_FAILURE, error});

export const fetchItems = () => {
	return async (dispatch) => {
		try {
			const response = await axiosApi.get('/items');
			dispatch(fetchItemsSuccess(response.data));
		} catch (error) {
			dispatch(fetchItemsFailure(error));
		}
	}
};

export const createItem = itemData => {
	return async (dispatch, getState) => {
		try {
			const user = getState().users.user;
			await axiosApi.post('/items', itemData, {headers: {'Authorization': 'Token ' + user.token}});
			dispatch(createItemSuccess());
			dispatch(push('/'));
		} catch (error) {
			dispatch(createItemFailure(error.response.data));
		}
	}
};

export const fetchItem = id => {
	return async (dispatch) => {
		try {
			const response = await axiosApi.get('/items/' + id);
			dispatch(fetchItemSuccess(response.data));
		} catch (error) {
			dispatch(fetchItemFailure(error));
		}
	}
};