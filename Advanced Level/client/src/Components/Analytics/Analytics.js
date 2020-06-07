import React, { useContext } from 'react';
import selectn from 'selectn';

import style from './Analytics.module.css';

// components
import { Progress, Row, Col } from 'antd';

// context
import { store } from '../../context';

function Analytics() {
  const { state } = useContext(store);

  const tasks = selectn('tasks', state);
  const archived = selectn('archived', state);

  if (!tasks || !archived) {
    return null;
  }

  const getObjLength = (obj) => Object.keys(obj).length;

  const tasksCount = getObjLength(tasks);
  const archivedCount = getObjLength(archived);

  const totalCount = tasksCount + archivedCount;

  return (
    <div className={style.analytics}>
      <Row>
        <Col span={12} style={{ textAlign: 'right', paddingRight: '15px' }}>
          <span>Task Completed: </span>
          <span>{`${archivedCount}/${totalCount}`}</span>
        </Col>
        <Col span={12}>
          <Progress
            percent={(archivedCount / totalCount) * 100}
            // successPercent={25} // if possible check and getList of in progress and add them
            // status="active"
            showInfo={false}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Analytics;
