import actionTypes from './actionTypes';
import {registerUser as registerUserAPI, loginUser as loginUserAPI} from '../../api/UserAuthentication';
import NavigationService from '../../api/NavigationService';

export const registerUser = user => async dispatch => {
    dispatch({
        type: actionTypes.REGISTER_IN_PROGRESS
    });

    const response = await registerUserAPI(user);

    if(response.ok){
        dispatch({
            type: actionTypes.REGISTER_SUCCESS
        });
    }else{
        dispatch({
            type: actionTypes.REGISTER_FAILED,
            payload: "The email or password you entered is incorrect.",
        });
    }
};


export const loginUser = user => async dispatch => {
    dispatch({
        type: actionTypes.LOGIN_IN_PROGRESS
    });

    const response = await loginUserAPI(user);

    if(response.ok){
        dispatch({
            type: actionTypes.LOGIN_SUCCESS
        });
        NavigationService.navigate('Dashboard')
    }else{
        dispatch({
            type: actionTypes.LOGIN_FAILED,
            payload: "The email or password you entered is incorrect.",
        });
    }
};
