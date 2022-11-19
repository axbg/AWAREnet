import React from 'react';
import { CardCarousel } from 'components/CardCarousel/CardCarousel';
import * as S from './Dashboard.styles';

export const Dashboard = () => {
    return (
        <S.DashboardContainer>
            <S.Grid container>
                <CardCarousel title={'BINE IOANA'} />
            </S.Grid>
        </S.DashboardContainer>
    );
};
