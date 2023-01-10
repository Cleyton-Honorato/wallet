import styled from "styled-components";

export const Container = styled.div`
  grid-area: MH;
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.textPrimaryColor};

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  border-bottom: 1px solid ${props => props.theme.colors.textTertiaryColor};
`;

export const Profile = styled.div`
`;

export const Welcome = styled.h3``;

export const UserName = styled.span``;