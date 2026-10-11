import { getData } from '@/services/dados.js'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import SectionCard from '@/Components/SectionCard'
import NameWrapper from '@/Components/NameWraper'

const TaskHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 10px;
  font-weight: bold;
  text-align: left;
  gap: 15px;
  border-bottom: 1px solid #e0e0e0;

  .task-title{
    width: 350px;
  }

  .task-status{
    width: 150px;
  }

  @media (max-width: 480px) {
    display: none;
  }
`
const TaskList = styled.ul`
  flex-direction: column;

  li{
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #e0e0e0;
    padding: 7px 0;
    gap: 15px;
    align-items: center;
  }

  .task-title{
    text-align: left;
    font-weight: 400;
    width: 350px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 480px) {
    /* overflow: display; */
    text-overflow: unset;
  }
`

export default function RecentTasks() {
  const [tasks, setTasks] = useState({ tasks: [] })

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getData()
        setTasks(result)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <SectionCard title="Tarefas Recentes" width='60%'>
      <TaskHeader>
        <p className="task-title">Tarefa</p>
        <p className="task-status">Status</p>
        <p className="task-priority">Prioridade</p>
      </TaskHeader>
      <TaskList>
        {tasks.tasks.slice(-5).reverse().map((task) => (
          <li key={task.id}>
            <p className="task-title">{task.titulo}</p>
            <NameWrapper width='150px' name={task.status} />
            <NameWrapper name={task.prioridade} />
          </li>
        ))}
      </TaskList>
    </SectionCard>

  )
}