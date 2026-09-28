import styled from 'styled-components'
// import Button from '@/Components/Button'

export default function TitleHolder({ title, desc, children }) {

  const ContentContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  `
  const PageResume = styled.div`
    
  `

  return (
    <ContentContainer>
      <PageResume>
        <h1>{title}</h1>
        <p>{desc}</p>
      </PageResume>
      {children}
    </ContentContainer>
  )
}