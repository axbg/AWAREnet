import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Divider, Button } from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import styles from './Event.module.scss';
import { AddRequestModal } from 'pages/request/components/add-request-modal/AddRequestModal';
import moment from 'moment';
import { PageContainer } from 'components/page-container/PageContainer';
import { ReviewEventModal } from './review-event-modal/ReviewEventModal';
import { isEmpty } from 'lodash';
import axios from 'axios';

export const Event = () => {
    const [isUser] = useState(false);
    const [isOpen, setOpenModal] = useState(false);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [event] = useState({});
    const { state } = useLocation();
    const currentEvent = state.event;
    const {
        description,
        partners,
        owner,
        timestampStart,
        title,
        pictures,
        type,
        participants
    } = currentEvent;
    console.log(currentEvent, 'currentEv');
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const participateToEvent = () => {
        axios
            .post(
                '/event/join',
                { id: currentEvent._id },
                { withCredentials: true }
            )
            .then((res) => console.log(res))
            .finally(() => navigate('/dashboard'));
    };

    const JoinEvent = () => {
        return (
            user.type === 'user' &&
            moment().utc().valueOf() < parseInt(timestampStart) &&
            isEmpty(
                participants.find((participant) => participant === user.userId)
            ) && (
                <div className={styles.partner}>
                    <Button variant="outlined" onClick={participateToEvent}>
                        Join Event
                    </Button>
                    <Divider classes={{ root: styles.divider }} />
                </div>
            )
        );
    };

    const RateEvent = () => {
        return (
            user.type === 'user' &&
            moment().utc().valueOf() > parseInt(timestampStart) && (
                <div className={styles.partner}>
                    <Button
                        variant="outlined"
                        onClick={() => setIsReviewModalOpen(true)}>
                        Review Event
                    </Button>
                    <Divider classes={{ root: styles.divider }} />
                </div>
            )
        );
    };

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
                    {RateEvent()}
                    {JoinEvent()}
                    <div className={styles.infoContainer}>
                        <div className={styles.dateContainer}>
                            <CalendarMonthOutlinedIcon />
                            <div className={styles.time}>
                                <span>
                                    {moment(timestampStart).format(
                                        'DD/MM/YYYY'
                                    )}
                                </span>
                                <span>
                                    <strong>
                                        {moment(timestampStart).format('HH:mm')}
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
                        // action={action}
                    />
                )}
                {isReviewModalOpen && (
                    <ReviewEventModal
                        isOpen={isReviewModalOpen}
                        handleClose={() => setIsReviewModalOpen(false)}
                        event={event}
                    />
                )}
            </div>
        </PageContainer>
    );
};
