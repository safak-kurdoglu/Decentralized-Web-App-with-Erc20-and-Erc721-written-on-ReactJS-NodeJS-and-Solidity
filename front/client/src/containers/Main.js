import React, { useEffect } from "react";
import { EthProvider1 } from "../contract/contexts/EthContext1";
import { EthProvider2 } from "../contract/contexts/EthContext2";
import HeaderMain from "./HeaderMain";
import ShilaCoin from "./ShilaCoin";
import ShilaNFT from "./ShilaNFT";  
import FightNFT from "./FightNFT";  
import ShilaNFTSale from "./ShilaNFTSale";  
import NFTSaleComponent from "./NFTSaleComponent";

const Main = () => {

  useEffect(() => {
    document.getElementById("game-container").style.display = "none";
  }, []);

  return (
    <div>
      <div className="ui container main-container">
      <HeaderMain/>
        <div className="main-div main-coin">
          <EthProvider1>
            <ShilaCoin/>
          </EthProvider1>
        </div>
        <EthProvider2>
          <div className="main-div main-NFT">
            <ShilaNFT/>
          </div>
          <div className="fight-container">
            <FightNFT/>
          </div>
          <div className="sale-container">
            <ShilaNFTSale/> 
            <NFTSaleComponent />
          </div>
        </EthProvider2>
      </div>
    </div>
  );
};

export default Main;
