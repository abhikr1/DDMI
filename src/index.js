import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchBar from './SearchBar';
import CreateDns from './CreateDns';
import GetNetwork from './GetNetwork';
import CreateNetwork from './CreateNetwork';

function App() {
  return (

  <Router>
          <Switch>
          <Route exact path='/ipaddress'  component={SearchBar} />
          <Route exact path='/dnsCreate' component={CreateDns} />
          <Route exact path='/network' component={GetNetwork}/>
          <Route exact path='/networkCreate' component={CreateNetwork}/>

          </Switch>
          </Router>
  )}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
