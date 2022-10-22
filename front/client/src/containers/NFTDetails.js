import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedNFT,
  removeSelectedNFT,
} from "../redux/actions/NFTsActions";

const NFTDetails = () => {
  const { NFTId } = useParams();
  let NFT = useSelector((state) => state.NFT);
  const { NFTid, name, image, power, price } = NFT;
  
  const dispatch = useDispatch();
  const fetchNFTDetail = async (id) => {
    axios.post("http://localhost:3000/front/get-NFT-on-sale",{
      NFTId: id
    })
      .then((resp) => {
        dispatch(selectedNFT(resp.data.NFTOnSale));
      });
  };

  useEffect(() => {
    if (NFTId && NFTId !== "") fetchNFTDetail(NFTId);
    return () => {
      dispatch(removeSelectedNFT());
    };
  }, [NFTId]);
  return (
    <div className="container ui">
      {Object.keys(NFT).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <div className="ui placeholder segment">
          <div className="ui two column stackable center aligned grid">
            <div className="ui vertical divider"></div>
            <div className="middle aligned row  NFT-details-cont">
              <div className="column lp">
                <img src={process.env.PUBLIC_URL +"/"+ image} alt="Logo"  className="NFT-details-image"/>
              </div>
              <div className="column rp">
                <div className="content NFT-details-content">
                  <div className="header"></div>
                  <div>ID: <span className="NFT-show-id">{NFTid}</span> </div>
                  <div>Name: <span className="NFT-show-name">{name}</span> </div>
                  <div>Power: <span className="NFT-show-power">{power}</span> </div>
                  <div>Price: <span className="NFT-show-price">{price}</span> </div>
                </div>      
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTDetails;