import React from 'react';
import './App.css';
import Main from './components/main';
import Starting from './components/starting';
import Google from './components/google';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Starting}/>
          <Route path="/main" component={Main}/>
          <Route path="/google" component={Google}/>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
