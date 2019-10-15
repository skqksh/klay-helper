import React, { Component } from 'react';
import { HibsContractInfo } from '../../components/HibsContractInfo';
import { HibsDemos } from '../../components/HibsDemos';

export class MainPage extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <HibsContractInfo />
        <HibsDemos />
      </div>
    );
  }
}

export default MainPage;
