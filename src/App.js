import React from 'react';
import { Route } from 'react-router-dom';
import { MainPage} from './pages/index';
import './App.css';

function App() {
  return (
    <Route exact path="/" component={MainPage} />
  );
}

export default App;
