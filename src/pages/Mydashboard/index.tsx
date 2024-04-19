import styles from './Mydashboard.module.scss';
import React from 'react';

export default function Mydashboard() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.menu}></div>
        <div className={styles.navbar}></div>
        <div className={styles.contentContainer}>
          <button className={styles.newDashboard}>새로운 대시보드</button>
          <div>초대받은</div>
        </div>
      </div>
    </>
  );
}
