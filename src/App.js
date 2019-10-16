import React from 'react';
import { Route } from 'react-router-dom';
import {
  MainPage, TryMethod, HibsContract, KlayInfo,
} from './pages/index';
import MainNav from './pages/MainNav';
import './App.css';

function App() {
  return (
    <div>
      <MainNav />
      <Route exact path="/" component={MainPage} />
      <Route exact path="/trymethod" component={TryMethod} />
      <Route exact path="/hibscontract" component={HibsContract} />
      <Route exact path="/klayinfo" component={KlayInfo} />
    </div>
  );
}

export default App;
