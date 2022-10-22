import { ActionTypes } from "../constants/action-types";

export const setNFTs = (NFTs) => {
  return {
    type: ActionTypes.SET_NFTS,
    payload: NFTs,
  };
};


export const setNFTsToShow = (NFTs) => {
  return {
    type: ActionTypes.SET_NFTS_TO_SHOW,
    payload: NFTs,
  };
};


export const selectedNFT = (NFT) => {
  return {
    type: ActionTypes.SELECTED_NFT,
    payload: NFT,
  };
};


export const removeSelectedNFT = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_NFT,
  };
};
