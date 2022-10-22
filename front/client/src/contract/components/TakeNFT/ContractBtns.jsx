
import { useState } from "react";
import useEth from "../../contexts/EthContext2/useEth";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setNFTs } from "../../../redux/actions/NFTsActions";

function ContractBtns() {
  const { state: { contract, accounts } } = useEth();
  const [tokenId, setTokenId] = useState("");
  const [price, setPrice] = useState("");

  const dispatch = useDispatch();
  const fetchNFTs =  () => {
    axios.get("http://localhost:3000/front/get-NFTs-on-sale")
    .then((resp) => {
      if(!resp.data.status)
        console.log(resp.data.error);
      else
        dispatch(setNFTs(resp.data.NFTsOnSale));
    })
  };

  const handleId = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setTokenId(e.target.value);
    }
  };

  const handlePrice = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setPrice(e.target.value);
    }
  };

  const sell = async e => {
    if (tokenId === "") {
      alert("Please enter the NFT Id to sell.");
      return;
    }
    if (price === "") {
      alert("Please enter the NFT the price to sell.");
      return;
    }
    try{
      const NFTid = parseInt(tokenId);
      const NFTPrice = parseInt(price);
      await contract.methods.startSale( NFTid, NFTPrice ).send({ from: accounts[0]});
      axios.post("http://localhost:3000/front/put-NFT-to-sale",{
        NFTId: tokenId,
        price: NFTPrice

      })
      .then((resp) => {
        if(!resp.data.status){
          alert(resp.data.message);
          console.log(resp.data.error);
        }
        else
          fetchNFTs();
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

      <input className="input input-send input-address"
        type="text"
        placeholder="price"
        value={price}
        onChange={handlePrice}
      /> &nbsp; &nbsp;

      <button onClick={sell} className="btn btn-sell">
        Sell NFT
      </button>

    </div>
  );
}

export default ContractBtns;
