import React, { useState } from 'react';
import * as S from './EventHistory.styles.jsx';
import { EventCard } from 'components/EventCard/EventCard';
import { PageContainer } from 'components/page-container/PageContainer.js';
import { useEffect } from 'react';
import axios from 'axios';
import { Chip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

export const EventHistory = () => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        axios
            .get('/event/search?active=false')
            .then((res) => setEvents(res.data.events))
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
                        events.map((ev, index) => (
                            <EventCard key={index} eventData={ev} />
                        ))}
                    {!isLoading && !events.length && (
                        <Chip icon={<InfoIcon />} label="No past events" />
                    )}
                </S.ListContainer>
            </S.EventHistory>
        </PageContainer>
    );
};
