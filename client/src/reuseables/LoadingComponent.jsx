import styled from 'styled-components';
import Loading from '../assets/loading.svg';
import { Centering } from '../pages/Login';

export const LoadingIconWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  ${Centering}
  z-index: 2;
  backdrop-filter: blur(4px);
`;

export const LoadingIcon = styled.img`
  width: 50%;
  height: 50%;
  @media screen and (max-width: 990px) {
    width: 70%;
    height: 70%;
  }
`;

const LoadingComponent = () => {
  return (
    <LoadingIconWrapper>
      <LoadingIcon src={Loading} />
    </LoadingIconWrapper>
  );
};

export default LoadingComponent;
