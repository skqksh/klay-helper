import caver from './caver';
import { DEPLOYED_ABI, DEPLOYED_ADDRESS } from './hibsContractDev';

const contract = (() => DEPLOYED_ABI
&& DEPLOYED_ADDRESS
&& new caver.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS))();

const klay = (() => caver.klay)();

const helpers = (() => caver.helpers)();

const formatters = (() => caver.formatters)();

const utils = (() => caver.utils)();

const testInstance = (() => {
  const test = caver;
  console.log(test);
  return caver.utils;
})();

console.log(testInstance);

const GetWallet = (privateKey) => caver.klay.accounts.privateKeyToAccount(privateKey);

export {
  contract, klay, utils, helpers, formatters, GetWallet,
};
