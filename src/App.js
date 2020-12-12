import React, { Component } from 'react';
import Layout from "./components/Layout/Layout"
import BurguerBuilder from './conteiners/BurguerBuilder/BurguerBuilder'
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'
import Checkout from './conteiners/Checkout/Checkout'
import Orders from './conteiners/Orders/Orders'
import Auth from './conteiners/Auth/Auth'
import Logout from './conteiners/Auth/Logout/Logout'
import { connect } from 'react-redux'
import * as actionsTypes from './store/actions/index'

class App extends Component {

  componentDidMount(){
      this.props.onTryAutoSignup()
  }

  render() {
  let routes = (
    <Switch>
        <Route path="/auth" component={Auth}  />
        <Route path="/"  exact component={BurguerBuilder} />
        <Redirect to="/"/>
    </Switch>
  )

  if(this.props.isAuthenticated){
    routes = (
      <Switch>
                <Route path="/checkout" component={Checkout} />
                <Route path="/orders" component={Orders} />
                <Route path="/auth" component={Auth}  />
                <Route path="/logout" component={Logout}  />
                <Route path="/"  exact component={BurguerBuilder} />      
                <Redirect to="/"/>
       </Switch>
    )
  }
    return (
      <BrowserRouter>
         <div>
            <Layout>
                {routes}
            </Layout>
          </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state=>{
  return{
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispacthToProps = dispatch=>{
  return{
    onTryAutoSignup:()=>dispatch(actionsTypes.authCheckState())
  }
}
export default connect(mapStateToProps,mapDispacthToProps)(App)
