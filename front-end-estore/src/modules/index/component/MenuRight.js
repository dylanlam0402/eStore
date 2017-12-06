import React from 'react';
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { Layout, Menu, Icon, Badge } from 'antd';
import {connect } from 'react-redux'
const MenuItem = Menu.Item;
const MenuItemGroup = Menu.ItemGroup;
const SubMenu = Menu.SubMenu;

class MenuRight extends React.Component {
    constructor() {
        super();
    }

    onMenuClick =(e) =>{
        console.log(e.key)
    }


    render() {
        const { renderMenuItemType, count } = this.props;
        
        return (
            <div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    style={{ right: 0, top: 0, position: 'absolute' }}
                >
                     <MenuItem>
                        <Badge count={count}>
                            { count >0 ? 
                            <NavLink to="/shopping/cart">
                            <Icon type="shopping-cart"/>
                            </NavLink>
                            :
                            <NavLink  to="/shopping/cart">
                            <Icon style={{color : '#fff', fontSize: 20}} type="shopping-cart"/>
                            </NavLink> 
                        }
                        </Badge>
                    </MenuItem>
                    <MenuItem>
                        <NavLink to="/">
                            <Icon type="login" />
                            <span className="nav-text">Sign Up</span>
                        </NavLink>
                    </MenuItem>
                    <MenuItem>
                        <NavLink to="/login">
                            <Icon type="login" />
                            <span className="nav-text">Login</span>
                        </NavLink>
                    </MenuItem>
                    
                </Menu>

            </div>
        );
    }
};
const mapStateToProps = (state) => {
    return {
        count :state.cartReducer.count,
        
    }
}
export default connect(mapStateToProps)  (MenuRight);