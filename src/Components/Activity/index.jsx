import styled from "styled-components";
import TittleHolder from '@/Components/TittleHolder'
import { useDados } from "@/Hooks/useDados";
import { useState, useEffect } from "react";
import complete from '@/assets/complete.svg'

const ActivityContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 20px;
  background-color: var(--container-color);
  border-radius: 8px;
  padding: 25px;
`
const ActivityDisplay = styled.div`
  display: flex;
  flex-direction: row;
  gap: 25px;
  overflow-x: auto;

  span{
    display: block;
    min-width: 100px;
    margin-bottom: 20px;
  }

  img{
    width: 50px;
  }
`
const ActivityInfo = styled.div`
  display: flex;
  align-items: center;
  width: 285px;
  height: 140px;
  gap: 20px;
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0 0 5px rgba(0, 0, 0, .1) inset;
  background-color: var(--background-color);
`

export default function Activity() {
  const { data } = useDados()
  const [projectsConcluded, setProjectsConcluded] = useState([])
  const idConcluido = projectsConcluded.map(p => p.id)
  const tasksConcluded = data.tasks.filter(t => t.status === 'Concluída')


  useEffect(() => {
    function findConcluded() {
      setProjectsConcluded(
        data.projects.filter(proj => {
          const tarefaDoProjeto = data.tasks.filter(t => t.projectId === proj.id)
          const concluidas = tarefaDoProjeto.filter(c => c.status === 'Concluída').length
          return concluidas === tarefaDoProjeto.length
        })
      )
    }

    findConcluded()
  }, [data])

  return (
    <ActivityContainer>
      <TittleHolder title='Últimas conclusões'>
        <button>Ver Todas</button>
      </TittleHolder>
      <ActivityDisplay>
        {projectsConcluded.map((pc) => (
          <ActivityInfo key={pc.id}>
            <img src={complete} alt="concluída" />
            <div>
              <span>Você concluiu esse projeto:</span>
              <p>{pc.titulo}</p>
            </div>
          </ActivityInfo>
        ))}
        {tasksConcluded.slice(-5).filter(t => !idConcluido.includes(t.projectId))
          .map(tc => (
            <ActivityInfo key={tc.id}>
              <img src={complete} alt="concluída" />
              <div>
                <span>Você concluiu essa tarefa:</span>
                <p>{tc.titulo}</p>
              </div>
            </ActivityInfo>
          ))
        }
      </ActivityDisplay>
    </ActivityContainer>
  )
}