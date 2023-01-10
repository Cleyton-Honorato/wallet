import styled from "styled-components";

export const Container = styled.div`
  grid-area: AS;
  background-color: ${props => props.theme.colors.secondary};
  border-right: 1px solid ${props => props.theme.colors.textTertiaryColor};

  padding-left: 20px;
`;

export const Header = styled.header`
  height: 70px;
  display: flex;
  align-items: center;
`;

export const LogoImg = styled.img`
  height: 40px;
  width: 40px;
`;

export const Title = styled.h3`
  color: ${props => props.theme.colors.textPrimaryColor};
  margin-left: 10px;
`;

export const MenuContainer = styled.nav`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;

export const MenuItem = styled.a`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.info};
  text-decoration: none;
  transition: opacity .3s;
  margin: 7px 0;

  &:hover {
    opacity: .7;
  }

  > svg {
    font-size: 18px;
    margin-right: 5px;
  }
`;
