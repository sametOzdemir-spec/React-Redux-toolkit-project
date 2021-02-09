import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Movie from './movie';
import { Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div className="App">
       <Switch>
          <Route path="/" component={Movie} exact />
      </Switch>
    </div>
  );
}

export default App;
