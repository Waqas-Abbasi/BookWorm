import actionTypes from '../actions/actionTypes';

const defaultUser = {
    username: '',
    email: '',
    loggedIN: false,
};

const userReducer = (state = defaultUser, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_IN_PROGRESS:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                loginSuccess: true,
                error: null,
            };
        case actionTypes.LOGIN_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: false,
                loginSuccess: false,
            };
        case actionTypes.REGISTER_IN_PROGRESS:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case actionTypes.REGISTER_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: false,
                registerSuccess: false,
            };
        case actionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                registerSuccess: true,
                error: null,
            };

    }
    return state;
};

export default userReducer;
