import React, { useState } from 'react';
import * as S from './EventCard.styles.tsx';
import { useNavigate } from 'react-router-dom';

export const EventCard = ({
    id,
    title,
    description,
    image,
    host,
    partnerCount,
    timestamp,
    location,
    renderFirstCTA = null,
    renderSecondCTA = null
}) => {
    const navigate = useNavigate();
    const [event] = useState({ eventId: 1 });

    const navigateToEvent = () => {
        navigate('/event', {
            state: { event: event }
        });
    };
    return (
        <S.Card variant="outlined" onClick={() => navigateToEvent()}>
            <S.CardMedia
                component="img"
                image={
                    image ||
                    'https://cdn.thezebra.com/zfront/media/production/images/hero-sustainable-cities-new-york-city-skylin.format-jpeg.jpg'
                }
            />
            <S.CardContentContainer>
                <S.CardContent>
                    <S.Typography gutterBottom component="div" variant="h5">
                        {title || 'Title'}
                    </S.Typography>
                    <S.Typography variant="body1" color="text.primary">
                        {description || 'Short description'}
                    </S.Typography>
                    <S.Typography
                        variant="body2"
                        color="text.secondary"
                        className="host">
                        Hosted by {host || 'NGO'} and {partnerCount || '0'}{' '}
                        partner(s)
                    </S.Typography>
                </S.CardContent>
                <S.CardActions>
                    <S.CardAction>
                        {renderFirstCTA ? (
                            renderFirstCTA()
                        ) : (
                            <>
                                <S.CalendarMonth />
                                {timestamp || 'Maine la 6'}
                            </>
                        )}
                    </S.CardAction>
                    <S.CardAction>
                        {renderSecondCTA ? (
                            renderSecondCTA()
                        ) : (
                            <>
                                <S.Place />
                                {location || 'Unirii'}
                            </>
                        )}
                    </S.CardAction>
                </S.CardActions>
            </S.CardContentContainer>
        </S.Card>
    );
};
