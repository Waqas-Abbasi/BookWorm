import actionTypes from './actionTypes';
import {registerUser as registerUserAPI, loginUser as loginUserAPI} from '../../api/UserAuthorization';

export const registerUser = user => async dispatch => {
    dispatch({
        type: actionTypes.LOGIN_IN_PROGRESS
    });

    const result = await registerUserAPI(user);

    if(result.success){
        dispatch({
            type: actionTypes.LOGIN_SUCCESS
        });
    }else{
        dispatch({
            type: actionTypes.LOGIN_FAILED
        });
    }
};


export const loginUser = user => async dispatch => {
    dispatch({
        type: actionTypes.LOGIN_IN_PROGRESS
    });

    const result = await loginUserAPI(user);

    if(result){
        dispatch({
            type: actionTypes.LOGIN_SUCCESS
        });
    }else{
        dispatch({
            type: actionTypes.LOGIN_FAILED
        });
    }
};
