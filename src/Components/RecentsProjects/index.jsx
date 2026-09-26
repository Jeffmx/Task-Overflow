import SectionCard from '@/Components/SectionCard'

export default function RecentProjects() {

  return (
    <SectionCard
      title=" Projetos Recentes"
      children={
        <ul>
          <li><p>Projeto 1</p></li>
          <li><p>Projeto 2</p></li>
          <li><p>Projeto 3</p></li>
        </ul>
      }
    />
  )
}