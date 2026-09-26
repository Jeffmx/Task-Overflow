import styled from "styled-components";

export default function Button({ text  }) {
  const ButtonStyled = styled.button`
    background-color: var(--main-color);
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    cursor: pointer;
    &:hover {
      background-color: var(--secondary-color);
    }
  `

  return (
    <ButtonStyled >{text}</ButtonStyled>
  )
}