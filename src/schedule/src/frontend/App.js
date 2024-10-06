// src/frontend/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateVideo from './components/CreateVideo';
import Membership from './components/Membership';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>TikTok Faceless Video Generator</h1>
        <Switch>
          <Route path="/create-video" component={CreateVideo} />
          <Route path="/membership" component={Membership} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
