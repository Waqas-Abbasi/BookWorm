import actionTypes from './actionTypes';

export const addBook = book => ({
	type: actionTypes.ADD_BOOK,
	payload: book
});

export const deleteBook = book => {
	return {
		type: actionTypes.DELETE_BOOK,
			payload: book
	}
};

export const addSession = session => ({
	type:actionTypes.ADD_SESSION,
	payload: session,
});
