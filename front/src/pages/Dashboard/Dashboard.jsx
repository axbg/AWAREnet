import React, { useEffect, useState } from 'react';
import { CardCarousel } from 'components/CardCarousel/CardCarousel';
import * as S from './Dashboard.styles';
import { PageContainer } from 'components/page-container/PageContainer';
import _ from 'lodash';
import axios from 'axios';

export const Dashboard = (props) => {
    ///event/search?active=true&owned=true
    console.log(props);
    const [ownEvents, setOwnEvents] = useState([]);
    const [locationEvents, setLocationEvents] = useState([]);
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
    }, []);
    return (
        <PageContainer>
            <S.DashboardContainer>
                <S.TitleContainer>
                    <S.Title variant="h6" color="text.primary">
                        Dashboard
                    </S.Title>
                </S.TitleContainer>
                <S.Grid container>
                    {!isLoading && (
                        <CardCarousel
                            title={'Upcomming events'}
                            events={ownEvents}
                        />
                    )}
                </S.Grid>
                {_.get(user, 'type') === 'user' && (
                    <S.Grid container>
                        {!isLoading && (
                            <CardCarousel
                                title={'Events in your area'}
                                events={locationEvents}
                            />
                        )}
                    </S.Grid>
                )}
            </S.DashboardContainer>
        </PageContainer>
    );
};
