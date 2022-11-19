import styled from "@emotion/styled";
import {
    Typography
} from '@mui/material';

export const CardCarouselContainer = styled('div')`
    width: 100%;
`;

export const TitleContainer = styled('div')`

`;

export const Title = styled(Typography)`
`;

export const SliderContainer = styled('div')`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 1rem;

  &::-webkit-scrollbar {
  display: none;
}
`

