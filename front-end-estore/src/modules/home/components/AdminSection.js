

import React from 'react';
import { Menu, Icon } from 'antd';
import { Redirect, NavLink } from 'react-router-dom'
class AdminSection extends React.Component {
    constructor() {
        super();
    }

    render() {

        return (
            <div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <NavLink to="/issue">
                            <Icon type="solution" />
                            <span className="nav-text">List Ticket</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <NavLink to="/report">
                            <Icon type="line-chart" />
                            <span className="nav-text">Report</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <NavLink to="/admin/itemtype">
                            <Icon type="solution" />
                            <span className="nav-text">Item Type</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <NavLink to="/admin/project">
                            <Icon type="bars" />
                            <span className="nav-text">List Project</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="5" >
                        <NavLink to="/admin/user">
                            <Icon type="user" />
                            <span className="nav-text">List User</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <NavLink to="/admin/role">
                            <Icon type="trademark" />
                            <span className="nav-text">List Role</span>
                        </NavLink>
                    </Menu.Item>



                </Menu>

            </div>
        );
    }
};

export default AdminSection;