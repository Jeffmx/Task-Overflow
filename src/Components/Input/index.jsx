import styled from "styled-components"

const InputStyled = styled.input`
  border: 1px solid var(--secondary-color);
  border-radius: 8px;
  padding: 10px;
  padding-left: 40px;

  background-image: ${props => `url("${props.$icon}")`};
  background-repeat: no-repeat;
  background-position: left 10px center;
  background-size: 20px 20px;

  &:focus {
    outline: none;
  }
`

export default function Input({ type, placeholder, value, onChange, icon }) {
  console.log(icon);
  return (
    <InputStyled
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      $icon={icon}
    />
  )
}