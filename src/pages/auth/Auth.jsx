import { Container, Group, Paper, Text, Button } from '@mantine/core'
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PATH } from '../../consts';
import Login from './LoginForm';
import RegistrationForm from './RegistrationForm';
import { api } from '../../api';
import './Auth.css';
import { theme } from '../../index';

const Nav = ({isRegistration}) => {
  const navigate = useNavigate();
  return (
    <Group grow justify='space-between' gap={0}>
      <Button
        style={{width: '50%'}}
        size='md'
        radius={0}
        color={!isRegistration ? 'red' : theme.colors.button[0]}
        onClick={() => navigate(PATH.LOGIN)}
      >Логин</Button>
      <Button 
        style={{width: '50%'}}
        size='md' 
        radius={0}
        color={isRegistration ? 'red' : theme.colors.button[0]}
        onClick={() => navigate(PATH.REGISTRATION)}
      >Регистрация</Button>
    </Group>
  );

}


const Auth = () => {

  const path = useLocation().pathname;
  const navigate = useNavigate();
  const navigateTo = () => navigate('/home')

  const login = (data) =>
    api.auth.postLogin(data, navigateTo);
  const registration = (data) =>
    api.auth.postRegistration(data, navigateTo);

  return (
    <div /*className='bg'*/>
      <div>
      <Container size={620} my={40} mt='250px' p={0} className='container-shadow' style={{backgroundColor: 'white'}}>
          <Nav isRegistration={path === PATH.REGISTRATION}/>
          <br/>
          <Container style={{backgroundColor: 'white'}}>
            <div style={{width: '100%'}}>
              {path === PATH.LOGIN && <Login submit={login}/>}
              {path === PATH.REGISTRATION && <RegistrationForm submit={registration}/>}
            </div>
          </Container>
      </Container>
      </div>
    </div>
  )
}

export default Auth