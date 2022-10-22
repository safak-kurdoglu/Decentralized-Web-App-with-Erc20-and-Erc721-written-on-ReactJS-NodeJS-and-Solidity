
import React from "react";
import useEth from "../../contexts/EthContext2/useEth";
import axios from "axios";

function ContractBtns({price, tokenId}) {
  const { state: { contract, accounts } } = useEth();

  const buy = async e => {
    try{
      await contract.methods.finishSale( tokenId ).send({ from: accounts[0], value: price});
      axios.post("http://localhost:3000/front/del-NFT-from-sale",{
        NFTId: tokenId
      })
      .then((resp) => {
        if(!resp.data.status){
          alert(resp.data.message);
          console.log(resp.data.error);
        }
      });
      
    }catch(error){
      alert(error.message);
    }
    return;
  };

  return (
    <div className="btns btn-buy-NFT">
      <button onClick={buy} className="btn btn-buy">
        Buy NFT 
      </button>

    </div>
  );
}

export default ContractBtns;
