import styled from 'styled-components'
import { Link } from 'react-router-dom'

const AsideStyled = styled.aside`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100vh;
  background-color: #f5f5f5;
`

export default function SideBar() {
  return (
    <AsideStyled>
      <Link to="/">Dashboard</Link>
      <Link to="/tasks">Tasks</Link>
      <Link to="/projects">Projects</Link>
    </AsideStyled>
  )
}