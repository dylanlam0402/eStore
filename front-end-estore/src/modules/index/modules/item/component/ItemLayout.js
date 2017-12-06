import React from 'react';
import { Layout, Menu, Icon, BackTop, Collapse } from 'antd';

import { connect } from 'react-redux'



const { Content, Sider, Header } = Layout;
const MenuItem = Menu.Item;
const Panel = Collapse.Panel

class IndexLayout extends React.Component {
    constructor() {
        super();
    }



    render() {
        const { children, itemTypes } = this.props

        return (

            <Layout style={{ padding: 10 }}>

                <Sider style={{
                    height: '100%',
                    backgroundColor: "white",
                    borderRight: '1px groove #FFFFFF',
                    minHeight: '100vh'
                }}>
                    <section class="wow rollIn" >
                    <Collapse style={{ margin: 20 }} defaultActiveKey={['1', '2', '3']}>
                        <Panel header="Discount" key="1">
                            <p>{children[1]}</p>
                        </Panel>
                        <Panel header="Category" key="2">
                            <p>{children[2]}</p>
                        </Panel>
                        <Panel header="Brand" key="3" >
                            <p>{children[3]}</p>
                        </Panel>
                    </Collapse>
                    </section>
                </Sider>
                <Content> <div style={{ background: 'white', minHeight: '100vh', height: '100%' }}>

                    {children[0]}

                </div></Content>
            </Layout>

        );
    }
}
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
const mapDispatchToProps = dispatch => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(IndexLayout)