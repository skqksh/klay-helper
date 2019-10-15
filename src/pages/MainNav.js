import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { rpcURL } from '../js/caver';
import './MainNav.scss';

class MainNav extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div id="MainNav">
        <ul className="main_nav_list">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/trymethod">Try Method</Link></li>
          <li><Link to="/hibsContract">HIBS Contract</Link></li>
        </ul>
        <div className="main_nav_right">
          <b>rpcURL : </b>
          {rpcURL}
        </div>
      </div>
    );
  }
}

export default MainNav;
