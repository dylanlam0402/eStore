import React from 'react';
import {Row, Col, Card } from 'antd';

import { connect } from 'react-redux'




class CartLayOut extends React.Component {
    constructor() {
        super();
    }



    render() {
        const { children } = this.props

        return (
                <Row gutter={10}  >
                    <Col span={17 } style={{background:"white", margin : 10, padding :10}}>
                        {children[0]}
                    </Col>
                  
                    <Col span={6} style={{background:"white", margin : 10, padding :10}}>
                        {children[1]}
                    </Col>
                </Row>
        

        );
    }
}

export default (CartLayOut)