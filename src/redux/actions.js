export const GET_USER = 'GET_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const WALLET_CONNECTION = 'WALLET_CONNECTION';
export const SET_MARKET_CONTRACT = 'SET_MARKET_CONTRACT';
export const SET_NFT_CONTRACT = 'SET_NFT_CONTRACT';
export const SET_PROPOSAL_CONTRACT = 'SET_PROPOSAL_CONTRACT';
export const SET_EVENT_CONTRACT = 'SET_EVENT_CONTRACT';
export const SET_ACCOUNT = 'SET_ACCOUNT';

const emptyUser = {
    userId: '',
    userWallet: '',
    isLoggedIn: false,
}
export const getuser = (walletAddress) => {
}