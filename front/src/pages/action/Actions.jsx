import React, { useState, useEffect } from 'react';
import { IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { PageContainer } from 'components/page-container/PageContainer';
import { ActionCard } from './components/action-card/ActionCard';

import styles from './Actions.module.scss';
import { AddActionModal } from './components/add-action/AddActionModal';
import axios from 'axios';
import { AddRequestModal } from 'pages/request/components/add-request-modal/AddRequestModal';

export const Actions = () => {
    const [actions, setActions] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    const [openModal, setOpenAddModal] = useState(false);
    const [showPending, setShowPending] = useState(true);
    const [openRequestModal, setRequestModalOpen] = useState(false);
    useEffect(() => {
        axios.get(`/action/search`).then((res) => {
            console.log(res);
            setActions(res.data.actions);
        });
    }, []);
    return (
        <PageContainer>
            <div className={styles.eventsContainer}>
                <div className={styles.headerButtons}>
                    {user.type !== 'ngo' && (
                        <IconButton
                            color="primary"
                            aria-label="grid view"
                            onClick={() => setOpenAddModal(true)}>
                            <AddIcon />
                        </IconButton>
                    )}
                </div>
                <div className={styles.pendingActions}>
                    {actions.map((act) => (
                        <ActionCard type="onGoing" key={act._id} action={act} />
                    ))}

                    {/* mai multe */}
                </div>
            </div>
            {openModal && (
                <AddActionModal
                    isOpen={openModal}
                    handleClose={() => setOpenAddModal(false)}
                />
            )}
            {openRequestModal && (
                <AddRequestModal
                    isOpen={openRequestModal}
                    handleClose={() => setRequestModalOpen(false)}
                />
            )}
        </PageContainer>
    );
};
