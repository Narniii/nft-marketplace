import { ADD_TO_CART, DECREMENT_QUANTITY, INCREMENT_QUANTITY, REMOVE_FROM_CART, EMPTY_CART } from "./actions";
// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// const cartSlice = createSlice({
//     name: 'cart',
//     initialState: {
//         cart: [],
//     },
//     reducers: {
//         addToCart: (state, action) => {
//             console.log(state.cart)
//             const itemInCart = state.cart.find((item) => item.id === action.payload.id);
//             if (itemInCart) {
//                 itemInCart.quantity++;
//             } else {
//                 state.cart.push({ ...action.payload, quantity: 1 });
//             }
//         },
//         incrementQuantity: (state, action) => {
//             const item = state.cart.find((item) => item.id === action.payload);
//             item.quantity++;
//         },
//         decrementQuantity: (state, action) => {
//             const item = state.cart.find((item) => item.id === action.payload);
//             if (item.quantity === 1) {
//                 item.quantity = 1
//             } else {
//                 item.quantity--;
//             }
//         },
//         removeItem: (state, action) => {
//             const removeItem = state.cart.filter((item) => item.id !== action.payload);
//             state.cart = removeItem;
//         },
//     },
// });

// export const cartReducer = cartSlice.reducer;
// export const {
//     addToCart,
//     incrementQuantity,
//     decrementQuantity,
//     removeItem,
// } = cartSlice.actions;






const initialState = {
    products: [],
};

function cartReducer(state = initialState, action) {
    var cart = state.products
    switch (action.type) {
        case ADD_TO_CART:
            console.log(state)
            // state = {
            //     products: [],
            // };
            // cart = state.products
            var itemInCart = cart.find((item) => item.id === action.payload.id);
            if (itemInCart) {
                var index = cart.indexOf(itemInCart)
                // console.log(index, cart[index])
                // cart[index].quantity++;
                itemInCart.quantity++;
            } else {
                cart.push({ ...action.payload, quantity: 1 });
                // cart.push({ id: action.payload.id, quantity: 1 });
            }
            // return state;
            return {
                ...state,
                products: cart
            };

        case REMOVE_FROM_CART:
            // cart = state.products
            // const index = cart.indexOf(action.payload);
            // if (index > -1) { // only splice array when item is found
            //     cart.splice(index, 1); // 2nd parameter means remove one item only
            // }
            const removeItem = cart.filter((item) => item.id !== action.payload.id);
            cart = removeItem;
            console.log(state)
            return {
                ...state,
                products: cart
            };
        // return {
        //     ...state,
        //     products: state.products.map(product =>
        //         product.id === action.payload.id
        //             ? { ...product, selected: false, quantity: 1 }
        //             : product,
        //     ),
        // };
        case INCREMENT_QUANTITY:
            // cart = state.products
            const ItemI = cart.find((item) => item.id === action.payload.id);
            ItemI.quantity++;
            // return state;
            return {
                ...state,
                products: cart
            };
        // return {
        //     ...state,
        //     products: state.products.map(product =>
        //         product.id === action.payload.id
        //             ? { ...product, quantity: product.quantity + 1 }
        //             : product,
        //     ),
        // };

        case DECREMENT_QUANTITY:
            // cart = state.products
            const item = cart.find((item) => item.id === action.payload.id);
            if (item.quantity === 1) {
                item.quantity = 1
            } else {
                item.quantity--;
            }
            // return state;

            return {
                ...state,
                products: cart
            };

        // return {
        //     ...state,
        //     products: state.products.map(product =>
        //         product.id === action.payload.id
        //             ? {
        //                 ...product,
        //                 quantity: product.quantity !== 1 ? product.quantity - 1 : 1,
        //             }
        //             : product,
        //     ),
        // };
        case EMPTY_CART:
            cart = []
            return {
                ...state,
                products: cart
            };
        // return {
        //     ...state,
        //     products: state.products.map(product =>
        //         product.selected
        //             ? { ...product, selected: false, quantity: 1 }
        //             : product,
        //     ),
        // };

        default:
            return state;
    }
}

export default cartReducer;
