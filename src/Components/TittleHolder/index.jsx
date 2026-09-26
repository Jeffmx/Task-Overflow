import styled from 'styled-components'
// import Button from '@/Components/Button'

export default function TitleHolder({title, button}) {

  const TittleHolder = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  `

  return (
    <TittleHolder>
      <h1>{title}</h1>
      {button}
    </TittleHolder>
  )
}