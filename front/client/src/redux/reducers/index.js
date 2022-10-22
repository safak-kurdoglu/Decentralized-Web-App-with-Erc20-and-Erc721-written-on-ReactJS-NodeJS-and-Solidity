import { combineReducers } from "redux";
import { NFTsReducer, selectedNFTsReducer, NFTsToShowReducer } from "./NFTsReducer";
const reducers = combineReducers({
  allNFTs: NFTsReducer,
  NFT: selectedNFTsReducer,
  NFTsToShow: NFTsToShowReducer
});
export default reducers;
