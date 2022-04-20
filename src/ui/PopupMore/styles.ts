import styled from 'styled-components';
import { COLORS, PRIMARY } from '../../constants';

export const PopupMoreInner = styled.div`
  position: relative;
`;

export const CardMore = styled.button`
  width: 20px;
  height: 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Settings = styled.ul`
  position: absolute;
  top: 100%;
  left: 50%;
  z-index: 5;
  border-radius: ${PRIMARY.border};
  background-color: ${COLORS.alabaster};
  box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.25);
  transform: translateX(-50%);
  opacity: 0;
  visibility: hidden;
  transition: all ${PRIMARY.animation};
  transition-property: opacity, visibility;

  &.is-open {
    opacity: 1;
    visibility: visible;
  }
`;
