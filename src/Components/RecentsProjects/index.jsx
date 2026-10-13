import styled from 'styled-components'
import SectionCard from '@/Components/SectionCard'
import { useDados } from '@/Hooks/useDados.js'
import { useState, useEffect } from 'react'

const ProgressStyled = styled.progress`
  --radius: 50px;
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: 10px;

  &::-webkit-progress-bar {
    background-color: var(--background-color);
    border-radius: var(--radius);
  }

  &::-webkit-progress-value {
    background-color: var(--secondary-color);
    border-radius: var(--radius);
  }

  &::-moz-progress-bar {
    background-color: var(--secondary-color);
    border-radius: var(--radius);
  }
`
const ListInfo = styled.div`
  display:flex; 
  align-items: center;
  gap: 20px;

  p{
    white-space: nowrap;
  }

  @media (max-width: 480px){
    p{
      display: none;
    }
  }
`
const List = styled.li`
  margin-bottom: 10px;
`
export default function RecentProjects() {
  const { data } = useDados()
  const [pendentes, setPendentes] = useState([])

  useEffect(() => {
    function findProgess() {
      setPendentes(data.projects.map((proj) => {
        const tarefaDoProjeto = data.tasks.filter(t => t.projectId === proj.id)
        const total = tarefaDoProjeto.length
        const concluidas = tarefaDoProjeto.filter(c => c.status === 'Concluída').length
        const proporcao = Math.ceil((concluidas * 100) / total)
        return { id: proj.id, titulo: proj.titulo, total, concluidas, proporcao }
      }).filter(p => p.proporcao < 100).sort((a, b) => b.proporcao - a.proporcao)
      )
    }

    findProgess()
  }, [data.projects])

  return (
    <SectionCard title=" Projetos Recentes" width='40%'>
      <ul>
        {pendentes.map((p) => (
          <List key={p.id}>
            <p>{p.titulo}</p>
            <ListInfo>
              <ProgressStyled value={p.concluidas} max={p.total} />
              <p>{p.proporcao}%</p>
              <p>{p.concluidas} completas</p>
            </ListInfo>
          </List>
        ))}
      </ul>
    </SectionCard>

  )
}