import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import dashboard from '@/assets/dashboard.svg'
import projects from '@/assets/projects.svg'
import reports from '@/assets/reports.svg'
import tasks from '@/assets/tasks.svg'
import logo from '@/assets/logo.png'

const AsideStyled = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, .5);
  transition: .1s ease;

  a{
    color: var(--secondary-color);
    font-weight: bold;
  }

  @media (max-width: 770px) {
    z-index: 999;
    height: 100vh;
    position: absolute;
    transform: translateX(-360px);
    background: var(--container-color);
    box-shadow: rgba(0, 0, 0, .6) 90px 0px 20px 20px;
  }
`
const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const MenuLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &.active{
    background-color: var(--active-color);
  }

  img {
    margin-right: 10px;
  }

  p{
    color: var(--secondary-color);
  }
`
const links = [
  {path: '/', img: dashboard, name: 'Dashboard'},
  {path: '/tasks', img: tasks, name: 'Tarefas'},
  {path: '/projects', img: projects, name: 'Projetos'},
  {path: '/reports', img: reports, name: 'Relatório'},
]

export default function SideBar() {

  return (
    <AsideStyled>
      <MenuContainer>
        <img src={logo} alt='Task OverFlow' width="200" />
        {links.map((link) => (
          <MenuLink
            to={link.path}
          >
           <img src={link.img} alt={link.name} width={30}/> 
           <p>{link.name}</p>
          </MenuLink>
        ))}
      </MenuContainer>
      <p>Desenvolvido por <br /> <a href="https://github.com/jeffmx" target="_blank" rel="noopener noreferrer">Jeff MX</a> · 2026</p>
    </AsideStyled>
  )
}