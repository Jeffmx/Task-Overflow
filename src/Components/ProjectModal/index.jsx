import { useState, useEffect } from "react"
import styled from "styled-components"

const Overlay = styled.div`
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
`
const Content = styled.div`
  background: white; padding: 24px; border-radius: 12px; width: 100%; max-width: 500px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  max-height: 90vh; overflow-y: auto;
`
const FormGroup = styled.div`
  display: flex; flex-direction: column; gap: 5px; margin-bottom: 15px;
  label { font-size: 0.9rem; font-weight: bold; color: #444; }
  input, textarea {
    padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-family: inherit;
    &:focus { outline: none; border-color: var(--secondary-color); }
  }
  textarea { resize: vertical; min-height: 60px; }
`
const TaskAdder = styled.div`
  background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;
  
  .input-row {
    display: flex; gap: 10px; margin-bottom: 10px;
    input { flex: 1; }
    button {
      background: var(--secondary-color); color: white; border: none; 
      padding: 0 15px; border-radius: 6px; cursor: pointer; font-weight: bold;
    }
  }
  
  ul {
    list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 5px;
    li {
      background: white; padding: 8px 10px; border-radius: 4px; border: 1px solid #eee;
      display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem;
      button { background: none; border: none; color: red; cursor: pointer; font-weight: bold; }
    }
  }
`
const ButtonGroup = styled.div`
  display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;
  button {
    padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: bold; border: none;
    &.cancel { background: #f4f5f7; color: #42526e; }
    &.save { background: var(--secondary-color); color: white; }
  }
`

export default function ProjectModal({ projeto, onClose, onSave }) {
  const [form, setForm] = useState({ titulo: "", desc: "" })
  const [novaTarefa, setNovaTarefa] = useState("")
  const [tarefasTemporarias, setTarefasTemporarias] = useState([])

  useEffect(() => {
    if (projeto) setForm(projeto)
  }, [projeto])

  const handleAddTask = () => {
    if (!novaTarefa.trim()) return
    setTarefasTemporarias([...tarefasTemporarias, novaTarefa.trim()])
    setNovaTarefa("")
  }

  const handleRemoveTask = (index) => {
    setTarefasTemporarias(tarefasTemporarias.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ ...form, novasTarefas: tarefasTemporarias })
  }

  return (
    <Overlay onClick={onClose}>
      <Content onClick={(e) => e.stopPropagation()}>
        <h2 style={{ margin: "0 0 20px 0" }}>{projeto ? "Editar Projeto" : "Novo Projeto"}</h2>
        
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <label>Título do Projeto</label>
            <input 
              value={form.titulo} 
              onChange={(e) => setForm({...form, titulo: e.target.value})} 
              required 
              placeholder="Ex: Novo App"
            />
          </FormGroup>
          
          <FormGroup>
            <label>Descrição</label>
            <textarea 
              value={form.desc} 
              onChange={(e) => setForm({...form, desc: e.target.value})} 
              placeholder="Descreva o objetivo do projeto..."
            />
          </FormGroup>

          <TaskAdder>
            <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem', fontWeight: 'bold', color: '#444' }}>
              Adicionar Tarefas Iniciais
            </label>
            <div className="input-row">
              <input 
                value={novaTarefa} 
                onChange={(e) => setNovaTarefa(e.target.value)} 
                placeholder="Nome da tarefa..."
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTask())}
              />
              <button type="button" onClick={handleAddTask}>+</button>
            </div>
            
            {tarefasTemporarias.length > 0 && (
              <ul>
                {tarefasTemporarias.map((t, i) => (
                  <li key={i}>
                    {t}
                    <button type="button" onClick={() => handleRemoveTask(i)}>X</button>
                  </li>
                ))}
              </ul>
            )}
          </TaskAdder>

          <ButtonGroup>
            <button type="button" className="cancel" onClick={onClose}>Cancelar</button>
            <button type="submit" className="save">Salvar Projeto</button>
          </ButtonGroup>
        </form>
      </Content>
    </Overlay>
  )
}