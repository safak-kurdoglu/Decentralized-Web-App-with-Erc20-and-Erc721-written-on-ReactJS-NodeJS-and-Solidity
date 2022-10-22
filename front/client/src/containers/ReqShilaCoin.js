import useEth from "../contract/contexts/EthContext1/useEth";
import axios from "axios";

const ReqShilaCoin = () => {
  const { state: { accounts } } = useEth();
  
  const req = async e => {
    axios.post("http://localhost:3000/front/request-shila-coin",{
      address: accounts[0].toLowerCase()
    })
    .then((resp) => {
      alert(resp.data.message);
      if(!resp.data.status)
        console.log(resp.data.error)
      return;
    })
  };

  return (
    <button  onClick={req} className="btn btn-request">
      Request ShilaCoin 
    </button>
  )
  
};
  
export default ReqShilaCoin;
  