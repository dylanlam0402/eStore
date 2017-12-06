import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon , Button} from 'antd';
const { Header, Content, Footer, Sider } = Layout;
class FooterLayout extends Component {
    render () {
        return (
            <Footer style={{textAlign: 'center', minHeight : '25px', height:'25px',padding: 0, textSize : 5}}>
            Lâm Anh Kiệt © fit.hcmup.edu.vn
             </Footer>
        );
    }
}

export default FooterLayout
