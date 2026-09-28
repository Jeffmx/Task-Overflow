import styled from 'styled-components'

export default function SectionCard({ title, children }) {
 
  const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    border-radius: 8px;
    margin-bottom: 20px;
    padding: 10px;
    width: max(270px, calc(50% - 10px));
    max-width: 560px;
    height: 400px;
    text-align: center;
    box-shadow: 0 0 5px rgba(0, 0, 0, .1);
    background-color: var(--container-color);

    h2{
      padding-bottom: 20px;
    }
  `
  return (
    <CardContainer>
      <h2>{title}</h2>
      {children}
    </CardContainer>
  )
}