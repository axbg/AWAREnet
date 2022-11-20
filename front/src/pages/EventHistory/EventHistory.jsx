import React from 'react';
import * as S from './EventHistory.styles.jsx';
import { EventCard } from 'components/EventCard/EventCard';
import { PageContainer } from 'components/page-container/PageContainer.js';

export const EventHistory = () => {
    return (
        <PageContainer>
            <S.EventHistory>
                <S.TitleContainer>
                    <S.Title variant="h6" color="text.primary">
                        Events History
                    </S.Title>
                </S.TitleContainer>
                <S.ListContainer>
                    <EventCard />
                    <EventCard />
                    <EventCard />
                </S.ListContainer>
            </S.EventHistory>
        </PageContainer>
    );
};
