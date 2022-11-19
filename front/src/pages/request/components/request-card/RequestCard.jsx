import React, { useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import { Card, CardContent, CardHeader, Avatar, Divider } from '@mui/material';
import { red } from '@mui/material/colors';
import _ from 'lodash';
import styles from './RequestCard.module.scss';
import { RequestDetails } from '../request-details/RequestDetails';

export const RequestCard = ({ ...props }) => {
    const [isOpen, openDetailsModal] = useState(false);
    const [request] = useState({ response: false });
    return (
        <div className={styles.customCard}>
            <Card
                onClick={() => openDetailsModal(true)}
                classes={{ root: styles.card }}>
                <CardHeader
                    title={
                        <div className={styles.customHeader}>
                            <span>Workshop: Reciclarea selectiva </span>{' '}
                            {_.get(request, 'response') && <DoneIcon />}
                        </div>
                    }
                    subheader="by ONG"
                    classes={{ root: styles.modalHeader }}
                    titleTypographyProps={{ variant: 'h6' }}
                />
                <CardContent
                    onClick={props.onClick}
                    classes={{ root: styles.customContent }}>
                    <Divider classes={{ root: styles.divider }} />
                    <div className={styles.cardContent}>
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            R
                        </Avatar>

                        <span>
                            <strong>DevHacks</strong> requested to be a partner
                            on this event.
                        </span>
                    </div>
                </CardContent>
            </Card>
            {isOpen && (
                <RequestDetails
                    isOpen={isOpen}
                    handleClose={() => openDetailsModal(false)}
                    request={request}
                />
            )}
        </div>
    );
};
