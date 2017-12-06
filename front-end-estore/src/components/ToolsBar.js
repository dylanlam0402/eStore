import React, { Component } from 'react';
import { Row, Col,Button} from 'antd';


class ToolsBar extends Component {
    

    render () {
        const {onSaveChanges, onDiscard,isSaving} = this.props
        return (
            <Row style={{ float : 'right'}}>  
                  <Button onClick={onDiscard} style={{marginRight:5}} type="dashed" > Discard</Button>
                  <Button loading={isSaving} onClick={onSaveChanges} type="primary"> Save Changes</Button>
            </Row>
        );
    }
}

export default ToolsBar