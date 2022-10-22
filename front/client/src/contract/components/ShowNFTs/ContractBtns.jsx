
import React, { useEffect }  from "react";
import useEth from "../../contexts/EthContext2/useEth";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setNFTsToShow } from "../../../redux/actions/NFTsActions";

function ContractBtns() {
  const { state: { contract, accounts } } = useEth();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchNFTs = () => {
      document.getElementsByClassName("show-NFTs")[0].style.display = "none";
      dispatch(setNFTsToShow([]));
    };

    fetchNFTs();
  }, [accounts]);

  const show = async e => {
    try{
      const NFTIds = await contract.methods.showNFTs().call({ from: accounts[0] });
      axios.post("http://localhost:3000/front/show-NFTs",{
        Ids: NFTIds
      })
      .then((resp) => {
        if(!resp.data.status){
          alert(resp.data.message)
          console.log(resp.data.error)   
        }
        else{
          if(resp.data.userNFTs.length){
            dispatch(setNFTsToShow(resp.data.userNFTs));
            document.getElementsByClassName("show-NFTs")[0].style.display = "block";

          }else
            alert("You don't have NFT.");
        }
      });

    }catch(error){
      alert(error.message);
    }
    return;
  };

  return (
    <div className="btns btns-main-NFT">
      <button onClick={show} className="btn btn-show">
        Show
      </button>
    </div>
  );
}

export default ContractBtns;
