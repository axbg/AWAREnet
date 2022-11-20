import React, { useEffect } from 'react';
import { CardCarousel } from 'components/CardCarousel/CardCarousel';
import * as S from './Dashboard.styles';
import { useGlobalContext } from 'global-context';
import { PageContainer } from 'components/page-container/PageContainer';
import _ from 'lodash';

export const Dashboard = (props) => {
    ///event/search?active=true&owned=true
    console.log(props);
    return (
        <PageContainer>
            <S.DashboardContainer>
                <S.TitleContainer>
                    <S.Title variant="h6" color="text.primary">
                        Dashboard
                    </S.Title>
                </S.TitleContainer>
                <S.Grid container>
                    <CardCarousel title={'Upcomming events'} />
                </S.Grid>
                {!_.get(props, 'type') === 'company' &&
                    _.get(props, 'type') === 'ngo' && (
                        <S.Grid container>
                            <CardCarousel title={'Events in your area'} />
                        </S.Grid>
                    )}
            </S.DashboardContainer>
        </PageContainer>
    );
};
