import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    Button,
    Avatar,
    Divider
} from '@mui/material';
import { red } from '@mui/material/colors';
import styles from './ActionCard.module.scss';
import { ImageListModal } from '../image-list/ImageListModal';

export const ActionCard = ({ ...props }) => {
    const [isOpen, openDetailsModal] = useState(false);
    const [action] = useState({ pictures: [], description: '', ownerId: '' });
    return (
        <div className={styles.customCard}>
            <Card
                onClick={() => openDetailsModal(true)}
                classes={{ root: styles.card }}>
                <CardHeader
                    title={
                        <div className={styles.customHeader}>
                            <span>Action: I need an event</span>{' '}
                            <Button
                                variant="outlined"
                                onClick={() => openDetailsModal(true)}>
                                View images
                            </Button>
                        </div>
                    }
                    subheader="by Devhacks"
                    classes={{ root: styles.modalHeader }}
                    titleTypographyProps={{ variant: 'h6' }}
                />
                <CardContent
                    onClick={props.onClick}
                    classes={{ root: styles.customContent }}>
                    <Divider classes={{ root: styles.divider }} />
                    <div className={styles.cardContent}>
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            A
                        </Avatar>

                        <span>
                            <strong>NGO</strong> requested for a event having
                            the budget of 3000euros. The scope is to have a
                            better understanding of climate change and to clean
                            up an area next to Bucharest.
                        </span>
                    </div>
                </CardContent>
            </Card>
            {isOpen && (
                <ImageListModal
                    isOpen={isOpen}
                    handleClose={() => openDetailsModal(false)}
                />
            )}
        </div>
    );
};
