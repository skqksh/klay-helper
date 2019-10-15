import React, { Component } from 'react';
import { contract } from '../../js/klayApiManager';
import './index.scss';

export class HibsContractInfo extends Component {
  constructor() {
    super();
    this.state = {
      totalSupply: 0,
      name: 0,
      owner: 0,
    };
  }

  componentDidMount() {
    contract.methods.totalSupply().call().then((res) => {
      this.setState({ totalSupply: res });
    });
    contract.methods.name().call().then((res) => {
      this.setState({ name: res });
    });
    contract.methods.owner().call().then((res) => {
      this.setState({ owner: res });
    });
  }

  render() {
    const { totalSupply, name, owner } = this.state;
    return (
      <div id="ComHibsContractInfo">
        <b>하이블럭스 컨트렉트 정보</b>
        <table className="table">
          <tbody>
            <tr>
              <th>totalSupply</th>
              <td>{totalSupply}</td>
            </tr>
            <tr>
              <th>name</th>
              <td>{name}</td>
            </tr>
            <tr>
              <th>owner</th>
              <td>{owner}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default HibsContractInfo;
