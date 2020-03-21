import axiosApi from "../../axiosApi";

export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

export const fetchCategoriesSuccess = categories => ({type: FETCH_CATEGORIES_SUCCESS, categories});
export const fetchCategoriesFailure = error => ({type: FETCH_CATEGORIES_FAILURE, error});

export const fetchCategories = () => {
	return async dispatch => {
		try {
			const response = await axiosApi.get('/categories');

			dispatch(fetchCategoriesSuccess(response.data));
		} catch (error) {
			dispatch(fetchCategoriesFailure(error));
		}
	}
};