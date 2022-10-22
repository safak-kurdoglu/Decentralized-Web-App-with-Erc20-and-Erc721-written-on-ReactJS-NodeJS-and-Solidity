import React, { useEffect } from "react";
import ContractTake from "../contract/components/TakeNFT";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setNFTs } from "../redux/actions/NFTsActions";

const ShilaCoin = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchNFTs =  () => {
      axios.get("http://localhost:3000/front/get-NFTs-on-sale")
      .then((resp) => {
        if(!resp.data.status)
          console.log(resp.data.error);
        else
          dispatch(setNFTs(resp.data.NFTsOnSale));
      });
    }

    fetchNFTs();
  }, []);

  return  (
    <div className="four wide column">
      <h2>NFT Sale</h2>
      <ContractTake/>
    </div>
  )
};

export default ShilaCoin;
