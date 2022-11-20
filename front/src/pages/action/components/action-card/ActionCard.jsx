import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    Button,
    Avatar,
    IconButton,
    Divider
} from '@mui/material';
import { red } from '@mui/material/colors';
import styles from './ActionCard.module.scss';
import { ImageListModal } from '../image-list/ImageListModal';
import AddIcon from '@mui/icons-material/Add';

import _ from 'lodash';
import { AddRequestModal } from 'pages/request/components/add-request-modal/AddRequestModal';

export const ActionCard = ({ action, ...props }) => {
    const [isOpen, openDetailsModal] = useState(false);
    const [openRequestModal, setRequestModalOpen] = useState(false);

    // const [action] = useState({ pictures: [], description: '', ownerId: '' });
    console.lo;
    return (
        <div className={styles.customCard}>
            <Card
                onClick={() => openDetailsModal(true)}
                classes={{ root: styles.card }}>
                <CardHeader
                    title={
                        <div className={styles.customHeader}>
                            <span>Action: {_.get(action, 'title', 'N/A')}</span>{' '}
                            <div style={{ display: 'flex', gap: '5px' }}>
                                <Button
                                    variant="outlined"
                                    onClick={() => openDetailsModal(true)}>
                                    View images
                                </Button>

                                <Button
                                    variant="outlined"
                                    startIcon={<AddIcon />}
                                    onClick={() => setRequestModalOpen(true)}>
                                    Add request
                                </Button>
                            </div>
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
                            <strong>Company</strong>{' '}
                            {_.get(action, 'description', 'N/A')}
                        </span>
                    </div>
                </CardContent>
            </Card>
            {isOpen && (
                <ImageListModal
                    isOpen={isOpen}
                    data={_.get(action, 'pictures', [])}
                    action={action}
                    handleClose={() => openDetailsModal(false)}
                />
            )}
            {openRequestModal && (
                <AddRequestModal
                    isOpen={openRequestModal}
                    handleClose={() => setRequestModalOpen(false)}
                />
            )}
        </div>
    );
};
