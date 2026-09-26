import styled from 'styled-components'
import { Link } from 'react-router-dom'

const SideStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;

  @media (max-width: 770px) {
    width: 100%;
    height: 50px;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
    background-color: var(--main-color);
  }
`

export default function SideBar() {
  return (
    <SideStyled>
      <Link to="/"> <p>Dashboard</p> </Link>
      <Link to="/tasks"> <p>Tarefas</p> </Link>
      <Link to="/projects"> <p>Projetos</p> </Link>
    </SideStyled>
  )
}