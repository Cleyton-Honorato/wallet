import React from 'react';
import {
  MdDashboard,
  MdArrowDownward,
  MdArrowUpward,
  MdExitToApp,
} from 'react-icons/md'

import logo from '../../assets/logo.svg';
import { Container, Header, LogoImg, MenuContainer, MenuItem, Title } from './styles'

const Aside: React.FC = () => {
  return (
    <Container>
      <Header>
        <LogoImg src={logo} alt="logo" />
        <Title>Minha Carteira</Title>
      </Header>

      <MenuContainer>
        <MenuItem href='/dashboard'>
          <MdDashboard />
          Dashboard
        </MenuItem>

        <MenuItem href='/list/entry-balance'>
          <MdArrowDownward />
          Entradas
        </MenuItem>

        <MenuItem href='/list/exit-balance'>
          <MdArrowUpward />
          Saídas
        </MenuItem>

        <MenuItem href='#'>
          <MdExitToApp />
          Sair
        </MenuItem>
      </MenuContainer>
    </Container>
  )
}

export default Aside;