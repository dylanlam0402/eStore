import React from 'react';

import {
  BrowserRouter,
  Route,
  Switch,Redirect
 
} from 'react-router-dom'
import { connect } from 'react-redux';
import Home from './modules/home/container/Home'
import About from './modules/about/About';
import Login from './modules/login/container/Login';
import Index from './modules/index/container/Index'
import {security} from './utils/security'
import Page403 from './modules/page403/Page403'
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

class App extends React.Component {


  componentDidCatch  =()=>{
    return(<div> A Page Has Errors </div>);
  }
  render() {

    
    return (
      <BrowserRouter>
      <div>
      
        <Switch>
     
          <Route
            path="/about"
            component={About} />
          <Route
            path="/login"
            component={Login}
          />
        
         
          <Route 
            path="/admin"
            component={Home} />

          <Route 
            path="/page403"
            component={Page403} />
          <Route
            path="/"
            component={Index}
            />

         
        </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = state => {
  
  return {
      
      isAuthenticated : true,//state.loginReducer.isAuthenticated
  }
}
 
export default connect(mapStateToProps)(App);


