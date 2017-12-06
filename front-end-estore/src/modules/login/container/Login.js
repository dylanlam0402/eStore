
import React from 'react';
import { doLogin } from '../LoginAction';

import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'
import LoginPage from '../components/LoginPage'
import NormalLoginForm from '../components/LoginForm'
import {Form} from 'antd'


const WrapperLoginFrom = Form.create()(NormalLoginForm);


class Login extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {loginInfo :
            { email : "", password : "", rememberMe : false}
        };
    }
    initLoginForm = (form) => {
        this.form = form
    }
  
    submitForm = (e) => {
        e.preventDefault();
        const form = this.form
        form.validateFields((err, values) => {
            if (err) {
                return
            }
            this.props.dologin(values.userName, values.password);
            form.resetFields()
            this.setState({ visible: false })
        })
    }

   
    
    render() {
        
        const {loginInfo} = this.state
        const {isAuthenticated,isLoading, errors} = this.props
        if(isAuthenticated){
            return <Redirect to="/admin/projects"/>
        }
          
        return (
            <div>

            <LoginPage>
                <WrapperLoginFrom 
                
                errors={errors} 
           
                isLoading={isLoading} 
                submitForm={this.submitForm} 
                ref={this.initLoginForm}/>
            </LoginPage>
            </div>
        )
        
    }
};

const mapStateToProps = state => {
    // Handle state to update UI
    
    return { 
        loginInfo:{
            email: state.loginReducer.email,
            password: state.loginReducer.password
        },
        isLoading : state.loginReducer.isLoading,
        errors : state.loginReducer.errors,
        isAuthenticated : state.loginReducer.isAuthenticated,
    
    }
}

const mapDispatchToProps = dispatch => ({
    dologin: (email,password) => {
        dispatch(doLogin(email, password))
    
    },
  
})

export default connect(
    mapStateToProps,
    mapDispatchToProps)(Login);

