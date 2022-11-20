import React, { useEffect, useState } from 'react';
import { CardCarousel } from 'components/CardCarousel/CardCarousel';
import * as S from './Dashboard.styles';
import { PageContainer } from 'components/page-container/PageContainer';
import _ from 'lodash';
import axios from 'axios';

import './Dashboard.scss';

export const Dashboard = (props) => {
    console.log(props);
    const [ownEvents, setOwnEvents] = useState([]);
    const [locationEvents, setLocationEvents] = useState([]);
    const [eventsToBeReviewed, setEventsToBeReviewed] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
            .get('/event/search?owned=true?active=true', {
                withCredentials: true
            })
            .then((res) => {
                setOwnEvents(res.data.events);
            })
            .finally(() => setIsLoading(false));

        axios
            .get('/event/search', { withCredentials: true })
            .then((res) => {
                setLocationEvents(res.data.events);
            })
            .finally(() => setIsLoading(false));
        axios
            .get('/event/search?owned=true&notRated=true', {
                withCredentials: true
            })
            .then((res) => {
                setEventsToBeReviewed(res.data.events);
            })
            .finally(() => setIsLoading(false));
    }, []);
    return (
        <div className="dashboard-container">
            <PageContainer>
                <S.DashboardContainer>
                    <S.TitleContainer>
                        <S.Title variant="h6" color="text.primary">
                            Dashboard
                        </S.Title>
                    </S.TitleContainer>
                    {!isLoading && (
                        <CardCarousel
                            title={'Upcoming events'}
                            events={ownEvents}
                        />
                    )}
                    {_.get(user, 'type') === 'user' && (
                        <div>
                            {!isLoading && (
                                <div style={{ height: 'fit-content' }}>
                                    <CardCarousel
                                        title={'Events in your area'}
                                        events={locationEvents}
                                        canJoin
                                    />
                                    <CardCarousel
                                        title={'Events that need your feedback'}
                                        events={eventsToBeReviewed}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </S.DashboardContainer>
            </PageContainer>
        </div>
    );
};
