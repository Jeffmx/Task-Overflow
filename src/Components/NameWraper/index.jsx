import styled from 'styled-components';

const ContentLimit = styled.div`
  display: flex;
  width: ${props => props.$width};
`

const NameWrapperContainer = styled.span`
  background-color: color-mix(in srgb, ${props => props.$setColor} 25%, white);
  color: ${props => props.$setColor};
  padding: 10px 15px;
  border-radius: 50px;
  font-weight: bold;

  .task-status{
    width: 150px;
  }

  @media (max-width: 480px) {
    display: none;
  }
`

export default function NameWrapper({ name, width = 'auto' }) {
  const setColor = (name) => {
    switch (name) {
      case 'Pendente':
        return '#ff732e';
      case 'Em Andamento':
        return 'blue';
      case 'Concluída':
        return 'green';
      case 'Alta':
        return 'red';
      case 'Média':
        return '#fca623';
      case 'Baixa':
        return '#383838';
    }
  };

  return (
    <ContentLimit $width={width}>
      <NameWrapperContainer $setColor={setColor(name)}>
        {name}
      </NameWrapperContainer>
    </ContentLimit>
  );
}