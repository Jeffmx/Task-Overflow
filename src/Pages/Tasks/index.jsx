import styled from "styled-components"
import { useState, useEffect } from "react"
import { useDados } from "@/Hooks/useDados"
import TittleHolder from "@/Components/TittleHolder"
import MenuMobile from "@/Components/MenuMobile"
import Button from "@/Components/Button"
import Input from "@/Components/Input"
import searchIcon from "@/assets/search.svg"
import Modal from "@/Components/Modal"

const TaskContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 90%;
`
const ShowCase = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 15px;
  flex-wrap: wrap;
`
const FilterHolder = styled.div`
  display: flex; flex-wrap: wrap; align-items: center;
  background-color: var(--container-color);
  padding: 8px; border-radius: 8px; gap: 4px;
  button {
    background: var(--background-color); border: none; padding: 8px 16px; border-radius: 50px;
    margin-top: 4px; cursor: pointer; font-weight: bold; font-size: 0.85rem;
    &.active { background-color: var(--secondary-color); color: white; }
  }
`
const TableWrapper = styled.div`
  background-color: var(--container-color);
  border-radius: 8px; padding: 10px 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow-x: auto;
`
const StyledTable = styled.table`
  width: 100%; border-collapse: collapse; text-align: left;
  th { padding: 16px 10px; color: #888; font-weight: bold; font-size: 0.85rem; border-bottom: 1px solid #eee; }
  td { padding: 12px; border-bottom: 1px solid #eee; vertical-align: middle; font-size: 0.9rem; }
  tbody tr { cursor: pointer; transition: background 0.2s; &:hover { background-color: rgba(0, 0, 0, 0.02); } }
`
const setColor = (name) => {
  switch (name) {
      case 'Pendente':
        return '#ff732e';
      case 'Progredindo':
        return 'blue';
      case 'Concluída':
        return 'green';
      case 'Alta':
        return 'red';
      case 'Média':
        return '#fca623';
      case 'Baixa':
        return '#383838';
  }
};
const Badge = styled.span`
  padding: 6px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: bold; display: inline-block;
  color: ${props => setColor(props.$type)};
  background-color: color-mix(in srgb, ${props => setColor(props.$type)} 25%, white);
`
const PaginationContainer = styled.div`
  display: flex; gap: 5px; margin-top: 20px;
`
const PageButton = styled.button`
  min-width: 32px; height: 32px; border-radius: 6px; border: 1px solid #ddd;
  background: ${props => props.$active ? 'var(--secondary-color)' : 'white'};
  color: ${props => props.$active ? 'white' : 'var(--secondary-color)'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1}; font-weight: bold;
`

const options = [
  { name: "Todas", value: "all" },
  { name: "Pendentes", value: "Pendente" },
  { name: "Progredindo", value: "Progredindo" },
  { name: "Concluídas", value: "Concluída" }
]

export default function Tasks() {
  const { data } = useDados()
  const [tarefas, setTarefas] = useState([])
  useEffect(() => { if (data.tasks) setTarefas(data.tasks) }, [data.tasks])

  const [busca, setBusca] = useState("")
  const [filtroAtivo, setFiltroAtivo] = useState("all")
  const [paginaAtual, setPaginaAtual] = useState(1)
  const [tarefaSelecionada, setTarefaSelecionada] = useState(null)

  const ITENS_POR_PAGINA = 10

  const handleSave = (dadosForm) => {
    if (dadosForm.id) {
      setTarefas(prev => prev.map(t => t.id === dadosForm.id ? dadosForm : t))
    } else {
      const novaTarefa = { ...dadosForm, id: `task-${Date.now()}` }
      setTarefas(prev => [...prev, novaTarefa])
    }
    setTarefaSelecionada(null)
  }

  const tarefasFiltradas = tarefas.filter(task => {
    const matchBusca = task.titulo.toLowerCase().includes(busca.toLowerCase())
    const matchStatus = filtroAtivo === "all" || task.status === filtroAtivo
    return matchBusca && matchStatus
  })

  const totalPaginas = Math.ceil(tarefasFiltradas.length / ITENS_POR_PAGINA) || 1
  const tarefasDaPagina = tarefasFiltradas.slice((paginaAtual - 1) * ITENS_POR_PAGINA, paginaAtual * ITENS_POR_PAGINA)

  return (
    <TaskContainer>
      <TittleHolder title="Tasks" desc="Gerencie suas tarefas.">
        <Button onClick={() => setTarefaSelecionada({})}>Nova Tarefa</Button>
        <MenuMobile />
      </TittleHolder>

      <ShowCase>
        <FilterHolder>
          {options.map((opt) => (
            <button key={opt.value} className={filtroAtivo === opt.value ? 'active' : ''} onClick={() => { setFiltroAtivo(opt.value); setPaginaAtual(1); }}>
              {opt.name}
            </button>
          ))}
        </FilterHolder>
        <div style={{ background: "var(--container-color)", borderRadius: "8px", padding: "2px 10px" }}>
          <Input type="text" placeholder="Buscar tarefas..." value={busca} onChange={(e) => { setBusca(e.target.value); setPaginaAtual(1); }} icon={searchIcon} />
        </div>
      </ShowCase>

      <TableWrapper>
        <StyledTable>
          <thead>
            <tr>
              <th>Tarefa</th><th>Projeto</th><th>Prioridade</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tarefasDaPagina.map((task) => {
              const projeto = data.projects.find(p => p.id === task.projectId)
              return (
                <tr key={task.id} onClick={() => setTarefaSelecionada(task)}>
                  <td>
                    <div style={{ fontWeight: 'bold' }}>{task.titulo}</div>
                    <div style={{ fontSize: '0.8rem', color: '#888' }}>{task.desc}</div>
                  </td>
                  <td>{projeto?.titulo || 'Sem projeto'}</td>
                  <td><Badge $type={task.prioridade}>{task.prioridade}</Badge></td>
                  <td><Badge $type={task.status}>{task.status}</Badge></td>
                </tr>
              )
            })}
          </tbody>
        </StyledTable>

        <PaginationContainer>
          <PageButton onClick={() => setPaginaAtual(p => p - 1)} disabled={paginaAtual === 1}>{'<'}</PageButton>
          <PageButton $active={true}>{paginaAtual}</PageButton>
          <PageButton onClick={() => setPaginaAtual(p => p + 1)} disabled={paginaAtual === totalPaginas}>{'>'}</PageButton>
        </PaginationContainer>
      </TableWrapper>

      {tarefaSelecionada !== null && (
        <Modal
          tarefa={tarefaSelecionada.id ? tarefaSelecionada : null}
          projetos={data.projects}
          onClose={() => setTarefaSelecionada(null)}
          onSave={handleSave}
        />
      )}
    </TaskContainer>
  )
}