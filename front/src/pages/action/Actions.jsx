import React, { useState } from 'react';
import { IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { PageContainer } from 'components/page-container/PageContainer';
import { ActionCard } from './components/action-card/ActionCard';

import styles from './Actions.module.scss';
import { AddActionModal } from './components/add-action/AddActionModal';

export const Actions = () => {
    const [requests] = useState(true);

    const [openModal, setOpenAddModal] = useState(false);
    const [showPending, setShowPending] = useState(true);

    return (
        <PageContainer>
            <div className={styles.eventsContainer}>
                <div className={styles.headerButtons}>
                    <IconButton
                        color="primary"
                        aria-label="grid view"
                        onClick={() => setOpenAddModal(true)}>
                        <AddIcon />
                    </IconButton>
                </div>
                <div className={styles.pendingActions}>
                    <ActionCard type="onGoing" />
                    {/* mai multe */}
                </div>
            </div>
            {openModal && (
                <AddActionModal
                    isOpen={openModal}
                    handleClose={() => setOpenAddModal(false)}
                />
            )}
        </PageContainer>
    );
};
