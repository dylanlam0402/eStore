import React from 'react';

import {Row} from 'antd';
import ImageSlider from '../component/ImageSlider'
import ListRankingItem from '../component/ListRankingItem'
import { Col } from 'antd/lib/grid';
import { connect } from 'react-redux';

class Shopping extends React.Component{
    constructor() {
        super();
    }
   


    render() {
          
        return (
        
                <Row>
                   <Row>
                     <ImageSlider/>
                   </Row>
                    <Row gutter={16}>
                    <section class="wow slideInLeft"><ListRankingItem /> </section> 
                    </Row>
                </Row>
        );
    }
};
const mapStateToProps = (state) => {
    return {
        itemTypes: [
            {
                "id": 1,
                "createdAt": "2017-12-03T15:58:00",
                "name": "Phone",
                "description": "phone type",
                "activated": true
            },
            {
                "id": 2,
                "createdAt": "2017-12-03T15:58:00",
                "name": "Tablet",
                "description": "tablet type",
                "activated": true
            }
        ],
        
    }
}
export default connect(mapStateToProps)(Shopping) ;