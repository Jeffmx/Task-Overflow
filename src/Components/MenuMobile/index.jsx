import styled from 'styled-components'
import menu from '@/assets/menu.svg'
import { useMenu } from '@/Context/MenuContext'

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
  const {aberto, setAberto} = useMenu()

  return (
    <ButtonStyled onClick={(e) => { e.stopPropagation(); setAberto(!aberto) }}>
      <img src={menu} width={40} alt="Menu" />
    </ButtonStyled>
  )
}