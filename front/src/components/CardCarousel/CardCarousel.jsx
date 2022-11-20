import React from 'react';
import * as S from './CardCarousel.styles.jsx';
import { EventCard } from 'components/EventCard/EventCard';

export const CardCarousel = ({ items, title }) => {
    return (
        <S.CardCarouselContainer>
            <S.TitleContainer>
                <S.Title variant="h7" color="text.primary">
                    {title || 'TITLU CEL MAI BUN'}
                </S.Title>
            </S.TitleContainer>
            <S.SliderContainer>
                <EventCard renderFirstCTA={() => <>Hello</>} />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
            </S.SliderContainer>
        </S.CardCarouselContainer>
    );
};
