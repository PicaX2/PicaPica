const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CityHall.json')
const provider = new HDWalletProvider(
  'tuition wish shoulder reform report setup helmet evolve smooth language ahead fame',
  'https://rinkeby.infura.io/v3/363a347350484259bb319aeefaedb0e5'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account ', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
  .deploy({ data: compiledFactory.bytecode })
  .send({ gas: '4612388', from: accounts[0] });

  console.log('Contract deployed to: ', result.options.address);
};
deploy();
