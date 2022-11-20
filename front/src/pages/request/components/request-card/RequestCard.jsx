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
    console.log(props.req);
    return (
        <div className={styles.customCard}>
            <Card
                onClick={() => openDetailsModal(true)}
                classes={{ root: styles.card }}>
                <CardHeader
                    title={
                        <div className={styles.customHeader}>
                            <span>
                                {_.get(props, 'req.event.title', 'N/A')}
                            </span>{' '}
                            {_.get(props, 'req.response') && <DoneIcon />}
                        </div>
                    }
                    subheader={
                        _.get(props, 'req.partner.name')
                            ? 'Together with ' +
                              _.get(props, 'req.partner.name')
                            : ''
                    }
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
                            <strong>
                                {_.get(props, 'req.owner.name', 'NGO')}
                            </strong>{' '}
                            {props.type === 'incoming'
                                ? 'wants to join your event'
                                : 'wants to share their event'}
                        </span>
                    </div>
                </CardContent>
            </Card>
            {isOpen && (
                <RequestDetails
                    isOpen={isOpen}
                    type={props.type}
                    handleClose={() => openDetailsModal(false)}
                    request={_.get(props, 'req')}
                />
            )}
        </div>
    );
};
