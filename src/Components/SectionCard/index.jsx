import styled from 'styled-components'

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    margin-bottom: 20px;
    padding: 15px;
    width: calc(${props => props.$width} - 10px);
    height: 400px;
    text-align: left;
    box-shadow: 0 0 5px rgba(0, 0, 0, .1);
    background-color: var(--container-color);

    h2{
      padding-bottom: 20px;
    }

    @media (max-width: 1300px) {
      width: 100%;
    }

    @media (max-width: 480px) {
      width: 100%;
    }
  `
export default function SectionCard({ title, width, children }) {

  return (
    <CardContainer $width={width}>
      <h2>{title}</h2>
      {children}
    </CardContainer>
  )
}