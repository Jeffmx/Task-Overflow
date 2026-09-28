import { useState } from 'react'
import menu from '@/assets/menu.svg'
import styled from 'styled-components'

const ButtonStyled = styled.button`
  border: none;
  cursor: pointer;
`

export default function MenuMobile() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <ButtonStyled onClick={() => setMenuOpen(!menuOpen)}>
      <img src={menu} width={40} alt="Menu" />
    </ButtonStyled>
  )
}