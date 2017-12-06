import React from 'react';
import HomeLayout from '../components/Layout'
import Admin from '../modules/admin/container/Admin'

import {Switch, Route, Redirect} from 'react-router-dom'
import HeaderLayout from '../../../components/HeaderLayout'
import {security} from '../../../utils/security'


class Home extends React.Component{
    constructor() {
        super();
    }
   
   title = ()=> {
        let pathname = this.props.location.pathname;
        let strName = pathname.split('/');
        let name = strName.length === 2? strName[1] : strName[2];
        let title = name.toUpperCase() + " MANAGEMENT"
        return title;
   }

    render() {
          
        return (
            <div>
                
                <HomeLayout >
                        <HeaderLayout title ={this.title()}/>
                        <div>
                        <Route path='/admin' component={security(Admin, "ADMIN")}></Route>
                        </div>
                </HomeLayout>
        
                
            </div>
        );
    }
};

export default Home;