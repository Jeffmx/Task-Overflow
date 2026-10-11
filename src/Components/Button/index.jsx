import styled from "styled-components";

const ButtonStyled = styled.button`
  background-color: var(--secondary-color);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 15px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s ease;
  &:hover {
    background-color: var(--main-color);
  }
`
export default function Button({ onClick, children }) {

  return (
    <ButtonStyled type="button" onClick={onClick}>
      {children}
    </ButtonStyled>
  )
}