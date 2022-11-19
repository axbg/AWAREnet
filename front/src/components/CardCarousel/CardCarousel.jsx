import React from 'react';
import * as S from './CardCarousel.styles.jsx';
import { EventCard } from 'components/EventCard/EventCard';


export const CardCarousel = ({ title }) => {
    return (
        <S.CardCarouselContainer>
            <EventCard/>
        </S.CardCarouselContainer>
    );
};
