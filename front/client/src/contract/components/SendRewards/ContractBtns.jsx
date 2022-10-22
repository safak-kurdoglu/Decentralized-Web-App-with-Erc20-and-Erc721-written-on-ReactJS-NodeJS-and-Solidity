
import React, {useEffect, useState } from "react";
import useEth from "../../contexts/EthContext2/useEth";
import axios from "axios";

function ContractBtns() {
  const { state: { contract, accounts } } = useEth();
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchNFTs = async () => {
      const isOwner = await contract.methods.isOwner().call({ from: accounts[0] });
      setIsOwner(isOwner)
    }

    if(accounts && contract)
      fetchNFTs();
  }, [accounts, contract]);

  const send = e => {
    try{
      axios.get("http://localhost:3000/front/get-waiting-rewards-to-send")
      .then((resp) => {
        if(!resp.data.status){
          alert(resp.data.message);
          console.log(resp.data.error);
        }
        else{
          if(resp.data.NFTsWaitingToSend){
            const datas = resp.data.NFTsWaitingToSend;
            contract.methods.sendNFTsToWinner( datas.NFTidF, datas.NFTidS, datas.ownerToSend ).send({ from: accounts[0]});
          }
          else
            alert(resp.data.message);
        }
      });

    }catch(error){
      alert(error.message);
    }
    return;
  };

  const RewardButton = isOwner ? <button onClick={send} className="btn btn-send-NFT-rewards"> Send Rewards</button> : <></>
  return (
    <div className="btns send-NFT-rewards">
      {RewardButton}
     </div>
  );
}

export default ContractBtns;
