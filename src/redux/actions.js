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
export const SET_CART = 'SET_CART'
export const EMPTY_CART = 'EMPTY_CART';

const emptyUser = {
    username: '',
    userId: '',
    walletAddress: '',
    isLoggedIn: false,
}
const anEmptyCart = []

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
    localStorage.removeItem('lastActive')
    localStorage.removeItem('account')
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
    try {
        var tempNfts = []
        var tempObj = {}
        tempObj.nft_id = item._id.$oid
        tempObj.media = item.is_freezed ? item.media : item.nft_image_path
        tempObj.title = item.title
        tempObj.description = item.description
        tempObj.copies = item.copies ? item.copies : 0
        tempObj.price = item.price
        // tempObj.token_index = item.nft_index
        tempObj.quantity = 1

        tempNfts.push(tempObj)
        console.log(tempNfts)

        return async dispatch => {
            if (localStorage.getItem('basket_id')) {
                console.log('tu if dige ?')
                const response = await axios.post(`${API_CONFIG.MARKET_API_URL}/basket/add/`, { nft_info: tempNfts, basket_id: localStorage.getItem('basket_id') })
                console.log('responseeeeeee add to cart', response)
                if (response.status >= 200 && response.status < 300) {
                    dispatch({
                        type: ADD_TO_CART,
                        payload: tempObj
                    });
                }
            } else {
                console.log('yani tu in else ????')
                const reg = await axios.post(`${API_CONFIG.MARKET_API_URL}/basket/register/`, {
                    buyer_info: {
                        wallet_address: "",
                        username: "",
                        buyer_id: localStorage.getItem('device-id')
                    }
                })
                console.log('responseeeeeee register', reg)
                if (reg.status >= 200 && reg.status) {
                    localStorage.setItem('basket_id', reg.data.data._id.$oid)
                    const response = await axios.post(`${API_CONFIG.MARKET_API_URL}/basket/add/`, { nft_info: tempNfts, basket_id: localStorage.getItem('basket_id') })
                    console.log('responseeeeeee add to cart', response)
                    if (response.status >= 200 && response.status < 300) {
                        dispatch({
                            type: ADD_TO_CART,
                            payload: tempObj
                        });
                    }
                }

            }
        };
    } catch (error) {
        // Add custom logic to handle errors
        console.log(error);
    }

    // return dispatch => {
    //     dispatch({
    //         type: ADD_TO_CART,
    //         payload: item
    //     });
    // };

}
export const incrementQuantity = (item) => {
    var tempObj = {}
    tempObj.nft_id = item.nft_id
    tempObj.media = item.is_freezed ? item.media : item.nft_image_path
    tempObj.title = item.title
    tempObj.description = item.description
    tempObj.copies = item.copies ? item.copies : 0
    tempObj.price = item.price
    tempObj.quantity = item.quantity

    try {
        return async dispatch => {
            const response = await axios.post(`${API_CONFIG.MARKET_API_URL}/basket/add-q/`, { nft_id: tempObj.nft_id, basket_id: localStorage.getItem('basket_id') })
            console.log('responseeeeeee quan to cart', response)
            if (response.status >= 200 && response.status < 300) {
                dispatch({
                    type: INCREMENT_QUANTITY,
                    payload: tempObj
                });
            } else {
            }
        };
    } catch (error) {
        // Add custom logic to handle errors
        console.log(error);
    }

    // return dispatch => {
    //     dispatch({
    //         type: INCREMENT_QUANTITY,
    //         payload: tempObj
    //     });
    // };

}
export const decrementQuantity = (item) => {
    var tempObj = {}
    tempObj.nft_id = item.nft_id
    tempObj.media = item.is_freezed ? item.media : item.nft_image_path
    tempObj.title = item.title
    tempObj.description = item.description
    tempObj.copies = item.copies ? item.copies : 0
    tempObj.quantity = item.quantity
    tempObj.price = item.price
    try {
        return async dispatch => {
            const response = await axios.post(`${API_CONFIG.MARKET_API_URL}/basket/remove-q/`, { nft_id: tempObj.nft_id, basket_id: localStorage.getItem('basket_id') })
            console.log('responseeeeeee quan to cart', response)
            if (response.status >= 200 && response.status < 300) {
                dispatch({
                    type: DECREMENT_QUANTITY,
                    payload: tempObj
                });
            } else {
            }
        };
    } catch (error) {
        // Add custom logic to handle errors
        console.log(error);
    }

    // return dispatch => {
    //     dispatch({
    //         type: DECREMENT_QUANTITY,
    //         payload: tempObj
    //     });
    // };

}
export const removeItem = (item) => {
    var tempObj = {}
    tempObj.nft_id = item.nft_id
    tempObj.media = item.is_freezed ? item.media : item.nft_image_path
    tempObj.title = item.title
    tempObj.description = item.description
    tempObj.copies = item.copies ? item.copies : 0
    tempObj.quantity = item.quantity
    tempObj.price = item.price
    try {
        return async dispatch => {
            const response = await axios.post(`${API_CONFIG.MARKET_API_URL}/basket/remove/`, { nft_info: tempObj, basket_id: localStorage.getItem('basket_id') })
            console.log('responseeeeeee remove to cart', response)
            if (response.status >= 200 && response.status < 300) {
                dispatch({
                    type: REMOVE_FROM_CART,
                    payload: tempObj
                });
            } else {
            }
        };
    } catch (error) {
        // Add custom logic to handle errors
        console.log(error);
    }

    // return dispatch => {
    //     dispatch({
    //         type: REMOVE_FROM_CART,
    //         payload: tempObj
    //     });
    // };

}
export const emptyCart = () => {
    try {
        return async dispatch => {
            const response = await axios.post(`${API_CONFIG.MARKET_API_URL}/basket/remove-all/`, { basket_id: localStorage.getItem('basket_id') })
            console.log('responseeeeeee remove cart', response)
            if (response.status >= 200 && response.status < 300) {
                localStorage.removeItem('basket_id')
                dispatch({
                    type: EMPTY_CART,
                    payload: anEmptyCart
                });
            } else {
            }
        };
    } catch (error) {
        // Add custom logic to handle errors
        console.log(error);
    }

    // return dispatch => {
    //     dispatch({
    //         type: EMPTY_CART,
    //         payload: anEmptyCart
    //     });
    // };

}
export const setCart = (cart) => {
    return dispatch => {
        dispatch({
            type: SET_CART,
            payload: cart
        });
    };
}
