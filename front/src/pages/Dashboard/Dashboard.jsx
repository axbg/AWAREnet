import React, { useEffect } from 'react';
import { CardCarousel } from 'components/CardCarousel/CardCarousel';
import * as S from './Dashboard.styles';
import { useGlobalContext } from 'global-context';
import { PageContainer } from 'components/page-container/PageContainer';

export const Dashboard = () => {
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
                <S.Grid container>
                    <CardCarousel title={'Past events'} />
                </S.Grid>
            </S.DashboardContainer>
        </PageContainer>
    );
};
