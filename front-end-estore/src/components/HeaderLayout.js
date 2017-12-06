import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon , Button} from 'antd';
const { Header, Content, Footer, Sider } = Layout;

class HeaderLayout extends Component {
    

    render () {
        const {title} = this. props
        return (
            <Header style={{background: '#fff', width:'100%',height : 'auto', padding: 0 }} >
                <h1> {title} </h1>
            </Header>
        );
    }
}

export default HeaderLayout
