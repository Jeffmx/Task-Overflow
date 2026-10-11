import SectionCard from '@/Components/SectionCard'
import { getData } from '@/services/dados.js'
import { useState, useEffect } from 'react'

export default function RecentProjects() {
  const [projects, setProjects] = useState({ projects: [] })

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getData()
        setProjects(result)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <SectionCard title=" Projetos Recentes" width='40%'>
        <ul>
          {projects.projects.slice(-5).reverse().map((project) => (
            <li key={project.id}>
              <p>{project.titulo}</p>
            </li>
          ))}
        </ul>
      </SectionCard>
    
  )
}