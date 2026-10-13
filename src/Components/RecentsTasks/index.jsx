import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useDados } from '@/Hooks/useDados.js'
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
  justify-content: space-between;

  div{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 250px;
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

  .task-info{
    text-align: left;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 480px) {    
    li{
      display: block;
    }
  }
`
export default function RecentTasks() {
  const { data } = useDados()
  const [filtrados, setFiltrados] = useState([])

  useEffect(() => {
    function notConcluded() {
      setFiltrados(data.tasks.filter(t => t.status !== 'Concluída'))
    }

    notConcluded()
  }, [data])

  return (
    <SectionCard title="Tarefas Recentes" width='60%'>
      <TaskHeader>
        <p>Tarefa</p>
        <div>
          <p>Status</p>
          <p>Prioridade</p>
        </div>
      </TaskHeader>
      <TaskList>
        {filtrados.slice(-5).reverse().map((task) => {
          if (task.status !== 'Concluída')
            return (
              <li key={task.id} style={{ justifyContent: 'space-between' }}>
                <p className='task-info'>{task.titulo}</p>
                <div style={{ display: 'flex', width: '250px' }}>

                  <NameWrapper width='170px' name={task.status} />
                  <NameWrapper name={task.prioridade} />
                </div>
              </li>
            )
        })}
      </TaskList>
    </SectionCard>

  )
}