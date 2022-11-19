import React from 'react';

import { Card, CardContent, CardHeader, Avatar, Divider } from '@mui/material';
import { red } from '@mui/material/colors';

import styles from './RequestCard.module.scss';

export const RequestCard = ({ ...props }) => {
    return (
        <div className={styles.customCard}>
            <Card
                onClick={() => console.log('aici')}
                classes={{ root: styles.card }}>
                <CardHeader
                    title="Workshop: Reciclarea selectiva"
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
        </div>
    );
};
