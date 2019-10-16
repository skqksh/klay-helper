import React, { Component } from 'react';
import _ from 'lodash';
import BN from 'bignumber.js';
import {
  klay, contract, utils,
} from '../../js/klayApiManager';

class KlayInfo extends Component {
  constructor() {
    super();
    this.state = {
      lastBlockNumber: 0,
      blockList: [],
      tokenName: '',
      tokenDecimal: '',
    };
    this.klay = klay;
    this.contract = contract;
    this.utils = utils;
    this.getTokenInfo();
  }

  componentDidMount() {
    const bNo = 'latest'; // '9670659'
    this.klay.getBlock(bNo).then((res) => {
      this.setState({ lastBlockNumber: res.number });
      this.getBlocks(20);
    });
  }

  getBlocks(cnt) {
    const { lastBlockNumber } = this.state;
    let nolastBlockNumber = Number(lastBlockNumber);
    _.times(cnt, () => {
      this.getBlockAndSetData(--nolastBlockNumber);
    });
  }

  getTokenInfo() {
    this.contract.methods.name().call()
      .then((tokenName) => { this.setState({ tokenName }); });
    this.contract.methods.decimals().call()
      .then((tokenDecimal) => { this.setState({ tokenDecimal }); });
  }

  handleTxInputData = (inputData) => {
    const { tokenDecimal } = this.state;
    if (_.size(inputData) === 138) {
      const method = inputData.substring(0, 10);
      const to = inputData.substring(10, 74);
      const value = BN(this.utils.hexToNumberString(inputData.substring(74)))
        .dividedBy(10 ** tokenDecimal).toString();
      return { method, to, value };
    }
    return {};
  }

  displayTokenTransferInfo = (from, inputData) => {
    const { to, value } = this.handleTxInputData(inputData);
    return (
      <div>
        <div>
          <b>from : </b>
          {from}
        </div>
        <div>
          <b>to : </b>
          {to}
        </div>
        <div>
          <b>amount : </b>
          {value}
        </div>
      </div>
    );
  }

  getBlockAndSetData = (blockNumber) => {
    this.klay.getBlock(blockNumber, true).then((res) => {
      this.addBlock(res);
      this.setState({ lastBlockNumber: blockNumber });
    });
  }

  handleScroll = (e) => {
    const element = e.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      // do something at end of scroll
    }
  }

  addBlock(block) {
    const { blockList } = this.state;
    this.setState({
      blockList: blockList.concat(block),
    });
  }

  render() {
    const { blockList } = this.state;
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>number</th>
              <th>info</th>
            </tr>
          </thead>
          <tbody>
            {_.map(blockList, (block, i) => (
              <tr key={i}>
                <td>{Number(block.number)}</td>
                <td>
                  <div>
                    <span>blockscore : </span>
                    {block.blockscore}
                  </div>
                  <div>
                    <span>governanceData : </span>
                    {block.governanceData}
                  </div>

                  <div>
                    <span>gasUsed : </span>
                    {block.gasUsed}
                  </div>

                  <div>
                    <span>hash : </span>
                    {block.hash}
                  </div>
                  <div>
                    <span>parentHash : </span>
                    {block.parentHash}
                  </div>
                  <div>
                    <span>receiptsRoot : </span>
                    {block.receiptsRoot}
                  </div>
                  <div>
                    <span>reward : </span>
                    {block.reward}
                  </div>
                  <div>
                    <span>size : </span>
                    {block.size}
                  </div>

                  <div>
                    <span>stateRoot : </span>
                    {block.stateRoot}
                  </div>
                  <div>
                    <span>timestamp : </span>
                    {block.timestamp}
                  </div>
                  <div>
                    <span>timestampFoS : </span>
                    {block.timestampFoS}
                  </div>
                  <div>
                    <span>totalBlockScore : </span>
                    {block.totalBlockScore}
                  </div>
                  <div>
                    <span>transactions : </span>
                    {_.map(block.transactions, (tx, txIndex) => (
                      <div key={txIndex}>
                        <b>{txIndex}</b>
                        <span> : </span>
                        <span className="badge badge-primary">{tx.hash}</span>
                        <hr />
                        <div>
                          {this.displayTokenTransferInfo(tx.from, tx.input)}
                        </div>
                      </div>
                    ))}
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button type="button" onClick={() => this.getBlocks(10)}>더보기</button>
        </div>
      </div>
    );
  }
}

export default KlayInfo;
