import styled from 'styled-components'

const DisplayContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 270px;
  border-radius: 8px;
  padding: 10px;
  background-color: #f5f5f5;
  box-shadow: 0 0 10px rgba(0, 0, 0, .5);

  span{
    font-size: 1.5rem;
    font-weight: bold;
    color: #4caf50;
  }
`

export default function Display({ title, value, img }) {
  return (
    <DisplayContainer>
      <img src={img} alt={title} width="50" />
      <h2>{title}</h2>
      <h2><span>{value}</span></h2>
    </DisplayContainer>
  )
}  