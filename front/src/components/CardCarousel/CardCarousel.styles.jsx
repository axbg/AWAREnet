import styled from "@emotion/styled";

export const CardCarouselContainer = styled('div')`
    width: 100%;
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
