import React from "react";


const Header = () => {

  const handleCoin = e => {
    document.getElementsByClassName("main-coin")[0].style.display = "block";
    document.getElementsByClassName("main-NFT")[0].style.display = "none";
  };

  const handleNFT = e => {
    document.getElementsByClassName("main-NFT")[0].style.display = "block";
    document.getElementsByClassName("main-coin")[0].style.display = "none";
  };


  return (
    <div className="menu">
      <div className="header-main">
      <button onClick={handleCoin} className="btn btn-main btn-coin">
        SHILA COIN 
      </button>
      <button onClick={handleNFT} className="btn btn-main btn-NFT">
        NFT
      </button>
      </div>
    </div>
  );
};

export default Header;
