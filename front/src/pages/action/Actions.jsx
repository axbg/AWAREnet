import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { PageContainer } from 'components/page-container/PageContainer';
import { ActionCard } from './components/action-card/ActionCard';

import styles from './Actions.module.scss';
import { AddActionModal } from './components/add-action/AddActionModal';
import axios from 'axios';

export const Actions = () => {
    const [actions, setActions] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const [openModal, setOpenAddModal] = useState(false);

    useEffect(() => {
        axios.get(`/action/search`).then((res) => {
            console.log(res);
            setActions(res.data.actions);
        });
    }, []);

    return (
        <PageContainer>
            <div className={styles.eventsContainer}>
                {user.type !== 'ngo' && (
                    <div className={styles.headerButtons}>
                        <IconButton
                            color="primary"
                            aria-label="grid view"
                            onClick={() => setOpenAddModal(true)}>
                            <AddIcon />
                        </IconButton>
                    </div>
                )}
                <div className={styles.pendingActions}>
                    {actions.map((act) => (
                        <ActionCard type="onGoing" key={act._id} action={act} />
                    ))}
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
