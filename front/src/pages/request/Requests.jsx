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
    const [incomingList, setIncomingList] = useState([]);
    const [outgoingList, setOutgoingList] = useState([]);
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
            setIncomingList(res.data.requests);
        });
        axios.get(`/request/search?owner=${user.userId}`).then((res) => {
            console.log(res);
            setOutgoingList(res.data.requests);
        });
    }, []);
    const IncomingRequests = () => {
        return (
            <div className={styles.pendingRequests}>
                {incomingList.map((item) => (
                    <RequestCard req={item} key={item._id} />
                ))}
            </div>
        );
    };
    const OutgoingRequests = () => {
        return (
            <div className={styles.pendingRequests}>
                {outgoingList.map((item) => (
                    <RequestCard req={item} key={item._id} type="outgoing" />
                ))}
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
                            Incoming
                        </Button>
                        <Button
                            variant="text"
                            onClick={() => setShowPending(false)}
                            sx={{
                                color: !showPending ? '#0A3200' : '#4281A4'
                            }}>
                            Outgoing
                        </Button>
                    </div>
                </div>
                <Divider classes="divider" />

                {showPending ? <IncomingRequests /> : <OutgoingRequests />}
            </div>
        </PageContainer>
    );
};
