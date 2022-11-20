import React, { useState, useEffect } from 'react';
import * as S from './EventHistory.styles.jsx';
import { EventCard } from 'components/EventCard/EventCard';
import { PageContainer } from 'components/page-container/PageContainer.js';
import axios from 'axios';

export const EventHistory = () => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
            .get('/event/search?active=false', { withCredentials: true })
            .then((res) => {
                console.log('BAU', res.data.events);
                setEvents(res.data.events);
            })
            .finally(() => setIsLoading(false));
    }, []);
    return (
        <PageContainer>
            <S.EventHistory>
                <S.TitleContainer>
                    <S.Title variant="h6" color="text.primary">
                        Events History
                    </S.Title>
                </S.TitleContainer>
                <S.ListContainer>
                    {!isLoading &&
                        events.map((ev) => {
                            return <EventCard eventData={ev} key={ev._id} />;
                        })}
                </S.ListContainer>
            </S.EventHistory>
        </PageContainer>
    );
};
