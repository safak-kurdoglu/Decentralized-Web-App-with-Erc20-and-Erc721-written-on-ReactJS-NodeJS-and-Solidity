import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import leftIcon from "../icons/left.png";
import rightIcon from "../icons/right.png";

const NFTShow = () => {
  const NFTs = useSelector((state) => state.NFTsToShow);
  const [index, setIndex] = useState(0);
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [image, SetImage] = useState("");
  const [power, setPower] = useState(0);

  useEffect(() => {
    if(NFTs.NFTs && NFTs.NFTs.length){
      setId(NFTs.NFTs[index].NFTid);
      setName(NFTs.NFTs[index].name);
      SetImage(NFTs.NFTs[index].image);
      setPower(NFTs.NFTs[index].power);
    }

  }, [index, NFTs]);

  const handleLeft = e => {
    if(index > 0)
      setIndex(index-1);
    return;
  };

  const handleRight = e => {
    if(index < NFTs.NFTs.length-1)
      setIndex(index+1);
    return;
  };

  const closeNFTShow = e => {
    document.getElementsByClassName("show-NFTs")[0].style.display = "none";
    return;
  };

  return (
    <div className="NFT-show-container "><span className="exit-NFT-show link" onClick={closeNFTShow}>X</span>
      <div className="NFT-show-left">
        <img src={leftIcon} alt="Logo"  className=" NFT-show-left-icon" onClick={handleLeft}/> 
      </div>
      <div className="ui card NFT-show-NFT">
        <div className="NFT-show-image-cont">
          <img src={process.env.PUBLIC_URL +"/"+ image} alt="Logo"  className="NFT-show-image"/>
        </div>
        <div className="content">
          <div className="header"></div>
          <div>ID: <span className="NFT-show-id">{id}</span> </div>
          <div>Name: <span className="NFT-show-id">{name}</span> </div>
          <div>Power: <span className="NFT-show-id">{power}</span> </div>
        </div>
      </div>
      <div className="NFT-show-right">
        <img src={rightIcon} alt="Logo"  className=" NFT-show-right-icon" onClick={handleRight}/> 
      </div>
    </div>
  );
}

export default NFTShow;
