import axios from "axios";
import { API_CONFIG } from "../config";

export const GET_USER = 'GET_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const WALLET_CONNECTION = 'WALLET_CONNECTION';
export const SET_MARKET_CONTRACT = 'SET_MARKET_CONTRACT';
export const SET_NFT_CONTRACT = 'SET_NFT_CONTRACT';
export const SET_PROPOSAL_CONTRACT = 'SET_PROPOSAL_CONTRACT';
export const SET_EVENT_CONTRACT = 'SET_EVENT_CONTRACT';
export const SET_ACCOUNT = 'SET_ACCOUNT';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREMENT_QUANTITY = 'INCREMENT_QUANTITY';
export const DECREMENT_QUANTITY = 'DECREMENT_QUANTITY';
export const EMPTY_CART = 'EMPTY_CART';

const emptyUser = {
    username: '',
    userId: '',
    walletAddress: '',
    isLoggedIn: false,
}
export const getuser = (walletAddress) => {
    const isLoggedIn = localStorage.getItem('lastActive')
    const hasAccount = localStorage.getItem('account')
    try {
        return async dispatch => {
            if (isLoggedIn && hasAccount) {
                const response = await axios.post(`${API_CONFIG.AUTH_API_URL}/user/login/`, { wallet_address: walletAddress })
                console.log('responseeeeeee', response)
                let userDetails = {}
                if (response.status >= 200 && response.status < 300) {
                    userDetails.username = response.data.data.username
                    userDetails.userId = response.data.data._id.$oid
                    userDetails.walletAddress = walletAddress
                    userDetails.isLoggedIn = true
                    dispatch({
                        type: GET_USER,
                        payload: userDetails
                    });
                } else {
                    dispatch({
                        type: GET_USER,
                        payload: emptyUser
                    });
                }
            }
            else {
                localStorage.removeItem('lastActive')
                dispatch({
                    type: GET_USER,
                    payload: emptyUser
                });
            }
        };
    } catch (error) {
        // Add custom logic to handle errors
        console.log(error);
    }
};
export const logOutUser = () => {
    return async dispatch => {
        dispatch({
            type: LOGOUT_USER,
            payload: emptyUser
        });
    }
}
export const setAccount = (acc) => {
    return dispatch => {
        dispatch({
            type: SET_ACCOUNT,
            payload: acc
        });
    };

}
export const addItem = (item) => {
    return dispatch => {
        dispatch({
            type: ADD_TO_CART,
            payload: item
        });
    };

}
export const removeItem = (item) => {
    return dispatch => {
        dispatch({
            type: REMOVE_FROM_CART,
            payload: item
        });
    };

}