import React from 'react';
import illustration from 'assets/join-login.svg';

import styles from './NoData.module.scss';

export const NoData = ({ title = 'No data available' }) => {
    return (
        <div className={styles.noDataContainer}>
            <div className={styles.noDataImage}>
                <img
                    src={illustration}
                    alt="avatar"
                    className={styles.noDataImg}
                />

                <span className={`${styles.center} ${styles.noDataTitle}`}>
                    {title}
                </span>
            </div>
        </div>
    );
};
