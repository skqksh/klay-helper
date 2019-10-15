import React, { Component } from 'react';
import { JsonInterface } from '../../components/HibsContractInfo/jsonInterface';

export class HibsContract extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <JsonInterface />
      </div>
    );
  }
}

export default HibsContract;
