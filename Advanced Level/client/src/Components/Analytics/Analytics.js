import React from 'react';

import style from './Analytics.module.css';

// components
import { Progress, Row, Col } from 'antd';

function Analytics() {
  return (
    <div className={style.analytics}>
      <Row>
        <Col span={12} style={{ textAlign: 'right', paddingRight: '15px' }}>
          <span>Task Completed: </span>
          <span>13/43</span>
        </Col>
        <Col span={12}>
          <Progress
            percent={30}
            successPercent={25}
            status="active"
            showInfo={false}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Analytics;
