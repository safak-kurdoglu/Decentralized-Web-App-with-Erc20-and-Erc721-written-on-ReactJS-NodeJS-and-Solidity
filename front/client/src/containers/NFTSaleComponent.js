import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import BuyNFT from  "../contract/components/BuyNFT";
import useEth from "../contract/contexts/EthContext2/useEth";
import ContractCancelSale from  "../contract/components/CancelSale";

const NFTSaleComponent =  () => {
  const { state: { contract, accounts } } = useEth();
  const [tokenIds, setTokenIds] = useState([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      const tokenIds = await contract.methods.showSaleNFTs().call({ from: accounts[0] });
      setTokenIds(tokenIds)
    }
    if(accounts && contract)
      fetchNFTs();

  }, [accounts, contract]);

  const NFTs = useSelector((state) => state.allNFTs.NFTs);
  const renderList = NFTs.map((NFT) => {
    const { NFTid, name, image, power, price } = NFT;
    const ContractCancel = tokenIds.includes(NFTid.toString()) ? <ContractCancelSale tokenId={NFTid}/> :  <></>;

    return (
      <div className="NFT-sale-card card" key={NFTid}>
        <Link to={`/NFT/${NFTid}`}>
          <div className="NFT-sale-image-cont">
            <img src={process.env.PUBLIC_URL +"/"+ image} alt="Logo"  className="NFT-sale-image"/>
          </div>      
        </Link>
        <div className="content NFT-sale-content">
          <div className="header"></div>
          <div>ID: <span className="NFT-show-id">{NFTid}</span> </div>
          <div>Name: <span className="NFT-show-name">{name}</span> </div>
          <div>Power: <span className="NFT-show-power">{power}</span> </div>
          <div>Price: <span className="NFT-show-price">{price}</span> </div>
        </div>
        <BuyNFT price={price} tokenId={NFTid}/>
        {ContractCancel}
      </div>
    );
  });

  return (  <div className="cards">
              {renderList}
            </div>  )
};

export default NFTSaleComponent;
