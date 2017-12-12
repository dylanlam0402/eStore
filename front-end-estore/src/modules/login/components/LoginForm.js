import { Form, Icon, Checkbox, Button, Input ,Select,Alert } from 'antd'
import React, { } from 'react'
import logo from '../../../images/logo.png'
import _ from 'lodash'
const FormItem = Form.Item
const Option = Select.Option;


class NormalLoginForm extends React.Component {
  state = {
    loading: false,
    iconLoading: false,
  }

  renderOptionsDomain =()=>{
        let options =[];
        const {domains} =this.props
        _.forEach(domains,function(element){
            options.push(<Option value={element.url}> {element.name}</Option>)
        });
        return options;

  }
  renderErrors = () =>{
      let render = []
      render.push(  
            <div id="loginErrorMessage" style={{color : 'red', width : '100%'}}>
            <Alert message={this.props.errors.type} type="error" showIcon />
            </div>
      )
      return render
  }

  render() {
    const { isLoading, onClick ,submitForm, domains, errors} = this.props

    const { getFieldDecorator } = this.props.form;

 

    return (
      
      <Form onSubmit={submitForm}>
        <FormItem className="formItemAnt">
          <div style={{width : '100%', textAlign : 'center'}}>
          <img src={logo} style={{maxWidth:'100%', width : '50%'}} />
          </div>
        </FormItem>
        {
           domains !== undefined ? 
           <FormItem className='formItemAnt' >
           {getFieldDecorator('domain', {
             rules: [{ required: true, message: 'Choose your domain' }],
             initialValue : domains[0].url
           })(
             <Select style={{ width: '100%' }} > 
               {this.renderOptionsDomain()} 
             </Select>
           )}
          </FormItem>
          : null
        }
       
        <FormItem className='formItemAnt' >
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem className='formItemAnt' >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem >
        {
            errors && this.renderErrors()
        }
         </FormItem>
          <FormItem className='formItemAnt' >
          <Button  style={{width :'40%'}} type="primary" htmlType="submit" loading={isLoading} className="login-form-button">
            <p>Log in</p>
          </Button>
        
          </FormItem>
      
      </Form>
    );
  }
}



export default NormalLoginForm
