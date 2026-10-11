import { useState } from "react"
import styled from "styled-components"
import TittleHolder from "@/Components/TittleHolder"
import MenuMobile from "@/Components/MenuMobile"
import Button from "@/Components/Button"
import search from "@/assets/search.svg"
import Input from "@/Components/Input"

const TaskContainer = styled.section`
  display: flex;
  flex-direction: column;
`
const ShowCase = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
 `

function handleNewTask() {
  console.log("Nova tarefa clicada");
}

const options = [
  { name: "todas", value: "all" },
  { name: "pendente", value: "pending" },
  { name: "em andamento", value: "inProgress" },
  { name: "concluídas", value: "completed" }
]

export default function Tasks() {
  const [value, setValue] = useState("")

  return (
    <TaskContainer>
      <TittleHolder
        title="Tarefas"
        desc="Gerencie suas tarefas e mantenha o foco no que importa."
      >
        <Button onClick={handleNewTask}>+ Nova Tarefa</Button>
        <MenuMobile />
      </TittleHolder>
      <ShowCase>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "var(--container-color)", padding: "10px 8px", borderRadius: "8px", height: "100%" }}>
          {options.map((option) => (
            
            <p key={option.value}>{option.name}</p>
          ))}
        </div>
        <div style={{ padding: "10px 8px", backgroundColor: "var(--container-color)", borderRadius: "8px" }}>
          <Input
            type="text"
            placeholder="Buscar tarefas..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            icon={search}
          />
        </div>
      </ShowCase>
      <div>
        <p>tarefas status</p>
        <p>listas de tarefas do .json</p>
        <p>troca de pagina</p>
      </div>
    </TaskContainer>
  )
}