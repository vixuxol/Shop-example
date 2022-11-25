import {    IUserState,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
     } from '../constans/userConstans';

import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import axios from 'axios';



//фабрика для USER_LOGIN_REQUEST
export interface userLoginRequestAction {
    type: typeof USER_LOGIN_REQUEST;
}

const userLoginRequest: ActionCreator<userLoginRequestAction> = () => ({
        type: USER_LOGIN_REQUEST,
    }
)

//фабрика для USER_LOGIN_SUCCESS
export interface userLoginSuccessAction {
    type: typeof USER_LOGIN_SUCCESS;
    payload: object;
}

const userLoginSuccess: ActionCreator<userLoginSuccessAction> = (payload: object) => ({
        type: USER_LOGIN_SUCCESS,
        payload
    }
)

//фабрика для USER_LOGIN_FAIL
export interface userLoginFailAction {
    type: typeof USER_LOGIN_FAIL;
    error: string;
}

const userLoginFail: ActionCreator<userLoginFailAction> = (error: string) => ({
        type: USER_LOGIN_FAIL,
        error
    }
)


//фабрика для USER_LOGOUT
export interface userLogoutAction {
    type: typeof USER_LOGOUT;
}

const userLogout: ActionCreator<userLogoutAction> = () => ({
        type: USER_LOGOUT,
    }
)


export const login = (email: string, username: string, password: string): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch, getState) => {
    
    try {
        dispatch(userLoginRequest());
        const config = {
            headers: {
                'Content-type':'application/json'
            }
        }
        const { data } = await axios.post(
                    'api/users/login/',
                    {'username': username, 'password': password},
                    config);
        dispatch(userLoginSuccess(data));

        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch(error) {
        //@ts-ignore
        const error = error.response && error.response.data.detail ? error.response.data.detail : error.message;
        dispatch(userLoginFail(error))
    }
}
