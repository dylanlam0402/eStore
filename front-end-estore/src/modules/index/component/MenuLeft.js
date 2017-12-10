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
            <div style={{ display: 'inline-block', 
            lineHeight: '40px', height: 'auto', 
            marginLeft: 200, marginTop: 40} }>
               
                
                        <NavLink to="/" >
                            <Icon type="home" />
                            <span className="nav-text"> Home</span>
                        </NavLink>
                        &nbsp;
                   
                
                        <NavLink to="/items">
                            <Icon type="shop" />
                            <span className="nav-text"> Shop Now</span>
                        </NavLink>
                        &nbsp;
                   
                        <AutoComplete
                            size="large"
                           
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
                 

         

            </div>
        );
    }
};

export default MenuLeft;