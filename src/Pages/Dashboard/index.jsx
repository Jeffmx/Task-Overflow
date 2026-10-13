import styled from 'styled-components'
import Display from '@/Components/Display'
import RecentTasks from '@/Components/RecentsTasks'
import RecentProjects from '@/Components/RecentsProjects'
import TittleHolder from '@/Components/TittleHolder'
import MenuMobile from '@/Components/MenuMobile'
import Activity from '@/Components/Activity'
import complete from '@/assets/complete.svg'
import progress from '@/assets/progress.svg'
import pending from '@/assets/pending.svg'
import total from '@/assets/total.svg'
import { useState, useEffect } from 'react'
import { useDados } from '@/Hooks/useDados.js'

const DashboardContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  justify-items: center;
  margin-bottom: 20px;
  gap: 20px;

  @media (max-width: 1300px) {
    grid-template-columns: repeat(2, 270px);
  }

  @media (max-width: 760px) {
    justify-items: center;
    grid-template-columns: repeat(1, 1fr);
  }
`
const RecentAtivity = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;

  @media (max-width: 1300px) {
    flex-direction: column;
  }

  @media (max-width: 480px) {
    justify-content: center;
  }
`
const Status = [
  { name: 'Total', img: total, key: 'total' },
  { name: 'Pendentes', img: pending, key: 'pendente' },
  { name: 'Em Andamento', img: progress, key: 'em_andamento' },
  { name: 'Concluídas', img: complete, key: 'concluida' },
]

export default function Dashboard() {
  const {data} = useDados()
  const [count, setCount] = useState({
    total: 0,
    pendente: 0,
    em_andamento: 0,
    concluida: 0
  });  

  useEffect(() => {
    async function loadCount() {
      const tasks = data.tasks
      setCount({
        total: tasks.length,
        pendente: tasks.filter(task => task.status === 'Pendente').length,
        em_andamento: tasks.filter(task => task.status === 'Em Andamento').length,
        concluida: tasks.filter(task => task.status === 'Concluída').length
      })
    }
    loadCount()
  }, [data]);  

  return (
    <DashboardContainer>
      <TittleHolder
        title="Dashboard"
        desc="Visão geral do seu trabalho em um só lugar."
      >
        <MenuMobile />
      </TittleHolder>
      <StatsContainer>
        {Status.map((stat) => (
          <Display
            key={stat.key}
            title={stat.name}
            value={count[stat.key]}
            img={stat.img}
          />
        ))}
      </StatsContainer>
      <RecentAtivity>
        <RecentTasks />
        <RecentProjects />
      </RecentAtivity>
      <Activity/>
    </DashboardContainer>
  )
}