import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

export const security = (WrappedComponent, ...allowedRoles) => {
  class WithAuthorization extends Component {
    
    render() {
      const { isAuthenticated , role } = this.props

      if (!isAuthenticated) {
        return <Redirect to='/login' />
      }
      if(allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        return <Redirect to='/page403' />
      }
      return <WrappedComponent {...this.props} />
    }
  }

  const mapStateToProps = (state) => {
      return {
          isAuthenticated : true,//state.loginReducer.isAuthenticated,
            role : "ADMIN" ,// state.loginReducer.roles[0].name
        };
  }

  return connect(mapStateToProps)(WithAuthorization)
}