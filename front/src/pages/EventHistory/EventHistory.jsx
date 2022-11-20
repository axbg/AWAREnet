import React from 'react';
import * as S from './EventHistory.styles.jsx';
import { EventCard } from 'components/EventCard/EventCard';

export const EventHistory = () => {
    return (
        <S.EventHistory>
            <S.TitleContainer>
                <S.Title variant="h3" color="text.primary">
                    Events History
                </S.Title>
            </S.TitleContainer>
            <S.ListContainer>
                <EventCard />
                <EventCard />
                <EventCard />
            </S.ListContainer>
        </S.EventHistory>
    );
};
