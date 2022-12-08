import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Robot from '../assets/robot.gif';
import { Centering } from '../pages/Login';

const WelcomeContainer = styled.div`
  width: 100%;
  height: 90%;
  ${Centering}
  flex-direction: column;
  text-align: center;
`;

const WelcomeLogo = styled.img`
  width: 50%;
  height: 50%;
  @media screen and (max-width: 479px) {
    width: 100%;
    height: 70%;
  }
`;

const WelcomeText = styled.p`
  font-size: 5vh;
  @media screen and (max-width: 479px) {
    font-size: 3.5vh;
  }
`;

const UserName = styled.span`
  color: #997af0;
`;

const WelcomeSubText = styled.p`
  font-family: 'Nexa', sans-serif;
  font-size: 3.5vh;
  @media screen and (max-width: 479px) {
    font-size: 2vh;
  }
`;

const Welcome = ({ currentUser }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.userName);
    }
  }, [currentUser]);
  return (
    <WelcomeContainer>
      <WelcomeLogo src={Robot} />
      <WelcomeText>
        Hello! <UserName>{currentUserName}</UserName>
      </WelcomeText>
      <WelcomeSubText>
        Please select a chat to gist with friends!
      </WelcomeSubText>
    </WelcomeContainer>
  );
};

export default Welcome;
