import { useState } from 'react'
import menu from '@/assets/menu.svg'
import styled from 'styled-components'

const ButtonStyled = styled.button`
  border: none;
  display: none;
  cursor: pointer;
  background: var(--background-color);

  @media (max-width: 770px) {
    display: block;
  }
`

export default function MenuMobile() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <ButtonStyled onClick={() => setMenuOpen(!menuOpen)}>
      <img src={menu} width={40} alt="Menu" />
    </ButtonStyled>
  )
}