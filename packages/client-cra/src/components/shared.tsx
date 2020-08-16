import styled from 'styled-components'

export const palette = {
  dark: '#131b23',
  blue: '#324376',
  yellow: '#f5dd90',
  orange: '#f68e5f',
  red: 'f76c5e',
}

export const FullContainer = styled.div<{ background?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: ${(props) => props.background || palette.dark};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Header1 = styled.h1`
  color: white;
`

export const Header2 = styled.h1`
  color: white;
`

export const NavButtonText = styled.span`
  padding: 0.5em 1em;
  font-size: 1.2em;
  border: 1px solid white;
  background: none;
  color: white;
  font-weight: bold;
  text-decoration: none;
  transition: background 1s;

  &:hover {
    background: rgba(255, 255, 255, 0.4);
  }
`
