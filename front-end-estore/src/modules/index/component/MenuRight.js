import React from 'react';
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { Layout, Menu, Icon, Badge } from 'antd';
import { connect } from 'react-redux'
const MenuItem = Menu.Item;
const MenuItemGroup = Menu.ItemGroup;
const SubMenu = Menu.SubMenu;

class MenuRight extends React.Component {
    constructor() {
        super();
    }

    onMenuClick = (e) => {
        console.log(e.key)
    }


    render() {
        const { renderMenuItemType, count } = this.props;

        return (

            <div style={{ display: 'inline-block', right: 0, top :0, position : 'absolute' }}>
                <Badge count={count} style={{verticalAlign : 'text-top !important' }}>
                    {count > 0 ?
                        <NavLink to="/cart">
                            <Icon type="shopping-cart" /> My Cart
                        </NavLink>
                        :
                        <NavLink to="/cart">
                            <Icon style={{ color: '#fff', fontSize: 20 }} type="shopping-cart" /> My Cart
                        </NavLink>
                    }
                </Badge>
                &nbsp;
                &nbsp;
                <NavLink to="/">
                    <Icon type="login" />
                    <span className="nav-text"> Sign Up</span>
                </NavLink>

                &nbsp;
                &nbsp;   
                <NavLink to="/login">
                    <Icon type="login" />
                    <span className="nav-text"> Login</span>
                </NavLink>




            </div>
        );
    }
};
const mapStateToProps = (state) => {
    return {
        count: state.cartReducer.count,

    }
}
export default connect(mapStateToProps)(MenuRight);