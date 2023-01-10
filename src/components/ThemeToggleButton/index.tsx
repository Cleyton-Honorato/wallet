import React from 'react'

import { Container, ToggleLabel, ToggleSelect } from './styles';

const ThemeToggleButton: React.FC = () => {
  return (
    <Container>
      <ToggleLabel>Light</ToggleLabel>
      <ToggleSelect
        checked={false}
        checkedIcon={false}
        uncheckedIcon={false}
        onChange={() => {}}
      />
      <ToggleLabel>Dark</ToggleLabel>
    </Container>
  )
}

export default ThemeToggleButton