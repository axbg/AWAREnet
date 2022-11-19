import React from "react";
import { CardCarousel } from "components/CardCarousel/CardCarousel";
import * as S from './Dashboard.styles';

export const Dashboard = () => {
    return <S.DashboardContainer>
        <S.Grid container p={4}>

        <CardCarousel title={"BINE IOANA"}/>
        </S.Grid>
    </S.DashboardContainer>
}