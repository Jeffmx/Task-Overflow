import styled from 'styled-components'
import Display from '@/Components/Display'
import RecentTasks from '@/Components/RecentsTasks'
import RecentProjects from '@/Components/RecentsProjects'
import TittleHolder from '@/Components/TittleHolder'
import MenuMobile from '@/Components/MenuMobile'
import complete from '@/assets/complete.svg'
import progress from '@/assets/progress.svg'
import pending from '@/assets/pending.svg'
import total from '@/assets/total.svg'

const DashboardContainer = styled.section`
  display: flex;
  flex-direction: column;
`
const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-bottom: 20px;
  justify-content: center;
  gap: 20px;

  @media (max-width: 1300px) {
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
const Activity = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 20px;
  background-color: var(--container-color);
  border-radius: 8px;
  padding: 25px;
`

export default function Dashboard() {
  return (
    <DashboardContainer>
      <TittleHolder
        title="Dashboard"
        desc="Visão geral do seu trabalho em um só lugar."
      >
        <MenuMobile/>
      </TittleHolder>
      <StatsContainer>
        <Display
          title="Total de Tarefas"
          value="18"
          img={total}
        />
        <Display
          title="Pendentes"
          value="3"
          img={pending}
        />
        <Display
          title="Em Progresso"
          value="6"
          img={progress}
        />
        <Display
          title="Concluídas"
          value="9"
          img={complete}
        />
      </StatsContainer>
      <RecentAtivity>
        <RecentTasks />
        <RecentProjects />
      </RecentAtivity>
      <Activity>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Atividade Recente</h2>
          <button>Ver Todas</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p>Design da Página Inicial"</p>
          </div>
        </div>
      </Activity>
    </DashboardContainer>
  )
}