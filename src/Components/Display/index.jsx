import styled from 'styled-components'

const DisplayContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  width: 270px;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, .1);
  background-color: var(--container-color);

  p{
    font-weight: bold;
  }

  .value {
    font-size: 1.5rem;
    font-weight: bold;
    color: #187ced;
  }
`

export default function Display({ title, value, img }) {
  return (
    <DisplayContainer>
      <img src={img} alt={title} width="50" />
      <div>
        <p className="title">{title}</p>
        <p className="value">{value}</p>
      </div>
    </DisplayContainer>
  )
}