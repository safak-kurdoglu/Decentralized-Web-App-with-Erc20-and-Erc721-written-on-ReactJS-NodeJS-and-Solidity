import useEth from "../../contexts/EthContext1/useEth";
import React, { useEffect } from "react";

function ContractBtns() {
  const { state: { contract, accounts } } = useEth();

  useEffect(() => {
    const  getBalance = async () => {
      try{
        const balance = await contract.methods.getBalance().call({ from: accounts[0] });
        document.getElementsByClassName("balance")[0].innerHTML = balance;
  
      }catch(error){
        console.log(error.message);
      }
    }
    
    getBalance();
  }, [accounts]);
  return    <></>;
}

export default ContractBtns;