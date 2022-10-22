import useEth from "../contract/contexts/EthContext1/useEth";
import React, { useEffect } from "react";
import axios from "axios";

function ShilaPoint() {
  const { state: { accounts } } = useEth();

  useEffect( () => {
    if(accounts !== null){
      axios.post("http://localhost:3000/front/get-shila-point",{
        address: accounts[0].toLowerCase()
      })
      .then((resp) => {
        if(resp.data.status)
          document.getElementsByClassName("point")[0].innerHTML = resp.data.amount;
        else{
          console.log(resp.data.error)
          alert(resp.data.message )
        }
        return;
      });
    }
  }
  , [accounts]);

  return    <></> ;
};
  
export default ShilaPoint;
  