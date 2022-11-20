import React from 'react';
import * as S from './CardCarousel.styles.jsx';
import { EventCard } from 'components/EventCard/EventCard';
import { NoData } from 'components/no-data/NoData.jsx';

export const CardCarousel = ({ events, title }) => {
    console.log(events);
    return (
        <S.CardCarouselContainer>
            <S.TitleContainer>
                <S.Title variant="h7" color="text.primary">
                    {title || 'TITLU CEL MAI BUN'}
                </S.Title>
            </S.TitleContainer>
            <S.SliderContainer>
                {events.length === 0 ? (
                    <NoData />
                ) : (
                    events.map((ev) => {
                        return <EventCard eventData={ev} key={ev._id} />;
                    })
                )}
            </S.SliderContainer>
        </S.CardCarouselContainer>
    );
};
