import { actions } from '../actions';

const initialState = {
	book: [],
	loading: false,
	error: null,
};

const bookReducer = (state, action) => {
	switch (action.type) {
		case actions.book.DATA_FETCHING: {
			return {
				...state,
				loading: true,
			};
		}

		case actions.book.DATA_FETCHED: {
			return {
				...state,
				loading: false,
				book: action.data,
			};
		}

		case actions.book.DATA_FETCH_ERROR: {
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

export { bookReducer, initialState };
