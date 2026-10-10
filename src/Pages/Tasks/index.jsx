import styled from "styled-components"
import TittleHolder from "@/Components/TittleHolder"
import MenuMobile from "@/Components/MenuMobile"

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

export default function Tasks() {
  return (
    <TaskContainer>
      <TittleHolder
        title="Tarefas"
        desc="Gerencie suas tarefas e mantenha o foco no que importa."
      >
        <p>+ nova tarefa</p>
        <MenuMobile />
      </TittleHolder>
      <ShowCase>
        <div>
          <p>todas</p>
          <p>pendente</p>
          <p>em andamento</p>
          <p>concluídas</p>
        </div>
        <div>
          <p>busca/filtro</p>
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