import React from 'react';
import { render } from 'react-dom';
import { hashHistory, Switch } from 'react-router';
import { HashRouter as Router, Route } from 'react-router-dom'; 
//import App from './components/App';
import UsersComponent from './components/User/UsersComponent';
import UserNewComponent from './components/User/UserNewComponent';
import UserEditComponent from './components/User/UserEditComponent';

// Approach 1: Page flow by Router
class CrudRouter extends React.Component {

  render() {
    return (
    <div>
    <div><p>[index.js] page {new Date().toString()}</p></div>
    <Router history={hashHistory}>  
      <Switch>
        <Route exact path="/" component={UsersComponent} />
        <Route path="/user/new" component={UserNewComponent} />
        <Route path="/user/edit/:userId" component={UserEditComponent} />
      </Switch>
    </Router>
    </div>
    );
  }
}
  
render(
  <CrudRouter />
  ,document.getElementById('app')); 



