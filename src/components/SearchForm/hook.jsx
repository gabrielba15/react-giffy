import { useReducer } from 'react';

const ACTIONS = {
	CHANGE_KEYWORD: 'change_keyword',
	CHANGE_RATING: 'change_rating',
};

const ACTIONS_REDUCERS = {
	[ACTIONS.CHANGE_KEYWORD]: (state, action) => ({
		...state,
		times: state.times + 1,
		keyword: action.payload,
	}),
	[ACTIONS.CHANGE_RATING]: (state, action) => ({
		...state,
		rating: action.payload,
	}),
};

const reducer = (state, action) => {
	const actionReducer = ACTIONS_REDUCERS[action.type];
	return actionReducer ? actionReducer(state, action) : state;
};

export default function useForm({
	initialKeyword = '',
	initialRating = 'g',
} = {}) {
	const initialState = {
		keyword: decodeURIComponent(initialKeyword),
		rating: initialRating,
		times: 0,
	};
	const [state, dispatch] = useReducer(reducer, initialState);
	const { keyword, rating, times } = state;

	return {
		changeKeyword: ({ keyword }) =>
			 dispatch({ type: ACTIONS.CHANGE_KEYWORD, payload: keyword }),
		changeRating: ({ rating }) =>
			dispatch({ type: ACTIONS.CHANGE_RATING, payload: rating }),
		keyword,
		rating,
		times,
	};
}
