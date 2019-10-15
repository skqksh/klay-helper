import React, { Component } from 'react';
import _ from 'lodash';
import {
  ContractInstance, KlayInstance, UtilsInstance, GetWalletInstance,
} from '../../js/klayApiManager';

const privateKey = '0x8e234d0fb9aa5bc206a1bbfde9157ae3de2518941d42c161ac74a1d0d3894f8a';
const txHash = '0xc39240a87379f2910036422bc86ecab3c01ed55911b8412435e1c31f1d85e5fe';

export class HibsDemos extends Component {
  constructor() {
    super();
    this.state = {
      testResult: [],
    };
    const walletInstance = GetWalletInstance(privateKey);
    const { address } = walletInstance;
    this.address = address;
    this.klay = KlayInstance;
    this.utils = UtilsInstance;
    this.contractMethod = ContractInstance.methods;
  }

  componentDidMount() {
    this.TestAndSetResult();
  }

  TestAndSetResult = () => {
    const klayTestMethodList = [];
    klayTestMethodList.push({ name: 'getAccounts', param: [] });
    klayTestMethodList.push({ name: 'getBalance', param: ['address'], resExp: (res) => `${this.utils.fromWei(res, 'ether')}(-> utils.fromWei(res, 'ether'))` });
    klayTestMethodList.push({ name: 'getTransaction', param: ['txHash'], resExp: (res) => JSON.stringify(res, null, 6) });
    klayTestMethodList.push({ name: 'getTransactionBySenderTxHash', param: ['txHash'], resExp: (res) => JSON.stringify(res, null, 6) });
    klayTestMethodList.push({ name: 'getTransactionCount', param: ['address'] });
    klayTestMethodList.push({ name: 'getTransactionFromBlock', param: ['txHash'], resExp: (res) => JSON.stringify(res, null, 6) });
    klayTestMethodList.push({ name: 'getTransactionReceipt', param: ['txHash'], resExp: (res) => JSON.stringify(res, null, 6) });
    klayTestMethodList.push({ name: 'getTransactionBySenderTxHash', param: ['privateKey'] });
    klayTestMethodList.push({ name: 'newBlockFilter', param: [] });
    klayTestMethodList.push({ name: 'getBlockWithConsensusInfo', param: ['genesis'], resExp: (res) => JSON.stringify(res, null, 6) });

    _.forEach(klayTestMethodList, (test) => {
      const param = _.map(test.param, (val) => {
        switch (val) {
          case 'address': return this.address;
          case 'privateKey': return privateKey;
          case 'txHash': return txHash;
          default:
            return val;
        }
      });
      this.klay[test.name](...param)
        .then((res) => this.addTestResult(`klay.${test.name}(${test.param})`, test.resExp ? test.resExp(res) : res, false))
        .catch((error) => this.addTestResult(`klay.${test.name}(${test.param})`, error.toString(), true));
    });
  }

  addTestResult(title, result, isError) {
    const { testResult } = this.state;
    this.setState({
      testResult: testResult.concat({ title, result, isError }),
    });
  }

  render() {
    const { testResult } = this.state;
    const warnningStyle = {
      color: 'red',
    };
    return (
      <div>
        <h3>테스트데이터 정보</h3>
        <table>
          <tbody>
            <tr>
              <th>address</th>
              <td>{this.address}</td>
            </tr>
            <tr>
              <th>privateKey</th>
              <td>{privateKey}</td>
            </tr>
            <tr>
              <th>txHash</th>
              <td>{txHash}</td>
            </tr>
          </tbody>
        </table>
        <h3>테스트 결과값</h3>
        <table>
          <tbody>
            {_.map(testResult, (data, index) => (
              <tr key={index}>
                <th>{data.title}</th>
                <td>
                  {data.isError ? <span style={warnningStyle}>{data.result}</span> : data.result}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default HibsDemos;
