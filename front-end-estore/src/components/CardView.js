import React from 'react';
import { Card } from 'antd';

class CardView extends React.Component{
    constructor(props) {
        super();
       
    }
    
    render() {
        const {children, title} = this.props;
        return (
            <div>
                
       
                <div  style={{overflow: 'hidden'}}>
                    {children}
                   
                </div> 
        </div> 
           )
    }
};

export default CardView;