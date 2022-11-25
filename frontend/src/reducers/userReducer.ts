import { Reducer } from 'redux';

import {    IUserState,
            USER_LOGIN_REQUEST,
            USER_LOGIN_SUCCESS,
            USER_LOGIN_FAIL,
            USER_LOGOUT,
             } from '../constans/userConstans';

import { userLoginFailAction, userLoginRequestAction, userLoginSuccessAction, userLogoutAction } from '../actions/userActions';




const initialUserState: IUserState = { 
                loading: false,
                error: '',
                userInfo: {}
};

type IUserLoginAction = userLoginFailAction | userLoginRequestAction | userLoginSuccessAction | userLogoutAction;

export const userLoginReducer: Reducer<IUserState, IUserLoginAction> = (state = initialUserState, action) => {
    switch(action.type) {
            case USER_LOGIN_REQUEST:
                return {
                    ...state,
                    loading: true
                };

            case USER_LOGIN_SUCCESS:
                // console.log(action.payload)
                return {
                    ...state,
                    loading: false,
                    userInfo: action.payload,
                };

            case USER_LOGIN_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: action.error
                };
            
            case USER_LOGOUT:
                return {
                    ...state,
                    userInfo: {}
                };
                
            default:
                return state;
        }
}

