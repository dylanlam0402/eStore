import React, { Component } from 'react';

import { Card, message } from 'antd';

import _ from 'lodash';

class LoginPage extends Component {

    render() {
        const  {children} = this.props;
        return (
            <div className='background-login'>
            <Card style={   {
                            minWidth : '300px',
                            width: '25%', height : 'fit-content', 
                            marginLeft :'auto', marginRight: 'auto',
                            marginTop : '10%', 
                            }}>
            {children}

            </Card>
          </div>
        )
    }
}
    
export default LoginPage