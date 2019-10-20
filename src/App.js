import React from 'react';
import {Switch, Route} from 'react-router';

import Auth from './containers/Auth/Auth.js';
import ToDoList from './containers/ToDoList/ToDoList';
import Layout from './containers/Layout/Layout';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path='/' exact component={Auth}/>
          <Route path='/list' component={ToDoList}/>   
        </Switch> 
      </Layout>
    </div>
  );
}

export default App;
