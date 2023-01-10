import React, { useMemo } from 'react';

import emojis from '../../utils/emojis';

import ThemeToggleButton from '../ThemeToggleButton';

import { Container, Profile, UserName, Welcome } from './styles'

const MainHeader: React.FC = () => {
  const emoji = useMemo(() => {
    const indice = Math.floor(Math.random() * emojis.length);

    return emojis[indice];
  }, [])

  return (
    <Container>
      <ThemeToggleButton />

      <Profile>
        <Welcome>Olá, {emoji}</Welcome>
        <UserName>Cleyton Honorato</UserName>
      </Profile>
    </Container>
  )
}

export default MainHeader;