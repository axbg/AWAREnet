import React, { useEffect, useState } from 'react';
import { useGlobalContext } from 'global-context';

import { IconButton, Button, Divider } from '@mui/material';
import styles from './Requests.module.scss';
import AddIcon from '@mui/icons-material/Add';
import { RequestCard } from './components/request-card/RequestCard';
import { PageContainer } from 'components/page-container/PageContainer';
import { AddRequestModal } from './components/add-request-modal/AddRequestModal';
import axios from 'axios';

export const Requests = () => {
    const [requests, setRequests] = useState(true);
    // const {
    //     state: { user }
    // } = useGlobalContext();

    // console.log(user);
    const [openModal, setOpenAddModal] = useState(false);
    const [showPending, setShowPending] = useState(true);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        axios.get(`/request/search?partner=${user.userId}`).then((res) => {
            console.log(res);
            setRequests(res.data);
        });
    }, []);
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
                </div>
                <Divider classes="divider" />

                {showPending ? <PendingRequests /> : <OnGoingRequests />}
            </div>
        </PageContainer>
    );
};
