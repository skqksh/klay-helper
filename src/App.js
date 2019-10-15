import React from 'react';
import { Route } from 'react-router-dom';
import { MainPage, TryMethod, HibsContract } from './pages/index';
import MainNav from './pages/MainNav';
import './App.css';

function App() {
  return (
    <div>
      <MainNav />
      <Route exact path="/" component={MainPage} />
      <Route exact path="/trymethod" component={TryMethod} />
      <Route exact path="/hibsContract" component={HibsContract} />
    </div>
  );
}

export default App;
