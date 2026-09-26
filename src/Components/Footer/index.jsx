import styled from 'styled-components'

export default function Footer() {

  const FooterContainer = styled.footer`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    grid-column: 1 / -1;
    text-align: center;
    font-size: 1.3rem;

    a{
      color: var(--secondary-color);
      font-weight: bold;
    }
  `

  return (
    <FooterContainer>
      <p>Task OverFlow · Desenvolvido por <a href="https://github.com/jeffmx" target="_blank" rel="noopener noreferrer">Jeff MX</a> · 2026</p>
    </FooterContainer>
  )
}