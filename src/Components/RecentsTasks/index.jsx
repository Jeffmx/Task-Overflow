import SectionCard from '@/Components/SectionCard'

export default function RecentTasks() {
 
  return (
    <SectionCard
      title="Tarefas Recentes"
      children={
        <ul>
          <li><p>Tarefa 1</p></li>
          <li><p>Tarefa 2</p></li>
          <li><p>Tarefa 3</p></li>
        </ul>
      }
    />
  )
}