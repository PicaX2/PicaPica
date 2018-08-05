import web3 from '../ethereum/web3';
import Marriage from '../ethereum/build/Marriage.json';

export default address => {
  return new web3.eth.Contract(JSON.parse(Marriage.interface), address);
};