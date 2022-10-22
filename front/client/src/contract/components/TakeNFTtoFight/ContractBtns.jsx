import { useState } from "react";
import useEth from "../../contexts/EthContext2/useEth";
import axios from "axios";

function ContractBtns() {
  const { state: { contract, accounts } } = useEth();
  const [tokenId, setTokenId] = useState("");

  const handleId = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setTokenId(e.target.value);
    }
  };

  const fight = async e => {
    if (tokenId === "") {
      alert("Please enter the NFT Id to send.");
      return;
    }

    try{
      const NFTid = parseInt(tokenId);
      await contract.methods.takeNFT( NFTid ).send({ from: accounts[0], value:100000000000000000});
      axios.post("http://localhost:3000/front/put-NFT-to-fight",{
        NFTId: tokenId,
        owner: accounts[0].toLowerCase()
      })
      .then((resp) => {
        if(!resp.data.status){
          alert(resp.data.message);
          console.log(resp.data.error);
        }else{

        }
      });
    }
    catch(error){
      alert(error.message);
    }
    return;
  };

  return (
    <div className="btns btns-main-NFT">
      
      <input className="input input-send input-address"
        type="text"
        placeholder="TokenId"
        value={tokenId}
        onChange={handleId}
      /> &nbsp; &nbsp;

      <button onClick={fight} className="btn btn-fight">
        Fight Your NFT 
      </button>

    </div>
  );
}

export default ContractBtns;
