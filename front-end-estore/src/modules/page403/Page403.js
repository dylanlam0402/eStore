import React from 'react';
import {Link}   from 'react-router-dom'
class Page403 extends React.Component{
    constructor() {
        super();
    }
    
    render() {
        return (
            <div>
                    <p>sorry, you dont have an authorize to connect this page </p>
                    <br/>
                    <p>Click here to return to your  <Link to="/"> Home Page </Link> </p>
            </div>
        );
    }
};

export default Page403;