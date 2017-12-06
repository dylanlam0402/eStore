import React from 'react';
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { Layout, Menu, Icon, AutoComplete, Input, Button } from 'antd';

const MenuItem = Menu.Item;
const MenuItemGroup = Menu.ItemGroup;
const SubMenu = Menu.SubMenu;

const Option = AutoComplete.Option

const dataSource=[{name :'abc'}, {name : 'def'},{name :'ghi'}]

class MenuLeft extends React.Component {
    constructor() {
        super();
    }

    onSelect = (value)=>{
        alert(value)
    }
    handleSearch = (value)=>{
        console.log(value);
    }

    renderOption= (item)=> {
        return (
          <Option key={item.name} text={item.name}>
           {item.name}
          </Option>
        );
      }
    render() {
        const { renderMenuItemType, onMenuLeftClick, handleSubmitSearch } = this.props;

        return (
            <div>
                <Menu
                    onClick={(e) => { onMenuLeftClick(e) }}
                    theme="dark"
                    mode="horizontal"
                    style={{ lineHeight: '40px', height: 'auto', marginLeft: 200, marginTop: 40 }}
                >
                    <Menu.Item key="home" >
                        <NavLink to="/">
                            <Icon type="home" />
                            <span className="nav-text">Home</span>
                        </NavLink>
                    </Menu.Item>
                    <SubMenu title={<span><Icon type="menu-unfold" />Category</span>}>
                        {renderMenuItemType()}
                    </SubMenu>
                    <Menu.Item key="shopnow" >
                        <NavLink to="/items">
                            <Icon type="shop" />
                            <span className="nav-text">Shop Now</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="search">
                        <AutoComplete
                            size="large"
                            style={{ width: '100%' }}
                            dataSource={dataSource.map(this.renderOption)}
                            onSelect={this.onSelect}
                            onSearch={this.handleSearch}
                            placeholder="input here"
                            optionLabelProp="text"
                        >
                            <Input
                                suffix={(
                                    <Button className="search-btn" size="large" type="primary">
                                        <Icon type="search" />
                                    </Button>
                                )}
                            />
                        </AutoComplete>
                    </Menu.Item>

                </Menu>

            </div>
        );
    }
};

export default MenuLeft;