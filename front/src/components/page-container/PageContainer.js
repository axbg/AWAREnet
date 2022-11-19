import React from 'react';
import { Container } from '@mui/material';
import _ from 'lodash';
import styles from './PageContainer.module.scss';
export const PageContainer = (props) => {
    console.log(props);
    return (
        <Container
            classes={{ root: styles.containerDiv }}
            className={`${styles.pageContainer}${
                _.get(props, 'pageClassName') ? ' ' + props.pageClassName : ''
            }`}>
            {props.children}
        </Container>
    );
};
