import caver from './caver';
import { DEPLOYED_ABI, DEPLOYED_ADDRESS } from './hibsContractDev';

const ContractInstance = (() => {
  const contract = DEPLOYED_ABI
      && DEPLOYED_ADDRESS
      && new caver.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS);
  return contract;
})();

const KlayInstance = (() => caver.klay)();

const UtilsInstance = (() => caver.utils)();

const GetWalletInstance = (privateKey) => caver.klay.accounts.privateKeyToAccount(privateKey);

export {
  ContractInstance, KlayInstance, UtilsInstance, GetWalletInstance,
};
