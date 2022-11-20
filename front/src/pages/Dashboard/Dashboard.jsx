import React from 'react';
import { CardCarousel } from 'components/CardCarousel/CardCarousel';
import * as S from './Dashboard.styles';

export const Dashboard = () => {
    return (
        <S.DashboardContainer>
            <S.TitleContainer>
                <S.Title variant="h3" color="text.primary">
                    Dashboard
                </S.Title>
            </S.TitleContainer>
            <S.Grid container>
                <CardCarousel title={'BINE IOANA'} />
            </S.Grid>
        </S.DashboardContainer>
    );
};
