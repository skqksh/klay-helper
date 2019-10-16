import React, { Component } from 'react';
import _ from 'lodash';
import { contract } from '../../js/klayApiManager';

export class JsonInterface extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount() {
    const JsonInterface = contract._jsonInterface;
  }

  render() {
    return (
      <div>
        <b>하이블럭스 컨트렉트 JsonInterface</b>
        <table className="table">
          <thead>
            <tr>
              <th>name</th>
              <th>type</th>
              <th>inputs</th>
              <th>outputs</th>
              <th>constant</th>
              <th>payable</th>
              <th>signature</th>
              <th>stateMutability</th>
            </tr>
          </thead>
          <tbody>
            {_.map(contract._jsonInterface, (intf, i) => (
              <tr key={i}>
                <td>{intf.name}</td>
                <td>{intf.type}</td>
                <td>{JSON.stringify(intf.inputs)}</td>
                <td>{JSON.stringify(intf.outputs)}</td>
                <td>{intf.constant ? 'true' : 'false'}</td>
                <td>{intf.payable}</td>
                <td>{intf.signature ? 'true' : 'false'}</td>
                <td>{intf.stateMutability}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default JsonInterface;
