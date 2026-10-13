import styled from 'styled-components'

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 770px) {
    p{
      display: none;
    }
  }
`

export default function TitleHolder({ title, desc=null, children }) {

  return (
    <ContentContainer>
      <div>
        <h1>{title}</h1>
        <p>{desc}</p>
      </div>
      {children}
    </ContentContainer>
  )
}