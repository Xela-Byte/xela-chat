import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { BiPowerOff } from 'react-icons/bi';
import { Centering } from '../pages/Login';

const LogOutContainer = styled.div`
  width: 20%;
  height: 70%;
  ${Centering}
`;

const LogOutBtn = styled.div`
  position: relative;
  cursor: pointer;
  width: 40px;
  height: 40px;
  ${Centering}
  border-radius: 50%;
  color: #c2b0f5;
  background: #5314ff;
  font-size: 3vh;
  transition: 0.4s ease-in-out;
  p {
    left: 50px;
    top: -10px;
    display: none;
    position: absolute;
  }
  :hover {
    transition: 0.4s ease-in-out;
    p {
      display: block;
    }
  }
`;

const Logout = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    localStorage.clear();
    navigate('/login');
  };
  return (
    <LogOutContainer>
      <LogOutBtn>
        <BiPowerOff onClick={() => handleClick()} /> <p>LogOut!</p>
      </LogOutBtn>
    </LogOutContainer>
  );
};

export default Logout;
