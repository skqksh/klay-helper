import React, { Component } from 'react';
import _ from 'lodash';
import {
  klay, contract, utils,
} from '../../js/klayApiManager';

class KlayInfo extends Component {
  constructor() {
    super();
    this.state = {
      lastBlockNumber: 0,
      blockList: [],
    };
    this.klay = klay;
    this.contract = contract;
    this.utils = utils;
  }

  componentDidMount() {
    const bNo = '9660832'; // latest
    this.klay.getBlock(bNo).then((res) => {
      this.setState({ lastBlockNumber: res.number });
      this.getAllBlocks();
    });
  }

  getAllBlocks() {
    const { lastBlockNumber } = this.state;
    let nolastBlockNumber = Number(lastBlockNumber);
    _.times(100, () => this.getBlockAndSetData(--nolastBlockNumber));
  }

  getBlockAndSetData = (blockNumber) => {
    this.klay.getBlock(blockNumber).then((res) => {
      this.addBlock(res);
    });
  }

  getTxInfo = (txHash) => {
    this.klay.getTransactionReceipt(txHash).then((res) => {

      console.log(res);
      console.log(this.utils);
    });
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
                    <span>gasUsed : </span>
                    {block.gasUsed}
                  </div>
                  <div>
                    <span>governanceData : </span>
                    {block.governanceData}
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
                      <div key={txIndex} onClick={() => { this.getTxInfo(tx); }}>
                        <b>{txIndex}</b>
                        <span> : </span>
                        <span className="badge badge-primary">{tx}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <span>transactionsRoot : </span>
                    {block.transactionsRoot}
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default KlayInfo;
