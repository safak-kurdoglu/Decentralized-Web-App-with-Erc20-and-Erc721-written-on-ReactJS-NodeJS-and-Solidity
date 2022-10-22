
import React from "react";
import useEth from "../../contexts/EthContext2/useEth";
import axios from "axios";

function ContractBtns({ tokenId }) {
  const { state: { contract, accounts } } = useEth();

  const cancelSale = async e => {
    try{
      await contract.methods.cancelSale( tokenId ).send({ from: accounts[0]});
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
      <button onClick={cancelSale} className="btn btn-transfer">
        Cancel Sale
      </button>
    </div>
  );
}

export default ContractBtns;
