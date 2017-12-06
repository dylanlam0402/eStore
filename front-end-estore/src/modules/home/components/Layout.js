import React from 'react';
import { Layout , Menu} from 'antd';
import FooterLayout from '../../../components/FooterLayout'
import AdminSection from './AdminSection'
import { connect } from 'react-redux'
import UserSection from './UserSection'


const { Content, Sider, Header } = Layout;
const MenuItem = Menu.Item

class HomeLayout extends React.Component {
    constructor() {
        super();
    }

    state = {
        isAdmin: true,
        collapsed: false
    }
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }
    renderSection(isAdmin) {
        if (isAdmin) {
            return <AdminSection />
        }
        return <UserSection />
    }

    render() {
        const { children } = this.props
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Layout>
                    <Header className="header" style={{ position: 'fixed', width: '100%', borderBottom : '1px solid yellow'}} >
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            style={{ lineHeight: '50px' }}
                        >
                            <Menu.Item key="1">nav 1</Menu.Item>
                            <Menu.Item key="2">nav 2</Menu.Item>
                            <Menu.Item key="3">nav 3</Menu.Item>
                        </Menu>
                    </Header>
                </Layout>
               <Layout>
                   <Sider collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}
                        style={{ overflow: 'auto', height: '100vh', left: 0 , marginTop : '65px', marginBottom : '5px', position : 'fixed' }}>
                        <div className="logo">
                            <img src={""} style={{ width: "100%", height: "auto", padding: '10px' }} />
                        </div>
                        {this.renderSection(this.state.isAdmin)}
                    </Sider> 
                </Layout> 
                <Layout style={{ marginLeft: 200, height: '100vh' }}>
                

                        {children[0]} {/* this is header*/}

                        <Content style={{ margin: '24px 16px 0', overflow: 'auto' }}>
                            <div style={{ padding: 40, background: '#fff' }}>
                                {children[1]} {/* this is content*/}
                            </div>
                        </Content>
                      
              
                </Layout>
                <Layout >
                        <FooterLayout />
                </Layout>
               
            </Layout>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isAdmin: false
    }
}
export default connect(mapStateToProps)(HomeLayout)