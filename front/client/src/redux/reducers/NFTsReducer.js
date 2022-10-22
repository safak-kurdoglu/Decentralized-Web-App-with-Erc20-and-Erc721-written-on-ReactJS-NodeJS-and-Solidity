import { ActionTypes } from "../constants/action-types";
const intialState = {
  NFTs: [],
};

export const NFTsReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_NFTS:
      return { ...state, NFTs: payload };
    default:
      return state;
  }
};

export const selectedNFTsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SELECTED_NFT:
      return { ...state, ...payload };
    case ActionTypes.REMOVE_SELECTED_NFT:
      return {};
    default:
      return state;
  }
};


export const NFTsToShowReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_NFTS_TO_SHOW:
      return { ...state, NFTs: payload };
    default:
      return state;
  }
};
