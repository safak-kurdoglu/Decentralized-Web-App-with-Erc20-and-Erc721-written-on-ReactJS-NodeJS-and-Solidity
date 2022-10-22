import React, { useEffect, useState } from "react";
import axios from "axios";
import useEth from "../contract/contexts/EthContext2/useEth";
import TakeNFTtoFight from "../contract/components/TakeNFTtoFight";  

const FightNFT = () => {
  const { state: { accounts } } = useEth();
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [image, SetImage] = useState("");
  const [power, setPower] = useState(0);
 
  useEffect(() => {
    const fetchWaitingNFT = async () => {
      axios.post("http://localhost:3000/front/get-waiting-NFT",{
        owner: accounts[0].toLowerCase()
      })
      .then((resp) => {
        if(!resp.data.status)
          console.log(resp.data.error)
        else{
          if(resp.data.NFTWaitingOpponent){
            document.getElementsByClassName("NFT-fight-waiting-NFT")[0].style.display = "flex";
            setId(resp.data.NFTWaitingOpponent.NFTid);
            setName(resp.data.NFTWaitingOpponent.name);
            SetImage(resp.data.NFTWaitingOpponent.image);
            setPower(resp.data.NFTWaitingOpponent.power);
          }
          else{
            document.getElementsByClassName("NFT-fight-waiting-NFT")[0].style.display = "none";
            setId(0);
            setName("");
            SetImage("");
            setPower(0);
          }
        }      
      });
    }

    const fetchWaitingRewards = async () => {
      axios.post("http://localhost:3000/front/get-waiting-rewards",{
        owner: accounts[0].toLowerCase()
      })
      .then((resp) => {
        if(resp.data.status)
          document.getElementsByClassName("waiting-rewards")[0].innerHTML = resp.data.message;
        else{
          console.log(resp.data.error);
          alert(resp.data.message);
        }
      });
    }

    if(accounts){
      fetchWaitingNFT();
      fetchWaitingRewards();
    }
  }, [accounts]);

  return  (
    <div className="NFT-fight">
      <div className="fight-container-left fight-container-buttons">
        <TakeNFTtoFight/><br/>
        <div className="waiting-rewards">
        </div>
      </div>
      <div className="fight-container-right">
        <div className="NFT-fight-waiting-NFT ui card" style={{display: "none" }}>
          <p>Your NFT is waiting opponent!</p> 
          <div className="NFT-fight-image-cont">
            <img src={process.env.PUBLIC_URL +"/"+ image} alt="Logo"  className="NFT-fight-image"/>
          </div>
          <div className="content">
            <div className="header"></div>
            <div>ID: <span className="NFT-show-id">{id}</span> </div>
            <div>Name: <span className="NFT-show-id">{name}</span> </div>
            <div>Power: <span className="NFT-show-id">{power}</span> </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FightNFT;
