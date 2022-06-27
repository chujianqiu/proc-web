import React from "react";
import {Tabs} from "antd";
import PublishList from "./PublishList";
import UnPublishList from "./UnPublishList";
const {TabPane} = Tabs;

const PublishTab = (props) => {
    let {user, name} = props;
    let userId = user.userId;
    let reqType = name ? name : '日常运营';

    return (
        <Tabs defaultActiveKey={'unPublished'} type={'card'}>
            <TabPane tab={'未发布'} key={'unPublish'}>
                <UnPublishList userId={userId} reqType={reqType}/>
            </TabPane>
            <TabPane tab={'已发布'} key={'publish'}>
                <PublishList userId={userId} reqType={reqType}/>
            </TabPane>
        </Tabs>
    )
}

export default PublishTab

