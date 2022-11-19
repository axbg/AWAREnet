import React, { useState } from 'react';
import { IconButton, Button } from '@mui/material';
import styles from './Requests.module.scss';
import AddIcon from '@mui/icons-material/Add';
import { RequestCard } from './components/request-card/RequestCard';
import { PageContainer } from 'components/page-container/PageContainer';
import { AddRequestModal } from './components/add-request-modal/AddRequestModal';

export const Requests = () => {
    const [requests] = useState(true);

    const [openModal, setOpenAddModal] = useState(false);
    const [showPending, setShowPending] = useState(true);

    const PendingRequests = () => {
        return (
            <div className={styles.pendingRequests}>
                <RequestCard />
                <RequestCard />
                <RequestCard />
                <RequestCard />
                <RequestCard />
                <RequestCard />
            </div>
        );
    };
    const OnGoingRequests = () => {
        return (
            <div className={styles.pendingRequests}>
                <RequestCard type="onGoing" />
                <RequestCard type="onGoing" />
                <RequestCard type="onGoing" />
                <RequestCard type="onGoing" />
                <RequestCard type="onGoing" />
                <RequestCard type="onGoing" />
            </div>
        );
    };
    return (
        <PageContainer>
            <div className={styles.eventsContainer}>
                <div className={styles.headerButtons}>
                    <div className={styles.switchButton}>
                        <Button
                            variant="text"
                            onClick={() => setShowPending(true)}
                            sx={{ color: showPending ? '#0A3200' : '#4281A4' }}>
                            Pending
                        </Button>
                        <Button
                            variant="text"
                            onClick={() => setShowPending(false)}
                            sx={{
                                color: !showPending ? '#0A3200' : '#4281A4'
                            }}>
                            On going
                        </Button>
                    </div>
                    <IconButton
                        color="primary"
                        aria-label="grid view"
                        onClick={() => setOpenAddModal(true)}>
                        <AddIcon />
                    </IconButton>
                </div>
                {showPending ? <PendingRequests /> : <OnGoingRequests />}
            </div>
            {openModal && (
                <AddRequestModal
                    isOpen={openModal}
                    handleClose={() => setOpenAddModal(false)}
                />
            )}
        </PageContainer>
    );
};
