import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { Divider, Button } from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import styles from './Event.module.scss';
import { AddRequestModal } from 'pages/request/components/add-request-modal/AddRequestModal';
import moment from 'moment';
import { PageContainer } from 'components/page-container/PageContainer';

export const Event = (props) => {
    const [isUser] = useState(false);
    const [isOpen, setOpenModal] = useState(false);
    const [event] = useState({});
    const { state } = useLocation();
    const currentEvent = state.event;
    const {
        description,
        shortDescription,
        partners,
        owner,
        timestampCreated,
        title,
        pictures,
        type
    } = currentEvent;
    console.log(currentEvent, 'currentEv');
    const user = JSON.parse(localStorage.getItem('user'));

    const JoinAsPartner = () => {
        return (
            user.type === 'company' && (
                <div className={styles.partner}>
                    <Button
                        variant="outlined"
                        onClick={() => setOpenModal(true)}>
                        Join as partner
                    </Button>
                    <Divider classes={{ root: styles.divider }} />
                </div>
            )
        );
    };
    return (
        <PageContainer>
            <div className={styles.eventsContainer}>
                <img
                    className={styles.eventsImg}
                    src={pictures[0]}
                    alt="Card cap"
                    style={{ objectFit: 'contain' }}
                />
                <div className={styles.subcontent}>
                    <div className={styles.heading}>
                        <span>{`${type}: ${title}`}</span>
                        {isUser && <Button variant="outlined">Join</Button>}
                    </div>
                    <span>
                        Powered by{' '}
                        <strong>{`${owner?.name} & ${partners
                            .map((partner) => partner.name)
                            .join('& ')}`}</strong>
                    </span>
                    <Divider classes={{ root: styles.divider }} />
                    {JoinAsPartner()}
                    <div className={styles.infoContainer}>
                        <div className={styles.dateContainer}>
                            <CalendarMonthOutlinedIcon />
                            <div className={styles.time}>
                                <span>
                                    {moment(timestampCreated).format(
                                        'DD/MM/YYYY'
                                    )}
                                </span>
                                <span>
                                    <strong>
                                        {moment(timestampCreated).format(
                                            'HH:mm'
                                        )}
                                    </strong>
                                </span>
                            </div>
                        </div>
                        <div className={styles.dateContainer}>
                            <LocationOnOutlinedIcon />
                            <div className={styles.time}>
                                <span>Bucharest</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.descriptionContainer}>
                        <span>
                            <strong>Description</strong>
                        </span>
                        <span>{description}</span>
                    </div>
                </div>
                {isOpen && (
                    <AddRequestModal
                        isOpen={isOpen}
                        handleClose={() => setOpenModal(false)}
                        event={event}
                    />
                )}
            </div>
        </PageContainer>
    );
};
