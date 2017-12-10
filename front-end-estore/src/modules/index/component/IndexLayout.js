import React from 'react';
import { Layout, Menu, Icon, BackTop } from 'antd';
import FooterLayout from '../../../components/FooterLayout'
import HeaderLayout from '../../../components/HeaderLayout'
import { connect } from 'react-redux'

import { getItemTypes } from '../../home/modules/admin/modules/ItemType/ItemTypeAction'

import logo from '../../../images/logo.png'
import MenuLeft from './MenuLeft'
import MenuRight from './MenuRight'

const { Content, Sider, Header } = Layout;
const MenuItem = Menu.Item;


class IndexLayout extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        if (this.props.itemTypes === undefined) {
            this.props.getItemTypes()
        }
    }

    state = {
        isAdmin: true,
        collapsed: false
    }
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }

    onMenuClick = (e) => {
        console.log(e.key)
    }


    renderMenuItemType = () => {
        const { itemTypes } = this.props;
        let menu = []
        if (itemTypes !== undefined) {
            itemTypes.forEach(element => {
                menu.push(<Menu.Item key={element.id}>{element.name}</Menu.Item>)
            });
        }
        else {
            menu.push(<Menu.Item key="setting:1">Type is not availale</Menu.Item>)
        }
        return menu;
    }

    render() {
        const { children, itemTypes } = this.props
        return (
            <Layout >
                <Layout>
                     
                    <Header className="header" style={{
                        width: '100%',
                        height: '80px',
                        position: 'fixed',
                        zIndex  : 9000
                    }} >
                       <div className="logo">
                            <img src={logo} style={{ width: '150px ', height: '80px', position: 'absolute' }} alt="logo" />
                        </div>
                        <MenuLeft renderMenuItemType={this.renderMenuItemType} onMenuLeftClick={this.onMenuClick}/>
                       
                        <MenuRight/>
                    </Header>
                  
                  
                </Layout>
                <Layout>
                    <Content style={{ padding: 0, minHeight: '100vh', marginTop: '80px', marginBottom: '25px' }}>
                        <div style={{ background: 'light-grey', minHeight: 380, height : '100%' }}>
                            {children} {/* this is content*/}
                        </div>
                        
                    </Content>
                </Layout>
                <Layout style={{ width: '100%', height: '20px', fontSize : 15, position: 'fixed', zIndex: 9000, bottom: 0 }}>
                    <FooterLayout />
                </Layout>
                <BackTop />
            </Layout>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        itemTypes: state.itemTypeReducer.data,
        
    }
}
const mapDispatchToProps = dispatch => ({
    getItemTypes: () => {
        dispatch(getItemTypes());
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(IndexLayout)