import styled from 'styled-components'
import Display from '@/Components/Display'
import complete from '@/assets/complete.svg'
import tasks from '@/assets/tasks.svg'
import pending from '@/assets/pending.svg'
import progress from '@/assets/progress.svg'

const TittleHolder = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background-color: #f5f5f5;
`

const DashboardContainer = styled.section`
  display: flex;
  flex-direction: column;
`

export default function Dashboard() {
  return (
    <DashboardContainer>
      <TittleHolder>
        <h1>Dashboard</h1>
        <button>Add Task</button>
      </TittleHolder>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Display
          title="Total Tasks"
          value="18"
          img={tasks}
        />
        <Display
          title="Completed"
          value="9"
          img={complete}
        />
        <Display
          title="In Progress"
          value="6"
          img={progress}
        />
        <Display
          title="Pending"
          value="3"
          img={pending}
        />
      </div>
      <div>
        <h2>Recent Tasks</h2>
        <ul>
          <li>Task 1</li>
          <li>Task 2</li>
          <li>Task 3</li>
        </ul>
      </div>
      <div>
        <div>
          <h2>Projects</h2>
          <ul>
            <li>Project 1</li>
            <li>Project 2</li>
            <li>Project 3</li>
          </ul>
        </div>
      </div>
    </DashboardContainer>
  )
}