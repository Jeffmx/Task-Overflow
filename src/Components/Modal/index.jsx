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
`

const FormGroup = styled.div`
  display: flex; flex-direction: column; gap: 5px; margin-bottom: 15px;
  label { font-size: 0.9rem; font-weight: bold; color: #444; }
  input, select, textarea {
    padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-family: inherit;
    &:focus { outline: none; border-color: var(--secondary-color); }
  }
  textarea { resize: vertical; min-height: 80px; }
`

const ButtonGroup = styled.div`
  display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;
  button {
    padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: bold; border: none;
    &.cancel { background: #f4f5f7; color: #42526e; }
    &.save { background: var(--secondary-color); color: white; }
  }
`

export default function Modal({ tarefa, projetos, onClose, onSave }) {
  const [form, setForm] = useState({
    titulo: "", desc: "", projectId: "", prioridade: "Baixa", status: "Pendente"
  })

  useEffect(() => {
    if (tarefa) setForm(tarefa)
  }, [tarefa])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <Overlay onClick={onClose}>
      <Content onClick={(e) => e.stopPropagation()}>
        <h2 style={{ margin: "0 0 20px 0" }}>{tarefa ? "Editar Tarefa" : "Nova Tarefa"}</h2>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <label>Título</label>
            <input name="titulo" value={form.titulo} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <label>Descrição</label>
            <textarea name="desc" value={form.desc} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <label>Projeto</label>
            <select name="projectId" value={form.projectId || ""} onChange={handleChange}>
              <option value="">Sem Projeto</option>
              {projetos?.map(p => (
                <option key={p.id} value={p.id}>{p.titulo}</option>
              ))}
            </select>
          </FormGroup>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <FormGroup>
              <label>Prioridade</label>
              <select name="prioridade" value={form.prioridade} onChange={handleChange}>
                <option value="Alta">Alta</option>
                <option value="Média">Média</option>
                <option value="Baixa">Baixa</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="Pendente">Pendente</option>
                <option value="Progredindo">Progredindo</option>
                <option value="Concluída">Concluída</option>
              </select>
            </FormGroup>
          </div>
          <ButtonGroup>
            <button type="button" className="cancel" onClick={onClose}>Cancelar</button>
            <button type="submit" className="save">Salvar</button>
          </ButtonGroup>
        </form>
      </Content>
    </Overlay>
  )
}