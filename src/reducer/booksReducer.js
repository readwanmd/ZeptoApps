import { actions } from '../actions';

const initialState = {
	books: null,
	loading: false,
	error: null,
	cache: {},
};

const booksReducer = (state, action) => {
	switch (action.type) {
		case actions.books.DATA_FETCHING: {
			return {
				...state,
				loading: true,
			};
		}
		case actions.books.DATA_FETCHED: {
			return {
				...state,
				loading: false,
				books: action.data,
				cache: {
					...state.cache,
					[action.cacheKey]: action.data,
				},
			};
		}
		case actions.books.DATA_FETCH_ERROR: {
			return {
				...state,
				loading: false,
				error: action.error,
			};
		}
		default: {
			return state;
		}
	}
};

export { booksReducer, initialState };
