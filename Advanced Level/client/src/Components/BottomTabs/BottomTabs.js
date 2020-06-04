import React from 'react';

// style
import style from './BottomTabs.module.css';

// components
import { Tabs } from 'antd';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

function BottomTabs() {
  return (
    <div className={style.bottomTab}>
      <Tabs
        defaultActiveKey="1"
        onChange={callback}
        tabPosition="bottom"
        style={{ color: 'white', zIndex: 10 }}
        tabBarStyle={{ color: 'white', background: '#7041ee' }}
      >
        <TabPane tab="Tab 1" key="1">
          {/* Content of Tab Pane 1 */}
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          {/* Content of Tab Pane 2 */}
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          {/* Content of Tab Pane 3 */}
        </TabPane>
      </Tabs>
    </div>
  );
}

export default BottomTabs;
