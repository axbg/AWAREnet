import React, { useEffect } from 'react';
import { CardCarousel } from 'components/CardCarousel/CardCarousel';
import * as S from './Dashboard.styles';
import { useGlobalContext } from 'global-context';
import { PageContainer } from 'components/page-container/PageContainer';

export const DashboardNGO = () => {
    ///event/search?active=true&owned=true

    return (
        <PageContainer>
            <S.DashboardContainer>
                <S.TitleContainer>
                    <S.Title variant="h6" color="text.primary">
                        Dashboard
                    </S.Title>
                </S.TitleContainer>
                <S.Grid container>
                    <CardCarousel title={'My upcomming events'} />
                </S.Grid>
            </S.DashboardContainer>
        </PageContainer>
    );
};
