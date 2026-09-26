import styled from 'styled-components'
import Display from '@/Components/Display'
import RecentTasks from '@/Components/RecentsTasks'
import RecentProjects from '@/Components/RecentsProjects'
import TittleHolder from '@/Components/TittleHolder'
import complete from '@/assets/complete.svg'
import progress from '@/assets/progress.svg'
import pending from '@/assets/pending.svg'
import tasks from '@/assets/tasks.svg'

const DashboardContainer = styled.section`
  display: flex;
  flex-direction: column;
`
const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 270px);
  margin-bottom: 20px;
  justify-content: center;
  gap: 20px;

  @media (max-width: 1440px) {
    grid-template-columns: repeat(2, 270px);
  }

  @media (max-width: 760px) {
    grid-template-columns: repeat(1, 270px);
  }
`
const RecentAtivity = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;

  @media (max-width: 480px) {
    justify-content: center;
  }
`

export default function Dashboard() {
  return (
    <DashboardContainer>
      <TittleHolder
        title="Dashboard"
        button={<button> <p>Adicionar Tarefa</p> </button>}
      />
      <StatsContainer>
        <Display
          title="Total Tarefas"
          value="18"
          img={tasks}
        />
        <Display
          title="Concluídas"
          value="9"
          img={complete}
        />
        <Display
          title="Em Progresso"
          value="6"
          img={progress}
        />
        <Display
          title="Pendentes"
          value="3"
          img={pending}
        />
      </StatsContainer>
      <RecentAtivity>
        <RecentTasks />
        <RecentProjects />
      </RecentAtivity>
    </DashboardContainer>
  )
}