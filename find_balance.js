const testFolder = './chains/_data/chains/';
const fs = require('fs');
require('dotenv').config()
const ethers = require('ethers');

fs.readdir(testFolder, (err, files) => {
  files.forEach(async file => {
    let rawdata = fs.readFileSync(testFolder+file);
    let chain = JSON.parse(rawdata);
    let rpc = chain.rpc[0]
    if (chain.rpc[0]){
      if (rpc.search(/INFURA_API_KEY/g) > 0){
        rpc = rpc.replace("${INFURA_API_KEY}", process.env.INFURA_API_KEY)
      }      
    }
    let provider = new ethers.providers.JsonRpcProvider(rpc);
    provider.getBalance(process.env.WALLET)
    .then(resp => {
      let balance = ethers.utils.formatEther(resp)
      if (balance > 0) console.log(chain.name+": "+balance)
    })
    .catch(err => {
      if(err) {/*console.log(err)*/}
    })
  });
});
