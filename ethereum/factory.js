import web3 from './web3';
import CityHall from './build/CityHall.json';

const instance = new web3.eth.Contract(
  JSON.parse(CityHall.interface),
  //'0x8e46aee456cc99f44269b334fcc432e8e77a996e'
  '0xA6C84826065Cd9FD77AFfA7df79Ff2861DA1b4AF'
);

export default instance;
