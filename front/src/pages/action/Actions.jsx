import React, { useState } from 'react';
import { IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { PageContainer } from 'components/page-container/PageContainer';
import { ActionCard } from './components/action-card/ActionCard';

import styles from './Actions.module.scss';

export const Actions = () => {
    const [requests] = useState(true);

    const [openModal, setOpenAddModal] = useState(false);
    const [showPending, setShowPending] = useState(true);

    return (
        <PageContainer>
            <div className={styles.eventsContainer}>
                <ActionCard type="onGoing" />
            </div>
            {/* {openModal && (
                // <AddActionModal
                //     isOpen={openModal}
                //     handleClose={() => setOpenAddModal(false)}
                // />
            )} */}
        </PageContainer>
    );
};
