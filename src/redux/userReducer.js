import { GET_USER, SET_NFT_CONTRACT, SET_PROPOSAL_CONTRACT, SET_MARKET_CONTRACT, SET_EVENT_CONTRACT, WALLET_CONNECTION, LOGOUT_USER, SET_ACCOUNT, ADD_TO_CART, REMOVE_FROM_CART, INCREMENT_QUANTITY, DECREMENT_QUANTITY } from './actions';
const initialState = {
    username: '',
    userId: '',
    walletAddress: '',
    isLoggedIn: false,
    // cart: []
    // marketContract: undefined,
    // nftContract: undefined,
    // account: undefined
}

function userReducer(state = initialState, action) {

    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                username: action.payload.username,
                userId: action.payload.userId,
                walletAddress: action.payload.walletAddress,
                isLoggedIn: action.payload.isLoggedIn,
            };
        case LOGOUT_USER:
            localStorage.removeItem('account')
            localStorage.removeItem('lastActive')
            return {
                ...state,
                username: action.payload.username,
                userId: action.payload.userId,
                walletAddress: action.payload.walletAddress,
                isLoggedIn: false,
            };
        // case WALLET_CONNECTION:
        //     return { ...state, wallet: action.payload };
        // case SET_MARKET_CONTRACT:
        //     return { ...state, marketContract: action.payload };
        // case SET_NFT_CONTRACT:
        //     return { ...state, nftContract: action.payload };
        case SET_ACCOUNT:
            return { ...state, account: action.payload };
        // case ADD_TO_CART:
        //     console.log(state)
        //     const itemInCart = state.cart.find((item) => item.id === action.payload.id);
        //     if (itemInCart) {
        //         itemInCart.quantity++;
        //     } else {
        //         state.cart.push({ ...action.payload, quantity: 1 });
        //     }
        // case REMOVE_FROM_CART:
        //     // const index = state.cart.indexOf(action.payload);
        //     // if (index > -1) { // only splice array when item is found
        //     //     state.cart.splice(index, 1); // 2nd parameter means remove one item only
        //     // }
        //     const removeItem = state.cart.filter((item) => item.id !== action.payload);
        //     state.cart = removeItem;
        // case INCREMENT_QUANTITY:
        //     const ItemI = state.cart.find((item) => item.id === action.payload);
        //     ItemI.quantity++;
        // case DECREMENT_QUANTITY:
        //     const item = state.cart.find((item) => item.id === action.payload);
        //     if (item.quantity === 1) {
        //         item.quantity = 1
        //     } else {
        //         item.quantity--;
        //     }
        default:
            return state;
    }
}

export default userReducer;
