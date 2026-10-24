import styled from "styled-components"
import TittleHolder from '@/Components/TittleHolder'
import MenuMobile from "@/Components/MenuMobile"

export default function Projects() {
  return (
    <TittleHolder
      title="Projetos"
      desc="Organize seus projetos e acompanhe o progresso."
    >
      <MenuMobile />
    </TittleHolder>
  )
}