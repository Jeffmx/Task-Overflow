import styled from "styled-components"
import { useState, useEffect } from "react"
import { useDados } from "@/Hooks/useDados"
import TittleHolder from "@/Components/TittleHolder"
import MenuMobile from "@/Components/MenuMobile"
import Button from "@/Components/Button"
import Input from "@/Components/Input"
import searchIcon from "@/assets/search.svg"
import ProjectModal from "@/Components/ProjectModal"

// --- ESTILOS ---
const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const ShowCase = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 15px;
  flex-wrap: wrap;

  @media (max-width: 770px) { flex-direction: column; align-items: stretch; }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`

const Card = styled.div`
  background: var(--container-color);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  border: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  }
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;

  .icon-box {
    width: 40px; height: 40px; border-radius: 8px;
    background: #ebf1f8; display: flex; align-items: center; justify-content: center;
    color: var(--secondary-color); font-weight: bold; font-size: 1.2rem;
  }
  
  .title-area {
    h3 { margin: 0; font-size: 1.05rem; color: #172b4d; }
    p { margin: 2px 0 0 0; font-size: 0.8rem; color: #7a869a; }
  }
`

const CardDesc = styled.p`
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 20px;
  flex: 1;
`

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .bar-bg {
    flex: 1; height: 8px; background: #ebf1f8; border-radius: 4px; overflow: hidden;
  }
  
  .bar-fill {
    height: 100%; background: var(--secondary-color); border-radius: 4px;
    width: ${props => props.$progress}%;
    transition: width 0.3s ease;
  }
  
  span {
    font-size: 0.75rem; color: #7a869a; font-weight: bold;
  }
`

const NewProjectCard = styled(Card)`
  border: 2px dashed #d5dfeb;
  background: transparent;
  box-shadow: none;
  align-items: center;
  justify-content: center;
  text-align: center;

  &:hover {
    background: #f8fafc;
    border-color: var(--secondary-color);
  }

  .plus {
    font-size: 2rem; color: var(--secondary-color); margin-bottom: 10px;
  }
  
  h3 { color: var(--secondary-color); margin: 0 0 5px 0; font-size: 1rem; }
  p { color: #7a869a; font-size: 0.85rem; margin: 0; }
`

// --- COMPONENTE ---
export default function Projects() {
  const { data } = useDados()
  
  // Estados locais
  const [projetos, setProjetos] = useState([])
  const [tarefas, setTarefas] = useState([])
  const [busca, setBusca] = useState("")
  const [modalAberto, setModalAberto] = useState(false)
  const [projetoSelecionado, setProjetoSelecionado] = useState(null)

  // Sincroniza com os dados do JSON
  useEffect(() => {
    if (data.projects) setProjetos(data.projects)
    if (data.tasks) setTarefas(data.tasks)
  }, [data])

  // Lógica de Salvar (Criar/Editar)
  const handleSave = (dadosForm) => {
    if (dadosForm.id) {
      // EDIÇÃO: Atualiza o projeto
      setProjetos(prev => prev.map(p => p.id === dadosForm.id ? { ...dadosForm, novasTarefas: undefined } : p))
    } else {
      // CRIAÇÃO: Novo Projeto + Novas Tarefas
      const novoId = `proj-${Date.now()}`
      const novoProjeto = { id: novoId, titulo: dadosForm.titulo, desc: dadosForm.desc }
      
      // Cria as tarefas temporárias
      const tarefasCriadas = dadosForm.novasTarefas.map((tituloTarefa, index) => ({
        id: `task-${Date.now()}-${index}`,
        titulo: tituloTarefa,
        desc: "Tarefa criada junto ao projeto.",
        projectId: novoId,
        prioridade: "Média",
        status: "Pendente"
      }))

      setProjetos(prev => [...prev, novoProjeto])
      setTarefas(prev => [...prev, ...tarefasCriadas]) // Adiciona as tarefas na lista global
    }
    setModalAberto(false)
    setProjetoSelecionado(null)
  }

  // Filtro de busca
  const projetosFiltrados = projetos.filter(p => 
    p.titulo.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <Container>
      <TittleHolder title="Projetos" desc="Organize seus projetos e acompanhe o progresso.">
        <Button onClick={() => { setProjetoSelecionado(null); setModalAberto(true); }}>
          + Novo Projeto
        </Button>
        <MenuMobile />
      </TittleHolder>

      <ShowCase>
        <div style={{ background: "var(--container-color)", borderRadius: "8px", padding: "5px 10px", width: "300px", maxWidth: "100%" }}>
          <Input 
            type="text" 
            placeholder="Buscar projetos..." 
            value={busca} 
            onChange={(e) => setBusca(e.target.value)} 
            icon={searchIcon} 
          />
        </div>
      </ShowCase>

      <Grid>
        {projetosFiltrados.map((proj) => {
          // Cálculos de progresso
          const tarefasDoProjeto = tarefas.filter(t => t.projectId === proj.id)
          const totalTarefas = tarefasDoProjeto.length
          const concluidas = tarefasDoProjeto.filter(t => t.status === 'Concluída').length
          const progresso = totalTarefas === 0 ? 0 : Math.round((concluidas / totalTarefas) * 100)

          return (
            <Card key={proj.id} onClick={() => { setProjetoSelecionado(proj); setModalAberto(true); }}>
              <CardHeader>
                <div className="icon-box">{proj.titulo.charAt(0)}</div>
                <div className="title-area">
                  <h3>{proj.titulo}</h3>
                  <p>{totalTarefas} tarefas · {progresso}% concluído</p>
                </div>
              </CardHeader>
              
              <CardDesc>{proj.desc || "Sem descrição."}</CardDesc>
              
              <ProgressContainer $progress={progresso}>
                <div className="bar-bg">
                  <div className="bar-fill" />
                </div>
                <span>{progresso}%</span>
              </ProgressContainer>
            </Card>
          )
        })}

        {/* Card tracejado para novo projeto */}
        <NewProjectCard onClick={() => { setProjetoSelecionado(null); setModalAberto(true); }}>
          <div className="plus">+</div>
          <h3>Novo projeto</h3>
          <p>Crie um novo projeto para organizar suas tarefas.</p>
        </NewProjectCard>
      </Grid>

      {modalAberto && (
        <ProjectModal 
          projeto={projetoSelecionado} 
          onClose={() => { setModalAberto(false); setProjetoSelecionado(null); }} 
          onSave={handleSave} 
        />
      )}
    </Container>
  )
}