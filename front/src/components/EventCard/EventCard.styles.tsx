import styled from 'styled-components';

import {
    Card as MuiCard,
    CardActions as MuiCardActions,
    CardContent as MuiCardContent,
    CardMedia as MuiCardMedia,
    Typography as MuiTypography
} from '@mui/material';
import { CalendarMonth as MuiCalendarMonth } from '@mui/icons-material';
import { Place as MuiPlace } from '@mui/icons-material';

export const Card = styled(MuiCard)`
    flex: 0 0 auto;
    border: 2px solid black !important;
    border-radius: 10px !important;
    max-width: 400px;
    width: 100%;

    &:hover {
        cursor: pointer;
    }

    @media screen and (max-width: 450px) {
        width: 350px;
    }
`;

export const CardContentContainer = styled('div')`
    height: 55%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const CardActions = styled(MuiCardActions)`
    height: 4rem;
    padding: 0 !important;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const CardContent = styled(MuiCardContent)``;

export const CardMedia = styled(MuiCardMedia)`
    height: 200px;
`;
export const Typography = styled(MuiTypography)`
    &.host {
        font-style: italic;
    }
`;
export const CalendarMonth = styled(MuiCalendarMonth)``;
export const Place = styled(MuiPlace)``;

export const CardAction = styled('div')`
    padding-left: 0.5rem;
    height: 100%;
    width: 50%;
    border: 0.5px solid #ccc;
    display: flex;
    align-items: center;
    margin: 0 !important;

    &:nth-child(2) {
        margin-left: 0;
        border-left: none;
    }
`;
