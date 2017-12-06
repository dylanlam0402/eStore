

import React from 'react';
import { Menu, Icon } from 'antd';
import {NavLink} from 'react-router-dom'

class UserSection extends React.Component {
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
                        <NavLink to="/dashboard">
                            <Icon type="solution" />
                            <span className="nav-text">DashBoard</span>
                        </NavLink>
                    </Menu.Item>
                </Menu>

            </div>
        );
    }
};

export default UserSection;