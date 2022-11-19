import React from 'react';
import * as S from './EventCard.styles.tsx';

export const EventCard = ({
    title,
    description,
    image,
    host,
    partnerCount,
    timestamp,
    location
}) => {
    return (
        <S.Card variant="outlined">
            <S.CardMedia
                component="img"
                image={
                    image ||
                    'https://cdn.thezebra.com/zfront/media/production/images/hero-sustainable-cities-new-york-city-skylin.format-jpeg.jpg'
                }
            />
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
                    <S.CalendarMonth />
                    {timestamp || 'Maine la 6'}
                </S.CardAction>
                <S.CardAction>
                    <S.Place />
                    {location || 'Unirii'}
                </S.CardAction>
            </S.CardActions>
        </S.Card>
    );
};
