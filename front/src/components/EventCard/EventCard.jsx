import React from 'react';
import * as S from './EventCard.styles.tsx';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

export const EventCard = ({
    eventData,
    renderFirstCTA = null,
    renderSecondCTA = null
}) => {
    const navigate = useNavigate();
    const { description, pictures, title, owner, partners, timestampStart } =
        eventData;
    const host = owner[0]?.name;
    const image = pictures[0];
    const partnerCount = partners?.length;
    const timestamp = timestampStart;

    const navigateToEvent = () => {
        navigate('/event', {
            state: { event: eventData }
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
                                {(timestamp &&
                                    moment(timestamp).format(
                                        'DD-MM-YYYY HH:mm'
                                    )) ||
                                    'Maine la 6'}
                            </>
                        )}
                    </S.CardAction>
                    <S.CardAction>
                        {renderSecondCTA ? renderSecondCTA() : null}
                    </S.CardAction>
                </S.CardActions>
            </S.CardContentContainer>
        </S.Card>
    );
};
